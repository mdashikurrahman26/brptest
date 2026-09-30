import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TopBar } from './components/common/TopBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { MembershipModal, triggerMembershipModal } from './components/common/MembershipModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { PolicyPage } from './pages/PolicyPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { EventsPage } from './pages/EventsPage';
import { MediaPage } from './pages/MediaPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './admin/AdminPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper for public pages vs admin
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [searchOpen, setSearchOpen] = useState(false);

  // Secret admin shortcut: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        navigate('/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      <ScrollToTop />
      
      {!isAdminRoute && (
        <>
          <TopBar onOpenSearch={() => setSearchOpen(true)} />
          <Navbar onOpenSearch={() => setSearchOpen(true)} />
          <GlobalSearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
          />
          <MembershipModal />
        </>
      )}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<HomePage />} />
          <Route path="/membership" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/transparency" element={<TransparencyPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
