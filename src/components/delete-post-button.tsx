'use client';
import { TrashIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { deletePost } from '@/features/post/actions';
import FormSubmitButton from './form-summit-button';
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeletePostButtonProps {
  postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [formState, formAction] = useFormState(deletePost, undefined);

  // Handle form state changes with useEffect
  useEffect(() => {
    if (!formState) return;

    if (formState.error) {
      toast.error(formState.error);
      setIsOpen(false);
    } else if (formState.success) {
      toast.success('Post deleted successfully');
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  }, [formState, queryClient]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='Delete post'>
          <TrashIcon className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Post Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {formState?.error && (
          <p className='text-sm text-red-500'>{formState.error}</p>
        )}
        <AlertDialogFooter className='gap-2'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <input type='hidden' name='postId' value={postId} />
            <FormSubmitButton type='submit' variant='destructive'>
              Yes, Delete
            </FormSubmitButton>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
