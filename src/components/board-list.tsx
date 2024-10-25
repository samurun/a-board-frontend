import { MessageCircleIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export default function BoardList() {
  return (
    <div className='rounded-lg overflow-hidden divide-y divide-neutral-200'>
      {Array.from({ length: 10 }).map((item, idx) => (
        <div key={idx} className='p-4 bg-white space-y-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='size-8'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='text-muted-foreground text-sm font-medium'>
              Board Name
            </p>
          </div>
          <Badge variant='secondary'>Public</Badge>
          <div>
            <h2 className='text-lg font-medium'>
              Duis mollit mollit mollit id aliqua qui veniam.
            </h2>
            <p className='line-clamp-2'>
              Pariatur proident ipsum deserunt sunt nostrud. Amet magna nisi
              cupidatat ipsum sint et. Et et et sit consequat officia. In
              eiusmod reprehenderit ut cillum. Commodo pariatur mollit id esse
              Lorem ex adipisicing aliquip Lorem commodo dolor. Magna
              reprehenderit amet ex laborum ea fugiat tempor.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <MessageCircleIcon className='size-4' />
            <p className='text-muted-foreground text-sm'>10 Comments</p>
          </div>
        </div>
      ))}
    </div>
  );
}