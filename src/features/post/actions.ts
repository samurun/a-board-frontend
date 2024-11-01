'use server';
import { revalidatePath } from 'next/cache';
import { PostType } from './type';
import { cookies } from 'next/headers';

type FormState = { error?: string | string[] } | undefined;

export async function getPosts({
  title,
  community,
}: {
  title?: string;
  community?: string;
}): Promise<PostType[] | null> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts?title=${
    title || ''
  }&community=${community || ''}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return null;
    }

    const posts = await res.json();
    return posts as PostType[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
}

export async function getMyPosts({
  title,
  community,
}: {
  title?: string;
  community?: string;
}): Promise<PostType[] | null> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/my?title=${
    title || ''
  }&community=${community || ''}`;

  const token = cookies().get('access-token')?.value;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const posts = await res.json();
    return posts as PostType[];
  } catch (error) {
    console.error('Error fetching my posts:', error);
    return null;
  }
}

export async function getPostById(id: string): Promise<PostType | null> {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${id}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return null;
    }

    const post = await res.json();
    return post as PostType;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function deletePost(prevState: FormState, formData: FormData) {
  const postId = formData.get('postId') as string;
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/posts/${postId}`;
  const token = cookies().get('access-token')?.value;

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Error deleting post:', errorData);
      return { error: errorData.message || 'Failed to delete post' };
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    let message = 'Unexpected error';
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}
