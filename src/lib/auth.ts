import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 1, // 1 hour
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'string',
        },
        password: {
          label: 'password',
          type: 'string',
        },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };

          const res = await userSignIn({ username, password });
          if (!res.ok) {
            const error = await res.json();
            return handleError(error);
          }

          const { access_token } = await res.json();
          cookies().set('access-token', access_token);
          const profileRes = await getProfile(access_token);
          const profile = await profileRes.json();

          return profile;
        } catch (error) {
          return handleError(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token); // JWT interface we declared in next-auth.d.ts
    },
    async session({ session, token }) {
      session.user = token.user;

      // Set the session expiration to 1 hour from now
      session.expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();

      return session; // Session interface we declared in next-auth.d.ts
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};

export async function userSignIn(payload: {
  username: string;
  password: string;
}) {
  const URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`;
  return fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function getProfile(accessToken: string) {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/profile`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

const handleError = (error: unknown): never => {
  console.error('Error in authorize function', error);
  if (error instanceof Error) {
    throw error;
  }
  if (typeof error === 'object' && error !== null) {
    if ('message' in error) {
      throw new Error(error.message as string);
    }
    const errorMessage = Object.entries(error)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    throw new Error(errorMessage);
  }
  if (Array.isArray(error)) {
    throw new Error(error.join(', '));
  }
  throw new Error(String(error));
};
