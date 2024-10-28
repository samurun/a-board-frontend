'use client';
import { useFormStatus } from 'react-dom';
import { Button, buttonVariants } from './ui/button';
import { VariantProps } from 'class-variance-authority';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
  };

export default function FormSubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending}>
      {children}
    </Button>
  );
}
