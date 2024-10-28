'use client';

import { EditIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useForm } from 'react-hook-form';
import { createPostSchema, CreatePostSchemaType } from '@/schema/index.t';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { communityOptions } from './search-filter-section';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useGetPost } from '@/features/post/api/use-get-post';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import FormSubmitButton from './form-summit-button';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUpdatePost } from '@/features/post/api/use-update-post';

export default function UpdatePostButton({ postId }: { postId: string }) {
  const { data: post } = useGetPost(postId);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updatePost } = useUpdatePost({ postId });
  const queryClient = useQueryClient();

  const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(createPostSchema),
  });

  useEffect(() => {
    if (post) {
      form.reset({
        community: post.community,
        title: post.title,
        content: post.content,
      });
    }
  }, [post, form]);

  const onSubmit = (values: CreatePostSchemaType) => {
    updatePost(values, {
      onSuccess() {
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='size-7 p-0'>
          <EditIcon className='size-3' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm' aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
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
                        <SelectValue placeholder='Community' />
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
              <FormSubmitButton type='submit'>Confirm</FormSubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
