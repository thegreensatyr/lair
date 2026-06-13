import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import MerchPage from './MerchPage';
import DownloadsPage from './DownloadsPage';
import BookingPage from './BookingPage';
import ListeningPage from './ListeningPage';
import MembershipPage from './MembershipPage';
import AboutPage from './AboutPage';
import ReleasesPage from './ReleasesPage';
import ArcanaPage from './ArcanaPage';
import QuizPage from './QuizPage';
import ManualPage from './ManualPage';
import type { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  function navigate(page: Page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div style={{ background: '#020B18', minHeight: '100vh' }}>
      <div className="scanline" />
      <Header currentPage={currentPage} onNavigate={navigate} />
      <main>
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'merch' && <MerchPage />}
        {currentPage === 'downloads' && <DownloadsPage />}
        {currentPage === 'booking' && <BookingPage />}
        {currentPage === 'listening' && <ListeningPage />}
        {currentPage === 'membership' && <MembershipPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'releases' && <ReleasesPage onNavigate={navigate} />}
        {currentPage === 'arcana' && <ArcanaPage />}
        {currentPage === 'quiz' && <QuizPage onNavigate={navigate} />}
        {currentPage === 'manual' && <ManualPage onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
