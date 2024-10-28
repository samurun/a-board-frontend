import { getPosts } from '@/features/post/actions';
import { useQuery } from '@tanstack/react-query';

export function useGetPosts({
  title,
  community,
}: {
  title?: string;
  community?: string;
} = {}) {
  const query = useQuery({
    queryKey: ['posts', title, community],
    queryFn: async () => {
      const res = await getPosts({ title, community });
      return res;
    },
  });

  return query;
}
