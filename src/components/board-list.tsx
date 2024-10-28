'use client';

import { useGetPosts } from '@/features/post/api/use-get-posts';
import { BoardListItem } from './board-list-item';
import { useSearchParams } from 'next/navigation';

export default function BoardList() {
  const searchParams = useSearchParams();
  const title = searchParams.get('search') || '';
  const community = searchParams.get('community') || '';
  const { data: posts, isLoading } = useGetPosts({ title, community });

  if (isLoading) {
    return (
      <div className='bg-white rounded-lg shadow p-8 text-center'>
        <p className='text-muted-foreground text-lg'>Loading posts...</p>
      </div>
    );
  }

  if (posts?.length === 0)
    return (
      <div className='bg-white rounded-lg shadow p-8 text-center'>
        <p className='text-muted-foreground text-lg'>No posts found</p>
      </div>
    );

  return (
    <div className='rounded-lg overflow-hidden divide-y divide-neutral-200'>
      {posts?.map((item) => {
        return <BoardListItem key={item.id} item={item} />;
      })}
    </div>
  );
}
