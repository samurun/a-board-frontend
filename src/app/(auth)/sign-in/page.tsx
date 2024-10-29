import SignInCard from '@/components/sign-in-card';
import Image from 'next/image';
import Link from 'next/link';

export default function SignIn() {
  return (
    <main className='flex flex-col-reverse lg:flex-row h-svh text-white bg-green-900'>
      <div className='flex-grow flex items-center justify-center p-4'>
        <div className='w-full max-w-80 space-y-4'>
          <h1 className='text-2xl font-bold'>Sign in</h1>
          <SignInCard />
          <div className='flex items-center gap-2 text-sm'>
            <p>Don&apos;t have an account?</p>
            <Link href='/sign-up'>Sign up</Link>
          </div>
        </div>
      </div>
      <div className='basis-1/3 bg-green-800 rounded-b-2xl lg:rounded-l-2xl p-4 flex flex-col items-center justify-center gap-4'>
        <Image
          width={300}
          height={300}
          src='/assets/logo.png'
          alt='a Board'
          className='size-32 md:size-72 object-contain'
        />
        <h2 className='text-xl font-bold'>a Board</h2>
      </div>
    </main>
  );
}
