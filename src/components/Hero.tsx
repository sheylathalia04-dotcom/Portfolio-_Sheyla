import React, { useState } from 'react';
import { Mail, Phone, MapPin, Download, ArrowRight, Server, Brain, Shield, User } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean kicker text */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-3">
              <span>Administración de Sistemas & Redes (ASIR)</span>
              <span aria-hidden="true">·</span>
              <span>Inteligencia Artificial</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance mb-5">
              {PERSONAL_INFO.fullName}
            </h1>

            {/* Profile subtitle */}
            <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-200 mb-4 text-balance">
              {PERSONAL_INFO.headline}
            </p>

            {/* Brief introductory bio */}
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-2xl">
              Especializada en la gestión y soporte de infraestructuras informáticas, servidores, redes locales y bases de datos, con formación avanzada en automatización y modelos de Inteligencia Artificial para la administración eficiente.
            </p>

            {/* Quick contact / location info */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
              <a
                href={`tel:${PERSONAL_INFO.phoneClean}`}
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-mono tabular-nums"
              >
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <span>Contactar conmigo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-xl shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Ver y Descargar CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Image Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative ring */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xl">
                {!imageError ? (
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt="Foto de perfil de Sheyla Thalía Gutiérrez Larquín"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 text-slate-600 dark:text-slate-300 p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                      <User className="w-12 h-12" />
                    </div>
                    <span className="font-semibold text-lg text-slate-900 dark:text-white">
                      {PERSONAL_INFO.shortName}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      ASIR & Inteligencia Artificial
                    </span>
                  </div>
                )}

                {/* Subdued overlay label at bottom of image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                    Perfil Profesional
                  </p>
                  <p className="text-sm font-medium text-slate-100">
                    En aprendizaje y formación continua
                  </p>
                </div>
              </div>

              {/* Status pill card floating near image */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 shadow-lg items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    Disponibilidad Inmediata
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Para proyectos de TI, Redes & IA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Metric Strip below the split */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                ASIR
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                Grado Superior Oficial
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                IES Aldebarán (2023-2025)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                +3 Cursos
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                Especialización Práctica
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                IA & Ciberseguridad Phishing
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                4 Áreas
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                Telecomunicaciones Unitel
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Taller, Proyectos, Redes, Gestión
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                Toledo
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                Ubicación Principal
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                Fuensalida y Provincia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
