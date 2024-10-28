import { getMyPosts } from '@/features/post/actions';
import { useQuery } from '@tanstack/react-query';

export function useGetMyPosts({
  title,
  community,
}: {
  title?: string;
  community?: string;
} = {}) {
  const query = useQuery({
    queryKey: ['my-posts', title, community],
    queryFn: async () => {
      const res = await getMyPosts({ title, community });
      return res;
    },
  });

  return query;
}
