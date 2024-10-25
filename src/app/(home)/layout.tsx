import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className='flex gap-4 relative h-[calc(100vh-56px)] overflow-auto'>
        <Sidebar />
        {children}
      </div>
    </>
  );
}
