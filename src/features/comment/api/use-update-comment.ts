import { CreateCommentSchemaType } from '@/schema/index.t';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export function useUpdateComment({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['update-comment', postId],
    mutationFn: async (payload: CreateCommentSchemaType) => {
      const token = Cookies.get('access-token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comments/${commentId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message ?? 'Failed to update comment');
      }

      return res.json(); // Parse the response data
    },
    onError: (error: Error) => {
      console.error('Error updating comment:', error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Comment updated successfully');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return mutation;
}
