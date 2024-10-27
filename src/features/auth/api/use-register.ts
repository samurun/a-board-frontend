import { SignInSchemaType } from '@/schema/index.t';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface RegisterError {
  message: string | string[];
  error: string;
  statusCode: number;
}

type UseRegisterOptions = Omit<
  UseMutationOptions<boolean, RegisterError, SignInSchemaType>,
  'mutationKey' | 'mutationFn'
>;

export function useRegister(options?: UseRegisterOptions) {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: registerUser,
    ...options,
  });
}

async function registerUser(payload: SignInSchemaType): Promise<boolean> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errorData: RegisterError = await res.json();
    throw errorData;
  }

  return true;
}
