import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
