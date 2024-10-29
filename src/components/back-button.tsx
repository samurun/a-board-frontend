'use client';

import { ArrowLeftIcon } from 'lucide-react';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant='secondary' size='icon' onClick={() => router.back()}>
      <ArrowLeftIcon />
    </Button>
  );
}
