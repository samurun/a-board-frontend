import Link from 'next/link';
import { HomeIcon, SquarePenIcon } from 'lucide-react';
import { SidebarItemType } from '@/types';

export const sidebarItems: SidebarItemType[] = [
  {
    icon: HomeIcon,
    label: 'Home',
    href: '/',
  },
  {
    icon: SquarePenIcon,
    label: 'Our Blog',
    href: '/our-blog',
  },
];

// Create a separate SidebarItem component
const SidebarItem = ({ item }: { item: SidebarItemType }) => (
  <Link
    href={item.href}
    className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors'
  >
    <item.icon className='w-5 h-5' />
    <span>{item.label}</span>
  </Link>
);

export default function Sidebar() {
  return (
    <aside className='w-56 lg:w-80 hidden md:block mt-10 h-[calc(100vh-56px)] overflow-y-auto'>
      <nav className='flex flex-col gap-2 p-4'>
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </nav>
    </aside>
  );
}
