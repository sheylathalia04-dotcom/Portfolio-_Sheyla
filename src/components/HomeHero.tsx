import React from 'react';
import { Mail, Phone, MapPin, Download, ArrowRight, Server, Brain, Shield, BookOpen, Briefcase, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileImage } from './ProfileImage';

interface HomeHeroProps {
  onOpenCvModal: () => void;
  onNavigate: (page: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onOpenCvModal, onNavigate }) => {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              <span>Administración de Sistemas & Redes (ASIR)</span>
              <span aria-hidden="true">·</span>
              <span>Inteligencia Artificial</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4 text-balance">
              {PERSONAL_INFO.fullName}
            </h1>

            <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-200 mb-4 text-balance">
              {PERSONAL_INFO.headline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-2xl">
              Técnica Superior en ASIR con experiencia en <strong>Unitel Sistemas de Telecomunicaciones</strong> (taller de impresoras, proyectos, instalaciones y administración técnica) y formación especializada en <strong>Inteligencia Artificial</strong> en la Cámara de Comercio de Toledo.
            </p>

            {/* Contact quick strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
              <a
                href={`tel:${PERSONAL_INFO.phoneClean}`}
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono tabular-nums font-medium"
              >
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('contacto')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-sm transition-all"
              >
                <span>Contactar conmigo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-xl shadow-xs transition-all"
              >
                <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Ver y Descargar CV</span>
              </button>

              <button
                onClick={() => onNavigate('workspace')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl shadow-xs transition-all"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Gmail & Docs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Real Profile Photo Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <ProfileImage className="aspect-3/4 w-full" />

              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    Disponibilidad Inmediata
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    En Fuensalida, Toledo y provincia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explorador de Secciones (Sin Proyectos) */}
        <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Explora mi Portfolio por Secciones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Consulta mi experiencia, estudios y competencias ordenados de antes a ahora
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Sobre Mí */}
            <button
              onClick={() => onNavigate('sobre-mi')}
              className="text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Sobre Mí
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Biografía profesional, trayectoria en sistemas y habilidades interpersonales.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
                <span>Ver página</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Habilidades */}
            <button
              onClick={() => onNavigate('habilidades')}
              className="text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Habilidades & Competencias
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Sistemas, redes, herramientas de IA, bases de datos y liderazgo de proyectos.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
                <span>Ver página</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Experiencia (2022 a 2026) */}
            <button
              onClick={() => onNavigate('experiencia')}
              className="text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Experiencia (2022 - 2026)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Cronología de antes a ahora: Infancia, Unitel (4 áreas), Administrativa y Cafeterías.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
                <span>Ver página</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Formación (2021 a 2026) */}
            <button
              onClick={() => onNavigate('formacion')}
              className="text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Educación (2021 - 2026)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Cronología de antes a ahora: Bachillerato, ASIR, Phishing y cursos de IA en Toledo.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
                <span>Ver página</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Contacto */}
            <button
              onClick={() => onNavigate('contacto')}
              className="text-left p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Contacto Directo
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Email, teléfono directo en Fuensalida, Toledo y formulario de contacto.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 gap-1">
                <span>Ver página</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
