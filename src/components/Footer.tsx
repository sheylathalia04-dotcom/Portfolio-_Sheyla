import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileImage } from './ProfileImage';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-850">
          <button
            onClick={() => {
              onNavigate('inicio');
              scrollToTop();
            }}
            className="text-left flex items-center gap-3 group"
          >
            <ProfileImage size="sm" className="w-9 h-9 border-2 border-blue-600/70 shadow-xs" />
            <div>
              <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {PERSONAL_INFO.fullName}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administración de Sistemas Informáticos y Redes (ASIR) · Inteligencia Artificial
              </p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold">
            <button
              onClick={() => onNavigate('inicio')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('sobre-mi')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Sobre mí
            </button>
            <button
              onClick={() => onNavigate('habilidades')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Habilidades
            </button>
            <button
              onClick={() => onNavigate('experiencia')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Experiencia (2022 - 2026)
            </button>
            <button
              onClick={() => onNavigate('formacion')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Formación (2021 - 2026)
            </button>
            <button
              onClick={() => onNavigate('contacto')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contacto
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
            aria-label="Subir al inicio"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="hidden sm:inline">Subir arriba</span>
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            <span>{PERSONAL_INFO.location}</span>
            <span aria-hidden="true">·</span>
            <span>{PERSONAL_INFO.email}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
