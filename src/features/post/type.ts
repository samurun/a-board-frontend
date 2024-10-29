import { UserType } from '@/types';

export interface AuthorType extends UserType {
  id: string;
}

export interface PostType {
  id: string;
  title: string;
  community: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: AuthorType;
  comments: CommentType[];
}

export type CommentType = {
  id: string;
  content: string;
  author: AuthorType;
  post: PostType;
  created_at: string;
  updated_at: string;
};
