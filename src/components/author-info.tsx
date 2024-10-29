import { getRelativeTime } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AuthorType } from '@/features/post/type';

export default function AuthorInfo({
  author,
  updatedAt,
}: {
  author: AuthorType;
  updatedAt: string;
}) {
  return (
    <section className='flex items-center gap-2 mt-4'>
      <Avatar>
        <AvatarFallback className='uppercase bg-primary/10 text-primary'>
          {author?.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p> {author?.name}</p>
      <time className='text-muted-foreground text-xs'>
        {getRelativeTime(updatedAt)}
      </time>
    </section>
  );
}
