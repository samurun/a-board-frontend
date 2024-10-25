import { getRelativeTime } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface CommentProps {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export default function Comment({ author, content, createdAt }: CommentProps) {
  return (
    <div className='flex space-x-4'>
      <Avatar className='w-10 h-10'>
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${author}`}
          alt={author}
        />
        <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <div className='flex items-center space-x-2'>
          <h4 className='font-semibold'>{author}</h4>
          <span className='text-xs text-gray-500'>
            {getRelativeTime(createdAt)}
          </span>
        </div>
        <p className='mt-1 text-sm text-gray-700'>{content}</p>
      </div>
    </div>
  );
}
