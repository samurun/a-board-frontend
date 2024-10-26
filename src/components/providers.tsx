'use client';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from './qury-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SessionProvider>{children}</SessionProvider>
    </QueryProvider>
  );
}
