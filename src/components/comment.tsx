import { getRelativeTime } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useSession } from 'next-auth/react';
import { UserType } from '@/types';
import { useParams } from 'next/navigation';
import CommentAction from './comment-action';

interface CommentProps {
  id: string;
  author: UserType;
  content: string;
  createdAt: string;
}

export default function Comment({
  id,
  author,
  content,
  createdAt,
}: CommentProps) {
  const { data: session } = useSession();
  const { slug } = useParams();
  const isMyComment = session?.user.username === author.username;

  return (
    <div className='flex flex-col'>
      <div className='flex items-center space-x-2'>
        <Avatar className='size-9'>
          <AvatarFallback className='bg-primary/10 text-primary'>
            {author.name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center space-x-2'>
            <h4 className='font-semibold text-sm'>{author.name}</h4>
            <span className='text-xs text-gray-500'>
              {getRelativeTime(createdAt)}
            </span>
          </div>
        </div>
      </div>
      <p className='pl-11 text-sm text-gray-700'>{content}</p>
      {isMyComment && (
        <CommentAction content={content} slug={String(slug)} id={id} />
      )}
    </div>
  );
}
