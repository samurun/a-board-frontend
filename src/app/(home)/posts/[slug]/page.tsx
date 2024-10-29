import { Badge } from '@/components/ui/badge';
import AuthorInfo from '@/components/author-info';
import PostContent from '@/components/post-content';
import { getPostById } from '@/features/post/actions';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/comment-section';
import BackButton from '@/components/back-button';
import { Metadata } from 'next';
import { PageProps } from '../../../../../.next/types/app/layout';

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const post = await getPostById(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.content?.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content?.substring(0, 160),
      type: 'article',
      authors: [post.author?.name],
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.content?.substring(0, 160),
    },
  };
}

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
