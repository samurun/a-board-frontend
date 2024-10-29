import { useDeleteComment } from '@/features/comment/api/use-delete-comment';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useState } from 'react';

export default function DeleteCommentButton({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteComment, isPending } = useDeleteComment({
    commentId: commentId,
    postId: postId,
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className='text-xs text-gray-500 hover:text-gray-700'>
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            onClick={() =>
              deleteComment(
                { commentId: commentId },
                { onSuccess: () => setOpen(false) }
              )
            }
            disabled={isPending}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
