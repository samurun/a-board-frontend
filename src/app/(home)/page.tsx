import BoardList from '@/components/board-list';
import SearchFilterSection from '@/components/search-filter-section';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className='p-4 max-w-screen-md w-full pt-10 pb-14 h-fit space-y-4'>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchFilterSection />
        <BoardList />
      </Suspense>
    </main>
  );
}
