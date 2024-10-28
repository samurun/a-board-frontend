import { CreatePostSchemaType } from '@/schema/index.t';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export function useCreatePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: async (payload: CreatePostSchemaType) => {
      const token = Cookies.get('access-token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message ?? 'Failed to create post');
      }

      return res.json(); // Parse the response data
    },
    onError: (error: Error) => {
      console.error('Error creating post:', error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Post created successfully');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return mutation;
}
