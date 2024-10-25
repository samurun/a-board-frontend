'use client';
import { createCommentSchema, CreateCommentSchemaType } from '@/schema/index.t';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';

export default function AddCommentButton() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [open, setOpen] = useState(false);

  const form = useForm<CreateCommentSchemaType>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { comment: '' },
  });

  function onSubmit(values: CreateCommentSchemaType) {
    console.log(values);
    setOpen(false);
  }

  const commentForm = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
        <FormField
          control={form.control}
          name='comment'
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
          <Button onClick={() => setOpen(false)} variant='outline'>
            Cancel
          </Button>
          <Button type='submit' className='w-full sm:w-auto'>
            Post
          </Button>
        </div>
      </form>
    </Form>
  );

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        variant='outline'
        className='text-primary border-primary hover:text-primary'
      >
        Add Comment
      </Button>
    );
  }

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comments</DialogTitle>
          </DialogHeader>
          <div>{commentForm}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return commentForm;
}
