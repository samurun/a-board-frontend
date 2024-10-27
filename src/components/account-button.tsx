'use client';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function AccountButton() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='size-8'>
          <AvatarFallback className='uppercase'>
            {session?.user.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=' mr-4'>
        <div className='flex items-center gap-2 p-2'>
          <Avatar className='size-8'>
            <AvatarFallback className='uppercase'>
              {session?.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='text-sm'>
            <p className='font-medium'>{session?.user.username}</p>
            <p className='text-muted-foreground'>{session?.user.name}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
