import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import FormSubmitButton from './form-summit-button';
import { createCommentSchema, CreateCommentSchemaType } from '@/schema/index.t';
import { useUpdateComment } from '@/features/comment/api/use-update-comment';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export default function UpdateCommentButton({
  defaultContent,
  postId,
  commentId,
}: {
  defaultContent: string;
  postId: string;
  commentId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateComment } = useUpdateComment({
    postId,
    commentId,
  });

  const form = useForm({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: defaultContent,
    },
  });

  const onSubmit = (values: CreateCommentSchemaType) => {
    updateComment(values, {
      onSuccess() {
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className='text-xs text-gray-500 hover:text-gray-700'>
          Edit
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              key={defaultContent}
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'
            >
              <FormField
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} />
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
