import { getPosts } from '@/features/post/actions';
import { useQuery } from '@tanstack/react-query';

export function useGetPosts() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await getPosts();
      return res;
    },
  });

  return query;
}
