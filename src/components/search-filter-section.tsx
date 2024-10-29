'use client';
import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import CreatePostButton from './create-post-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const communityOptions = [
  { label: 'History', value: 'history' },
  { label: 'Food', value: 'food' },
  { label: 'Pets', value: 'pets' },
  { label: 'Health', value: 'health' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Exercise', value: 'exercise' },
  { label: 'Other', value: 'other' },
];

export default function SearchFilterSection() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const SearchInput = ({ className = '', ...props }) => (
    <div className={`relative w-full ${className}`}>
      <SearchIcon className='size-4 absolute left-2 top-1/2 -translate-y-1/2' />
      <Input
        placeholder='Search...'
        className='pl-7 bg-white shadow-none w-full'
        defaultValue={searchParams.get('search') || ''}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const params = new URLSearchParams(searchParams);
            const value = e.currentTarget.value;

            if (value) {
              params.set('search', value);
            } else {
              params.delete('search');
            }

            router.push(`${pathname}/?${params.toString()}`);
          }
        }}
        {...props}
      />
      <span className='absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none border rounded px-1 bg-muted'>
        Press ⏎
      </span>
    </div>
  );

  return (
    <section className='flex gap-4'>
      <SearchInput className='hidden sm:block' />
      <div className='sm:hidden relative flex-grow'>
        {isSearchFocused ? (
          <SearchInput onBlur={() => setIsSearchFocused(false)} autoFocus />
        ) : (
          <Button
            variant='outline'
            size='icon'
            className='size-9'
            onFocus={() => setIsSearchFocused(true)}
          >
            <SearchIcon className='size-4' />
          </Button>
        )}
      </div>
      {!isSearchFocused && (
        <>
          <Select
            defaultValue={searchParams.get('community') || 'all'}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams);

              if (value === 'all') {
                params.delete('community');
              } else {
                params.set('community', value);
              }

              router.push(`${pathname}/?${params.toString()}`);
            }}
          >
            <SelectTrigger className='md:max-w-40 bg-white shadow-none'>
              <SelectValue placeholder='All' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {communityOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CreatePostButton />
        </>
      )}
    </section>
  );
}
