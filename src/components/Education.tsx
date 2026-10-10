import React from 'react';
import { EDUCATION_LIST } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, BookOpen, Check, ArrowRight } from 'lucide-react';

export const Education: React.FC = () => {
  const academicItems = EDUCATION_LIST.filter((item) => item.type === 'academico');
  const specializationItems = EDUCATION_LIST.filter((item) => item.type === 'especializacion');

  return (
    <div className="pt-28 pb-16 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
            <span>Página 04</span>
            <span aria-hidden="true">·</span>
            <span>Historial Académico & Cursos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            Educación oficial y cursos (2021 a 2026)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Trayectoria formativa ordenada cronológicamente de antes a ahora (desde 2021 hasta 2026)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Formación Académica Oficial (2021 -> 2025) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Historial Académico Oficial
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                2021 ➔ 2025
              </span>
            </div>

            <div className="space-y-6">
              {academicItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{item.degree}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 font-semibold">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3 pl-7">
                    {item.institution}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 pl-7">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 pl-7">
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Materias y competencias cursadas:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {item.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Cursos Especializados (2024 -> 2026) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Cursos de Especialización & Certificados
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                2024 ➔ 2026
              </span>
            </div>

            <div className="space-y-6">
              {specializationItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{item.degree}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 font-semibold">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2 pl-7">
                    {item.institution}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 pl-7">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 border-t border-slate-100 dark:border-slate-800 pl-7">
                    {item.topics.map((t, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span className="text-slate-700 dark:text-slate-300">{t}</span>
                        {tIdx < item.topics.length - 1 && (
                          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
