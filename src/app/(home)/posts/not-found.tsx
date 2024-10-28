'use client';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh] px-4 bg-white h-full'>
      <h1 className='text-4xl font-bold text-muted-foreground mb-4'>404</h1>
      <p className='text-xl text-gray-600 mb-6'>Post Not Found</p>
      <Button variant='link' onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
}
