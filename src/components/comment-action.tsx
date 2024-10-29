import UpdateCommentButton from './update-comement-button';
import DeleteCommentButton from './delete-comment-button';

export default function CommentAction({
  content,
  slug,
  id,
}: {
  content: string;
  slug: string;
  id: string;
}) {
  return (
    <div className='flex items-center space-x-2 pl-11 mt-2'>
      <UpdateCommentButton
        defaultContent={content}
        postId={String(slug)}
        commentId={id}
      />
      <DeleteCommentButton postId={String(slug)} commentId={id} />
    </div>
  );
}
