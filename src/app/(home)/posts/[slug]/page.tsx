import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, MessageCircleIcon } from 'lucide-react';
import Link from 'next/link';
import AddCommentButton from '@/components/add-comment-button';
import AuthorInfo from '@/components/author-info';
import PostContent from '@/components/post-content';
import CommentSection from '@/components/comment-section';

export default function PostPage() {
  return (
    <div className='w-full mx-auto pt-10 pb-14 h-fit bg-white min-h-full'>
      <main className='p-4 max-w-4xl mx-auto pt-10 space-y-6  min-h-full'>
        <Link
          href='/'
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'icon' }),
            'rounded-full'
          )}
        >
          <ArrowLeftIcon />
        </Link>
        <AuthorInfo />
        <Badge variant='secondary'>History</Badge>
        <PostContent />
        <CommentSection />
      </main>
    </div>
  );
}
