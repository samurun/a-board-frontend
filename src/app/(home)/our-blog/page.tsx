import OurBoardList from '@/components/our-board-list';
import SearchFilterSection from '@/components/search-filter-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Blog',
  description:
    'Explore the latest insights, tutorials, and updates from the aBoard community. Join discussions and stay updated with our collaborative whiteboard platform.',
  openGraph: {
    title: 'Our Blog',
    description:
      'Explore the latest insights, tutorials, and updates from the aBoard community',
    type: 'website',
  },
};

export default function OurBlogPage() {
  return (
    <main className='p-4 max-w-screen-md w-full pt-10 pb-14 h-fit space-y-4'>
      <SearchFilterSection />
      <OurBoardList />
    </main>
  );
}
