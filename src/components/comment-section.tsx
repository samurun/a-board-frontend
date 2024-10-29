'use client';
import AddCommentButton from './add-comment-button';
import Comment from './comment';
import { useGetComments } from '@/features/comment/api/use-get-comments';
import { useParams } from 'next/navigation';
import CommentCounter from './comment-counter';

export default function CommentSection() {
  const postId = useParams().slug;

  if (typeof postId !== 'string') return null;

  const { data: comments } = useGetComments(postId);

  return (
    <>
      <CommentCounter count={comments?.length || 0} />
      <section className='flex items-center gap-2'>
        <AddCommentButton postId={postId} />
      </section>
      <section className='space-y-4'>
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.author}
            content={comment.content}
            createdAt={comment.created_at}
          />
        ))}
      </section>
    </>
  );
}
