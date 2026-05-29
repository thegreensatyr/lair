import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MerchPage from './pages/MerchPage';
import DownloadsPage from './pages/DownloadsPage';
import BookingPage from './pages/BookingPage';
import ListeningPage from './pages/ListeningPage';
import MembershipPage from './pages/MembershipPage';
import AboutPage from './pages/AboutPage';
import ReleasesPage from './pages/ReleasesPage';
import ArcanaPage from './pages/ArcanaPage';
import QuizPage from './pages/QuizPage';
import ManualPage from './pages/ManualPage';
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
