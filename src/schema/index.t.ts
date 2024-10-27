import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character.',
    }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema.extend({
  username: z.string().email({ message: 'Invalid email address.' }),
  name: z.string().min(1, {
    message: 'Name is required. Please add one.',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character.',
    }),
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

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
