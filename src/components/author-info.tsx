import { getRelativeTime } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function AuthorInfo() {
  return (
    <section className='flex items-center gap-2 mt-4'>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>Jone Doe</p>
      <time className='text-muted-foreground text-xs'>
        {getRelativeTime('2024-03-15T12:45:00Z')}
      </time>
    </section>
  );
}
