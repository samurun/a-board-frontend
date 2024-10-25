import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const CommunityEnum = z.enum([
  'history',
  'food',
  'pets',
  'health',
  'fashion',
  'exercise',
  'Other',
  'other',
]);

export const createPostSchema = z.object({
  community: CommunityEnum,
  title: z.string().min(1, {
    message: 'Title is required. Please add one.',
  }),
  content: z.string().min(1, {
    message: 'Content is required. Please add some.',
  }),
});

export type CreatePostSchemaType = z.infer<typeof createPostSchema>;

export const createCommentSchema = z.object({
  comment: z.string().min(1, {
    message: 'Content is required. Please add some.',
  }),
});

export type CreateCommentSchemaType = z.infer<typeof createCommentSchema>;
