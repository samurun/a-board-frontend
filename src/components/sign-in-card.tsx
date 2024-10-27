'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Loader } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { signInSchema, SignInSchemaType } from '@/schema/index.t';

export default function SignInCard() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInSchemaType) => {
    setLoading(true);
    setError(null);

    try {
      const res = await signIn('credentials', {
        ...values,
        redirect: false,
      });

      if (!res?.ok) {
        setError(res?.error || 'An error occurred during sign in');
        return;
      }

      router.replace('/');
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (name: 'username' | 'password') => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={name === 'password' ? 'password' : 'text'}
              className='bg-white text-black'
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {renderFormField('username')}
        {renderFormField('password')}
        {error && (
          <div className='text-red-500 text-sm'>
            <p>{error}</p>
          </div>
        )}
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading && <Loader className='animate-spin mr-2' />}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
