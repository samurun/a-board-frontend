'use client';

import { useSearchParams } from 'next/navigation';
import { BoardListItem } from './board-list-item';
import { useGetMyPosts } from '@/features/post/use-get-my-posts';

export default function OurBoardList() {
  const searchParams = useSearchParams();
  const title = searchParams.get('search') || '';
  const community = searchParams.get('community') || '';

  const { data: posts, isLoading } = useGetMyPosts({ title, community });

  if (isLoading) {
    return (
      <div className='bg-white rounded-lg shadow p-8 text-center'>
        <p className='text-muted-foreground text-lg'>Loading posts...</p>
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow p-8 text-center'>
        <p className='text-muted-foreground text-lg'>No posts found</p>
      </div>
    );
  }

  return (
    <div className='rounded-lg overflow-hidden divide-y divide-neutral-200'>
      {posts?.map((item) => (
        <BoardListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
