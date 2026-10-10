import React from 'react';
import { Server, Brain, Users, CheckCircle2, MapPin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileImage } from './ProfileImage';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-16 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
            <span>Página 01</span>
            <span aria-hidden="true">·</span>
            <span>Sobre Mí</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            Versatilidad técnica, rigor operativo y alta capacidad interpersonal
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-3 text-balance">
            Perfil multidisciplinar en Administración de Sistemas Informáticos y Redes (ASIR) e Inteligencia Artificial
          </p>
        </div>

        {/* Bio Content & Strengths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio Narrative & Real Photo Lockup */}
          <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center gap-6">
              <ProfileImage className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 aspect-square" />
              
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {PERSONAL_INFO.fullName}
                </h2>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {PERSONAL_INFO.title}
                </p>
                <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-y-1 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{PERSONAL_INFO.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>{PERSONAL_INFO.email}</span>
                  </span>
                </div>
              </div>
            </div>

            <p>
              Me llamo <strong className="font-semibold text-slate-900 dark:text-white">Sheyla Thalía Gutiérrez Larquín</strong>. Mi perfil profesional se sitúa en la confluencia entre la <strong className="font-semibold text-slate-900 dark:text-white">Administración de Sistemas Informáticos y Redes (ASIR)</strong> y las metodologías contemporáneas de <strong className="font-semibold text-slate-900 dark:text-white">Inteligencia Artificial</strong>.
            </p>
            <p>
              Durante mi formación en el <span className="font-medium text-slate-900 dark:text-white">IES Aldebarán</span> y mi paso por <span className="font-medium text-slate-900 dark:text-white">Unitel Sistemas de Telecomunicaciones</span>, he trabajado directamente en el diagnóstico de hardware en taller de impresoras, la planificación en oficina de proyectos, el despliegue técnico de instalaciones de red y la gestión administrativa.
            </p>
            <p>
              Posteriormente he complementado mi perfil con formación especializada en Inteligencia Artificial y Emprendimiento en la <span className="font-medium text-slate-900 dark:text-white">Cámara de Comercio de Toledo</span>, así como en prevención de ciberseguridad y phishing en Udemy.
            </p>
            <p>
              Paralelamente, mi experiencia en puestos de atención al público, hostelería y atención a la infancia ha reforzado mi <strong className="font-semibold text-slate-900 dark:text-white">capacidad de trabajo en equipo, empatía, rapidez en la toma de decisiones y comunicación interpersonal</strong>, convirtiéndome en un perfil multidisciplinar capaz de entender tanto las necesidades técnicas como las humanas de cualquier equipo.
            </p>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Enfoque analítico y metódico</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Excelente trato cara al público</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Coordinación y gestión de partes</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>En continuo aprendizaje activo</span>
              </div>
            </div>
          </div>

          {/* Right: Three Pillars Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Infraestructuras & Redes
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dominio de sistemas operativos cliente/servidor (Windows y Linux), direccionamiento IP, conmutación de redes locales, cableado, racks e intervención en taller de hardware.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Inteligencia Artificial & Datos
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Formación en modelos de IA aplicados a la administración, optimización de productividad, bases de datos relacionales SQL y diseño de páginas web funcionales.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Liderazgo, Gestión & Trato Humano
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Capacidad de comunicación asertiva, resolución de imprevistos bajo presión, organización de tareas y seguimiento riguroso de proyectos administrativos y técnicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
