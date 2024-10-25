import { MessageCircleIcon } from 'lucide-react';
import AddCommentButton from './add-comment-button';
import Comment from './comment';

// Mock comments data
const comments = [
  {
    id: 1,
    author: 'Alice',
    content:
      'Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.',
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 2,
    author: 'Bob',
    content:
      'Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.',
    createdAt: '2024-03-15T11:30:00Z',
  },
  {
    id: 3,
    author: 'Charlie',
    content:
      'Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.',
    createdAt: '2024-03-15T12:45:00Z',
  },
];

export default function CommentSection() {
  return (
    <>
      <section className='flex items-center gap-2'>
        <MessageCircleIcon className='size-4' />
        <p className='text-muted-foreground text-sm'>
          {comments.length} Comments
        </p>
      </section>
      <section className='flex items-center gap-2'>
        <AddCommentButton />
      </section>
      <section className='space-y-4'>
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </section>
    </>
  );
}
