import { CommentType } from '@/features/post/type';
import { useQuery } from '@tanstack/react-query';

export function useGetComments(postId: string) {
  const query = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comments/post/${postId}/`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await res.json();

      return data as CommentType[];
    },
  });

  return query;
}
