import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export function useDeleteComment({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['delete-comment', commentId],
    mutationFn: async ({ commentId }: { commentId: string }) => {
      const token = Cookies.get('access-token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res;
    },
    onError: (error: Error) => {
      console.error('Error deleting comment:', error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Comment deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return mutation;
}
