'use client';

import { MenuIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import Link from 'next/link';
import { sidebarItems } from './sidebar';

export default function NavbarSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='text-white md:hidden'>
          <MenuIcon className='size-4' />
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-green-950 border-none text-white'>
        <div className='grid gap-4 py-4 text-semibold text-xl'>
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='flex items-center gap-2'
              onClick={() => setOpen(false)}
            >
              <item.icon className='size-5' />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
