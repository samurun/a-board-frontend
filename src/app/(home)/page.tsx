import BoardList from '@/components/board-list';
import SearchFilterSection from '@/components/search-filter-section';
import Sidebar from '@/components/sidebar';

export default function Home() {
  return (
    <div className='flex gap-4 relative h-[calc(100vh-56px)] overflow-auto'>
      <Sidebar />
      <main className='p-4 max-w-screen-md w-full pt-10 pb-14 h-fit space-y-4'>
        <SearchFilterSection />
        <BoardList />
      </main>
    </div>
  );
}
