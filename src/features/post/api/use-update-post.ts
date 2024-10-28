import { CreatePostSchemaType } from '@/schema/index.t';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export function useUpdatePost({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['update-post', postId],
    mutationFn: async (payload: CreatePostSchemaType) => {
      const token = Cookies.get('access-token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${postId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message ?? 'Failed to update post');
      }

      return res.json(); // Parse the response data
    },
    onError: (error: Error) => {
      console.error('Error updating post:', error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Post updated successfully');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutation;
}
