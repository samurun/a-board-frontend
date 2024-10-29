import { PostType } from '@/features/post/type';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import Link from 'next/link';
import PostAction from './post-action';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import CommentCounter from './comment-counter';

interface BoardListItemProps {
  item: PostType;
}

const AuthorSection = ({
  author,
  showActions,
  postId,
}: {
  author: PostType['author'];
  showActions: boolean;
  postId: string;
}) => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-2'>
      <Avatar className='size-8'>
        <AvatarFallback className='uppercase bg-primary/10 text-primary'>
          {author.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <p className='text-muted-foreground text-sm font-medium'>{author.name}</p>
    </div>
    {showActions && <PostAction postId={postId} />}
  </div>
);

const highlightText = (text: string, highlight: string): React.ReactNode => {
  if (!highlight.trim()) return text;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className='bg-yellow-400 dark:bg-yellow-900/30'>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export function BoardListItem({ item }: BoardListItemProps) {
  const session = useSession();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const isCurrentUserAuthor =
    session.data?.user?.username === item.author.username;

  return (
    <div className='block p-4 bg-white space-y-2 relative'>
      <AuthorSection
        author={item.author}
        showActions={isCurrentUserAuthor}
        postId={item.id}
      />
      <Link href={`/posts/${item.id}`} className='block space-y-2'>
        <Badge variant='secondary'>{item.community}</Badge>
        <div>
          <h2 className='text-lg font-medium'>
            {highlightText(item.title, searchTerm)}
          </h2>
          <p className='line-clamp-2'>{item.content}</p>
        </div>
        <CommentCounter count={item.comments.length} />
      </Link>
    </div>
  );
}
