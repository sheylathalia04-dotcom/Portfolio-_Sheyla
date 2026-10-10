/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PageNavigation } from './components/PageNavigation';
import { CvModal } from './components/CvModal';
import { ChatbotModal } from './components/ChatbotModal';
import { PhotoProvider } from './context/PhotoContext';

const VALID_PAGES = ['inicio', 'sobre-mi', 'habilidades', 'experiencia', 'formacion', 'contacto'];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').trim();
      if (VALID_PAGES.includes(hash)) return hash;
    }
    return 'inicio';
  });

  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Sync theme with document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle URL hash navigation for reliable deep linking on Vercel
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setCurrentPage('inicio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (pageId: string) => {
    if (VALID_PAGES.includes(pageId)) {
      setCurrentPage(pageId);
      window.location.hash = pageId === 'inicio' ? '' : pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 flex flex-col justify-between">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenCvModal={() => setCvModalOpen(true)}
          currentPage={currentPage}
          onNavigate={navigateToPage}
        />

        <main className="flex-1">
          {currentPage === 'inicio' && (
            <HomeHero
              onOpenCvModal={() => setCvModalOpen(true)}
              onNavigate={navigateToPage}
            />
          )}

          {currentPage === 'sobre-mi' && <About />}

          {currentPage === 'habilidades' && <Skills />}

          {currentPage === 'experiencia' && <Experience />}

          {currentPage === 'formacion' && <Education />}

          {currentPage === 'contacto' && <Contact />}

          <PageNavigation
            currentPage={currentPage}
            onNavigate={navigateToPage}
          />
        </main>

        <Footer onNavigate={navigateToPage} />

        {/* Robot Asistente Informativo sobre Sheyla */}
        <ChatbotModal />

        {/* Modal de CV */}
        <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
      </div>
    </PhotoProvider>
  );
}
