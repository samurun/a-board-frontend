import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import AuthorInfo from '@/components/author-info';
import PostContent from '@/components/post-content';
import { getPostById } from '@/features/post/actions';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/comment-section';
import BackButton from '@/components/back-button';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostById(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='w-full mx-auto pt-10 pb-14 h-fit bg-white min-h-full'>
      <main className='p-4 max-w-4xl mx-auto pt-10 space-y-4 min-h-full'>
        <BackButton />
        <AuthorInfo author={post?.author} updatedAt={post?.updated_at || ''} />
        <Badge variant='secondary'>{post?.community}</Badge>
        <PostContent title={post?.title} content={post?.content} />
        <CommentSection />
      </main>
    </div>
  );
}
