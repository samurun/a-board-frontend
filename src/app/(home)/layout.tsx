import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  return (
    <div className='flex flex-col h-svh'>
      <Navbar />
      <div className='flex flex-1 gap-4 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}
