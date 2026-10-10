import React from 'react';
import { X, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileImage } from './ProfileImage';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="no-print flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Currículum Vitae Oficial (2021 - 2026)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {PERSONAL_INFO.fullName} · {PERSONAL_INFO.title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0 bg-white text-slate-900">
          {/* CV Header */}
          <div className="border-b-2 border-blue-600 pb-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {PERSONAL_INFO.fullName.toUpperCase()}
              </h1>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-600 mt-1">
                ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS Y REDES, E INTELIGENCIA ARTIFICIAL
              </p>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 mt-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{PERSONAL_INFO.location}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-mono tabular-nums">{PERSONAL_INFO.phone}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{PERSONAL_INFO.email}</span>
                </span>
              </div>
            </div>

            <ProfileImage
              size="sm"
              className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 shrink-0 shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 print:grid-cols-12">
            {/* Left Column (Historial Académico 2021 -> 2026 & Habilidades) */}
            <div className="md:col-span-5 space-y-6 print:col-span-5 border-r md:border-slate-200 md:pr-6">
              {/* Historial Académico Oficial: 2021 a 2025 */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Historial Académico (2021 - 2025)
                </h2>
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[11px] font-mono text-blue-700 font-bold block">1. Septiembre 2021 - Junio 2023</span>
                    <p className="font-bold text-slate-900">
                      BACHILLERATO DE CIENCIAS DE LA SALUD
                    </p>
                    <p className="text-slate-600 font-medium">IES ALDEBARÁN</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-blue-700 font-bold block">2. Septiembre 2023 - Junio 2025</span>
                    <p className="font-bold text-slate-900">
                      GRADO SUPERIOR EN ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS Y REDES (ASIR)
                    </p>
                    <p className="text-slate-600 font-medium">IES ALDEBARÁN</p>
                  </div>
                </div>
              </div>

              {/* Otros Estudios & Certificados: 2024 a 2026 */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Otros Estudios & Cursos (2024 - 2026)
                </h2>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-700 font-bold block">Julio 2024</span>
                    <p className="font-bold text-slate-900">
                      CURSO DE PHISHING
                    </p>
                    <p className="text-slate-600">Udemy</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-indigo-700 font-bold block">Agosto 2026 - Septiembre 2026</span>
                    <p className="font-bold text-slate-900">
                      CURSO DE FUNDAMENTOS BÁSICOS DE INTELIGENCIA ARTIFICIAL
                    </p>
                    <p className="text-slate-600">Cámara de Comercio de Toledo</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-indigo-700 font-bold block">Septiembre 2026 - Octubre 2026</span>
                    <p className="font-bold text-slate-900">
                      CURSO DE EMPRENDIMIENTO INTELIGENTE CON IA: ADMINISTRACIÓN Y GESTIÓN
                    </p>
                    <p className="text-slate-600">Cámara de Comercio de Toledo</p>
                  </div>
                </div>
              </div>

              {/* Habilidades Principales */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Habilidades & Competencias
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Buena coordinación y liderazgo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Resolución de problemas y trabajo en equipo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Conocimientos de Inteligencia Artificial</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Capacidad de comunicación cara al público</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Sistemas informáticos y administración</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Páginas web y bases de datos relacionales</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Organización de tareas y seguimiento</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>En aprendizaje y formación continua</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Experiencia Laboral (2022 -> 2026) */}
            <div className="md:col-span-7 space-y-6 print:col-span-7">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-4">
                  Experiencia Laboral (2022 - 2026)
                </h2>

                <div className="space-y-5 text-xs">
                  {/* 1. Atención a la Infancia (2022-2024) */}
                  <div className="border-l-2 border-slate-300 pl-3">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-slate-900">
                        1. ATENCIÓN A LA INFANCIA
                      </p>
                      <span className="font-mono text-slate-500 font-bold">2022 - 2024</span>
                    </div>
                    <p className="text-slate-600">Cuidado de niños en las tardes después de los estudios.</p>
                  </div>

                  {/* 2. Unitel (Marzo - Junio 2025) */}
                  <div className="border-l-2 border-blue-600 pl-3">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-slate-900 text-sm">
                        2. EMPRESA UNITEL SISTEMAS DE TELECOMUNICACIONES
                      </p>
                      <span className="font-mono text-blue-700 font-bold">Marzo - Junio 2025</span>
                    </div>
                    <p className="font-semibold text-blue-700">Técnica en Prácticas (Sistemas & Telecomunicaciones)</p>
                    <div className="mt-2 space-y-1 text-slate-700">
                      <p>• <strong className="font-semibold">Taller de Impresoras:</strong> Diagnóstico y reparación de hardware.</p>
                      <p>• <strong className="font-semibold">Oficina de Proyectos:</strong> Elaboración y soporte en documentación técnica.</p>
                      <p>• <strong className="font-semibold">Oficina de Instalaciones:</strong> Despliegue en rack y cableado de red.</p>
                      <p>• <strong className="font-semibold">Oficina de Administración:</strong> Gestión de partes de avería y archivo.</p>
                    </div>
                  </div>

                  {/* 3. Administrativa en Instalaciones (Agosto - Octubre 2025) */}
                  <div className="border-l-2 border-slate-300 pl-3">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-slate-900">
                        3. ADMINISTRATIVA EN INSTALACIONES
                      </p>
                      <span className="font-mono text-slate-500 font-bold">Agosto - Octubre 2025</span>
                    </div>
                    <p className="text-slate-600">Cargo de administrativa en obras e instalaciones técnicas.</p>
                  </div>

                  {/* 4. Cafetería Masa Madre (Febrero - Marzo 2026) */}
                  <div className="border-l-2 border-slate-300 pl-3">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-slate-900">
                        4. CAFETERÍA MASA MADRE
                      </p>
                      <span className="font-mono text-slate-500 font-bold">Febrero - Marzo 2026</span>
                    </div>
                    <p className="text-slate-600">Personal de barra, mesera, cocina. Organización y trato directo al cliente.</p>
                  </div>

                  {/* 5. Cafetería Elegance (Marzo - Mayo 2026) */}
                  <div className="border-l-2 border-slate-300 pl-3">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-slate-900">
                        5. CAFETERÍA ELEGANCE
                      </p>
                      <span className="font-mono text-slate-500 font-bold">Marzo - Mayo 2026</span>
                    </div>
                    <p className="text-slate-600">Personal de barra, mesera, cocina. Servicio cara al público.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
