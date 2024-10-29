import { MessageCircleIcon } from 'lucide-react';

export default function CommentCounter({ count }: { count: number }) {
  return (
    <div className='flex items-center gap-1 text-muted-foreground text-sm'>
      <MessageCircleIcon className='size-4' />
      <p>
        {count} {count === 1 ? 'Comment' : 'Comments'}
      </p>
    </div>
  );
}
