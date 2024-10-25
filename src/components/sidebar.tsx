import Link from 'next/link';
import { HomeIcon, SquarePenIcon } from 'lucide-react';

export const sidebarItems = [
  {
    icon: HomeIcon,
    label: 'Home',
    href: '/',
  },
  {
    icon: SquarePenIcon,
    label: 'Out Blog',
    href: '/our-blog',
  },
];

export default function Sidebar() {
  return (
    <aside className='max-w-56 lg:max-w-80 w-full hidden md:block mt-10 sticky top-8'>
      <div className='flex flex-col gap-4 p-4'>
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className='flex items-center gap-2'
          >
            <item.icon className='size-4' />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
