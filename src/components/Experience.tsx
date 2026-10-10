import React, { useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle, ChevronRight, Layers } from 'lucide-react';

export const Experience: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'tecnico' | 'gestion' | 'atencion'>('all');

  const filteredExperiences =
    filter === 'all'
      ? EXPERIENCES
      : EXPERIENCES.filter((exp) => exp.category === filter);

  const filterTabs = [
    { id: 'all', label: 'Toda la Experiencia (2022 - 2026)' },
    { id: 'tecnico', label: 'Telecomunicaciones & TI' },
    { id: 'gestion', label: 'Gestión & Administración' },
    { id: 'atencion', label: 'Atención & Hostelería' },
  ];

  return (
    <div className="pt-28 pb-16 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
              <span>Página 03</span>
              <span aria-hidden="true">·</span>
              <span>Trayectoria Laboral</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
              Experiencia Laboral (2022 a 2026)
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Historial cronológico ordenado de antes a ahora (desde 2022 hasta 2026)
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  filter === tab.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List (De antes a ahora) */}
        <div className="relative border-l-2 border-blue-600/30 dark:border-blue-400/30 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
          {filteredExperiences.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Dot marker with step number */}
              <div className="absolute -left-[35px] sm:-left-[53px] top-1.5 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                {index + 1}
              </div>

              {/* Card container */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h2>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {exp.organization}
                    </p>
                  </div>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-mono font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{exp.period}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Subareas breakdown (especially for Unitel Telecomunicaciones) */}
                {exp.subareas && exp.subareas.length > 0 && (
                  <div className="mb-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Rotación Departamental en Unitel</span>
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {exp.subareas.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements & Responsibilities */}
                {exp.achievements.length > 0 && (
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Competencias y funciones clave:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                      {exp.achievements.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
