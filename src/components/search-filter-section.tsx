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

  const SearchInput = ({ className = '', ...props }) => (
    <div className={`relative w-full ${className}`}>
      <SearchIcon className='size-4 absolute left-2 top-1/2 -translate-y-1/2' />
      <Input
        placeholder='Search...'
        className='pl-7 bg-white shadow-none w-full'
        {...props}
      />
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
          <Select defaultValue={communityOptions[0].value}>
            <SelectTrigger className='md:max-w-40 bg-white shadow-none'>
              <SelectValue placeholder='Community' />
            </SelectTrigger>
            <SelectContent>
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
