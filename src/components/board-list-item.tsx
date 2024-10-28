import { PostType } from '@/features/post/type';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import Link from 'next/link';

interface BoardListItemProps {
  item: PostType;
}

export function BoardListItem({ item }: BoardListItemProps) {
  return (
    <div className='block p-4 space-y-2p-4 bg-white space-y-2 relative'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='size-8'>
            <AvatarFallback className='uppercase bg-primary/10 text-primary'>
              {item.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className='text-muted-foreground text-sm font-medium'>
            {item.author.name}
          </p>
        </div>
      </div>
      <Link href={`/posts/${item.id}`} className='block space-y-2'>
        <Badge variant='secondary'>{item.community}</Badge>
        <div>
          <h2 className='text-lg font-medium'>{item.title}</h2>
          <p className='line-clamp-2'>{item.content}</p>
        </div>
      </Link>
    </div>
  );
}
