import React, { useState } from 'react';
import { PageTab } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileContactBar } from './components/common/MobileContactBar';
import { SplashScreen } from './components/common/SplashScreen';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { AdmissionsPage } from './components/pages/AdmissionsPage';
import { AcademicsPage } from './components/pages/AcademicsPage';
import { AlumniPage } from './components/pages/AlumniPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { NewsPage } from './components/pages/NewsPage';
import { PortalPage } from './components/pages/PortalPage';
import { AdminPage } from './components/pages/AdminPage';
import { ContactPage } from './components/pages/ContactPage';
import { LearningCentrePage } from './components/pages/LearningCentrePage';
import { EmaudoAiAssistant } from './components/common/EmaudoAiAssistant';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<PageTab>('home');

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-700 selection:text-white font-sans">
      {/* Premium Splash Screen on First Load */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} durationMs={3200} />
      )}

      {/* Top Header with School Logo, Nav Menu, Apply Now Button */}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <HomePage onNavigate={handleTabChange} />
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <AboutPage onNavigate={handleTabChange} />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <AboutPage onNavigate={handleTabChange} />
          </div>
        )}

        {activeTab === 'admissions' && <AdmissionsPage />}

        {activeTab === 'academics' && (
          <AcademicsPage onNavigate={handleTabChange} initialTab="departments" />
        )}

        {activeTab === 'departments' && (
          <AcademicsPage onNavigate={handleTabChange} initialTab="departments" />
        )}

        {activeTab === 'activities' && (
          <AcademicsPage onNavigate={handleTabChange} initialTab="activities" />
        )}

        {activeTab === 'learning-centre' && (
          <LearningCentrePage onNavigate={handleTabChange} />
        )}

        {activeTab === 'alumni' && <AlumniPage />}
        {activeTab === 'gallery' && <GalleryPage />}
        {activeTab === 'news' && <NewsPage />}
        {activeTab === 'events' && <NewsPage />}
        {activeTab === 'portal' && <PortalPage />}
        {activeTab === 'admin' && <AdminPage />}
        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer with full verified contact details and quick links */}
      <Footer onTabChange={handleTabChange} />

      {/* Floating Emaudo AI Assistant */}
      <EmaudoAiAssistant />

      {/* Fixed Bottom Mobile Contact Bar */}
      <MobileContactBar />
    </div>
  );
}
