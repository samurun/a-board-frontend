'use client';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import NavbarSheet from './navbar-sheet';
import AccountButton from './account-button';
import { UserType } from '@/types';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const session = useSession();

  return (
    <nav className='w-full bg-green-900 z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='h-14 flex items-center justify-between'>
          <Logo />
          {session && <NavItems session={session.data} />}
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return <p className='text-white text-2xl font-bold'>a Board</p>;
}

function NavItems({ session }: { session: { user: UserType } | null }) {
  return (
    <div className='flex items-center gap-2'>
      {session?.user ? (
        <AccountButton />
      ) : (
        <Link href='/sign-in' className={cn(buttonVariants({}))}>
          Sign In
        </Link>
      )}
      <NavbarSheet />
    </div>
  );
}
