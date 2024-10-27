import { LucideIcon } from 'lucide-react';

export type SidebarItemType = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export type UserType = {
  name: string;
  username: string;
  created_at: string;
  updated_at: string;
};
