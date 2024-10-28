'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema, CreatePostSchemaType } from '@/schema/index.t';
import { communityOptions } from './search-filter-section';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useCreatePost } from '@/features/post/api/use-create-post';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CreatePostButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const { mutate: createPost } = useCreatePost();

  const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      community: '',
      title: '',
      content: '',
    },
  });

  const onSubmit = async (values: CreatePostSchemaType) => {
    createPost(values, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create +</Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        {session?.user ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='community'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select Community' />
                        </SelectTrigger>
                        <SelectContent>
                          {communityOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="What's on your mind..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col sm:flex-row justify-end gap-2'>
                <DialogClose asChild>
                  <Button variant='outline' className='w-full sm:w-auto'>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type='submit'
                  className='w-full sm:w-auto'
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className='flex flex-col items-center gap-4 py-4'>
            <p className='text-sm text-muted-foreground'>
              Please sign in to create a post
            </p>
            <Link href='/api/auth/signin'>Sign In</Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
