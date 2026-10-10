import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas las Habilidades' },
    { id: 'sistemas', label: 'Sistemas & Redes' },
    { id: 'ia', label: 'Inteligencia Artificial & Datos' },
    { id: 'gestion', label: 'Gestión & Competencias' }
  ];

  const filteredCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <div className="pt-28 pb-16 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
              <span>Página 02</span>
              <span aria-hidden="true">·</span>
              <span>Habilidades & Tecnologías</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
              Dominio técnico de sistemas e innovación con IA
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Clasificación de competencias por áreas de especialización
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-xl self-start md:self-auto">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {category.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {category.description}
                </p>
              </div>

              {/* Grid of skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {skill.description}
                      </p>
                    </div>

                    {/* Unboxed tags with dot separators */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60">
                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                        {skill.tags.map((tag, tIndex) => (
                          <React.Fragment key={tIndex}>
                            <span className="text-slate-700 dark:text-slate-300">{tag}</span>
                            {tIndex < skill.tags.length - 1 && (
                              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
