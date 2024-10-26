import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      name: string;
      username: string;
      created_at: string;
      updated_at: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: ProfileType;
  }
}
