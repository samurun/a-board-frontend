'use client';

import { useGetPosts } from '@/features/post/api/use-get-posts';
import { BoardListItem } from './board-list-item';

export default function BoardList() {
  const { data: posts, isLoading } = useGetPosts();

  if (isLoading) {
    return (
      <div className='bg-white rounded-lg shadow p-8 text-center'>
        <p className='text-muted-foreground text-lg'>Loading posts...</p>
      </div>
    );
  }

  if (!posts)
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
