'use client';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from './qury-provider';
import { Toaster } from './ui/sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SessionProvider>
        {children}
        <Toaster richColors />
      </SessionProvider>
    </QueryProvider>
  );
}
