import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import NavbarSheet from './navbar-sheet';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AccountButton from './account-button';
import { UserType } from '@/types';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='w-full bg-green-900 z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='h-14 flex items-center justify-between'>
          <Logo />
          <NavItems session={session} />
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
