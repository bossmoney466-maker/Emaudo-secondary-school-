import React, { useState } from 'react';
import { PageTab } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileContactBar } from './components/common/MobileContactBar';
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
import { EmaudoAIAssistant } from './components/common/EmaudoAIAssistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Top Header */}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage onNavigate={handleTabChange} />}
        {activeTab === 'about' && <AboutPage onNavigate={handleTabChange} />}
        {activeTab === 'admissions' && <AdmissionsPage />}
        {activeTab === 'academics' && <AcademicsPage />}
        {activeTab === 'alumni' && <AlumniPage />}
        {activeTab === 'gallery' && <GalleryPage />}
        {activeTab === 'news' && <NewsPage />}
        {activeTab === 'portal' && <PortalPage />}
        {activeTab === 'admin' && <AdminPage />}
        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Footer with full contact details and buttons */}
      <Footer onTabChange={handleTabChange} />

      {/* Floating Emaudo AI Assistant */}
      <EmaudoAIAssistant />

      {/* Fixed Bottom Mobile Contact Bar */}
      <MobileContactBar />
    </div>
  );
}
