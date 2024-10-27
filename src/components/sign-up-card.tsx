'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { signUpSchema, SignUpSchemaType } from '@/schema/index.t';
import { useRegister } from '@/features/auth/api/use-register';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignUpCard() {
  const router = useRouter();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  });

  const { mutate, isPending } = useRegister({
    onSuccess() {
      router.push('/sign-in');
    },
    onError(error) {
      form.setError('username', {
        type: 'custom',
        message: error.message as string,
      });
    },
  });

  const onSubmit = (values: SignUpSchemaType) => mutate(values);

  const renderFormField = (
    name: keyof SignUpSchemaType,
    type: string = 'text'
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={type}
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
        {renderFormField('name')}
        {renderFormField('username')}
        {renderFormField('password', 'password')}
        <Button type='submit' className='w-full' disabled={isPending}>
          {isPending && <Loader className='animate-spin mr-2' />}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
