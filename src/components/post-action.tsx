'use client';

import DeletePostButton from './delete-post-button';
import UpdatePostButton from './update-post-button';

export default function PostAction({ postId }: { postId: string }) {
  return (
    <div className='ml-auto flex gap-2 z-10 absolute right-4'>
      <UpdatePostButton postId={postId} />
      <DeletePostButton postId={postId} />
    </div>
  );
}
