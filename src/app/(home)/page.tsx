import BoardList from '@/components/board-list';
import SearchFilterSection from '@/components/search-filter-section';

export default function Home() {
  return (
    <main className='p-4 max-w-screen-md w-full pt-10 pb-14 h-fit space-y-4'>
      <SearchFilterSection />
      <BoardList />
    </main>
  );
}
