import React from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

interface PageNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const PAGE_ORDER = [
  { id: 'inicio', title: 'Inicio' },
  { id: 'sobre-mi', title: 'Sobre Mí' },
  { id: 'habilidades', title: 'Habilidades' },
  { id: 'experiencia', title: 'Experiencia (2022-2026)' },
  { id: 'formacion', title: 'Formación (2021-2026)' },
  { id: 'contacto', title: 'Contacto' },
];

export const PageNavigation: React.FC<PageNavigationProps> = ({ currentPage, onNavigate }) => {
  const currentIndex = PAGE_ORDER.findIndex((p) => p.id === currentPage);
  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Anterior */}
        {prevPage ? (
          <button
            onClick={() => onNavigate(prevPage.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Página anterior: {prevPage.title}</span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Volver a Inicio si no estamos en inicio */}
        {currentPage !== 'inicio' && (
          <button
            onClick={() => onNavigate('inicio')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Volver a Inicio</span>
          </button>
        )}

        {/* Siguiente */}
        {nextPage ? (
          <button
            onClick={() => onNavigate(nextPage.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <span>Siguiente página: {nextPage.title}</span>
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </div>
  );
};
