import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import NavbarSheet from './navbar-sheet';

export default function Navbar() {
  return (
    <div className='mx-auto px-4 bg-green-900 sticky top-0 z-50'>
      <div className='h-14 flex items-center justify-between'>
        <p className='text-white text-2xl font-bold'>a Board</p>
        <div className='flex items-center justify-between gap-2'>
          <Link href={'/sign-in'} className={cn(buttonVariants({}))}>
            Sign In
          </Link>
          <NavbarSheet />
        </div>
      </div>
    </div>
  );
}
