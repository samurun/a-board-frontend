import { getPostById, getPosts } from '@/features/post/actions';
import { useQuery } from '@tanstack/react-query';

export function useGetPost(postId: string) {
  const query = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const res = await getPostById(postId);
      return res;
    },
  });

  return query;
}
