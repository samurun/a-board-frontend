import { CreateCommentSchemaType } from '@/schema/index.t';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export function useCreateComment({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['create-comment', postId],
    mutationFn: async (payload: CreateCommentSchemaType) => {
      const token = Cookies.get('access-token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comments/${postId}`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        throw new Error(error.message ?? 'Failed to create post');
      }

      return res.json(); // Parse the response data
    },
    onError: (error: Error) => {
      console.error('Error creating comment:', error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Comment created successfully');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  return mutation;
}
