import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RotateCcw, Cpu, Check, MessageSquare, Terminal } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_LIST } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export const ChatbotModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadAlert, setHasUnreadAlert] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initialGreeting: Message = {
    id: 'msg-init',
    sender: 'bot',
    text: `¡Hola! 🤖 Soy el **Robot Asistente Oficial** de **${PERSONAL_INFO.fullName}**.\n\nPuedo responder cualquier duda sobre su formación técnica en **ASIR**, sus cursos en **Inteligencia Artificial y Ciberseguridad**, sus prácticas en **Unitel Sistemas de Telecomunicaciones**, su experiencia laboral y sus canales de contacto.\n\n*Respondo de forma 100% veraz y estricta basándome exclusivamente en los datos reales de su currículum.*`,
    timestamp: 'Ahora',
    quickReplies: [
      '¿Qué estudió Sheyla y en qué orden?',
      '¿Qué hizo en Unitel Telecomunicaciones?',
      '¿Qué cursos tiene de Inteligencia Artificial?',
      '¿Cuál es su experiencia laboral completa?',
      '¿Cuáles son sus habilidades principales?',
      '¿Cómo contactar con ella?'
    ]
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
    };
  }, []);

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase().trim();

    // 1. Estudios / Educación / Historial Académico
    if (q.includes('estudio') || q.includes('formaci') || q.includes('educaci') || q.includes('grado') || q.includes('instituto') || q.includes('aldebar') || q.includes('bachiller') || q.includes('titulaci')) {
      return `🎓 **Historial Académico y Formación de Sheyla** *(ordenado cronológicamente de antes a ahora)*:\n\n1. **Bachillerato de Ciencias de la Salud** (Septiembre 2021 - Junio 2023)\n   • Centro: *IES ALDEBARÁN*\n   • Base en ciencias, razonamiento analítico y resolución estructurada de problemas.\n\n2. **Grado Superior en Administración de Sistemas Informáticos y Redes (ASIR)** (Septiembre 2023 - Junio 2025)\n   • Centro: *IES ALDEBARÁN*\n   • Especialidad: Administración de servidores (Windows Server y Linux), redes corporativas, cableado, bases de datos SQL y seguridad.\n\n3. **Cursos de Especialización**:\n   • **Curso de Phishing** (Julio 2024) - *Udemy*\n   • **Curso de Fundamentos Básicos de Inteligencia Artificial** (Agosto - Septiembre 2026) - *Cámara de Comercio de Toledo*\n   • **Curso de Emprendimiento Inteligente con IA: Administración y Gestión** (Septiembre - Octubre 2026) - *Cámara de Comercio de Toledo*`;
    }

    // 2. Unitel Sistemas de Telecomunicaciones
    if (q.includes('unitel') || q.includes('telecomunicac') || q.includes('práctica') || q.includes('impresora') || q.includes('taller')) {
      return `🏢 **Experiencia en Unitel Sistemas de Telecomunicaciones** (Marzo - Junio 2025):\n\nSheyla completó sus prácticas de Formación Profesional en Unitel rotando por 4 áreas clave:\n\n• **Taller de Impresoras**: Diagnóstico técnico, mantenimiento preventivo/correctivo y cambio de piezas en equipos corporativos.\n• **Oficina de Proyectos**: Soporte en memorias técnicas, inventariado de material y documentación de proyectos.\n• **Oficina de Instalaciones**: Montaje de armarios rack, cableado de telecomunicaciones y conexionado de red.\n• **Oficina de Administración**: Tramitación de partes de avería, control de albaranes y archivo documental.`;
    }

    // 3. Inteligencia Artificial / IA
    if (q.includes('inteligencia artificial') || /(^|[^\p{L}\p{N}])ia($|[^\p{L}\p{N}])/u.test(q) || q.includes('modelo') || q.includes('cámara de comercio')) {
      return `🤖 **Formación y Competencias en Inteligencia Artificial**:\n\nSheyla ha cursado formación especializada en la **Cámara de Comercio de Toledo**:\n\n1. **Curso de Fundamentos Básicos de Inteligencia Artificial** (Agosto - Septiembre 2026):\n   • Modelos de IA, aprendizaje automático y herramientas generativas modernas.\n\n2. **Curso de Emprendimiento Inteligente con IA: Administración y Gestión** (Septiembre - Octubre 2026):\n   • Aplicación práctica de la IA a la administración, gestión documental, optimización de productividad y automatización de tareas de oficina.`;
    }

    // 4. Ciberseguridad / Phishing
    if (q.includes('phishing') || q.includes('seguridad') || q.includes('ciberseguridad') || q.includes('udemy')) {
      return `🛡️ **Formación en Ciberseguridad y Phishing**:\n\nEn **Julio 2024**, Sheyla completó el **Curso de Phishing en Udemy**, adquiriendo destrezas en:\n• Detección y análisis de correos sospechosos y cabeceras SMTP.\n• Prevención de ataques de ingeniería social y suplantación de identidad.\n• Buenas prácticas de seguridad para protección de puestos de trabajo.`;
    }

    // 5. Experiencia Laboral Completa
    if (q.includes('experiencia') || q.includes('trabaj') || q.includes('laboral') || q.includes('cafeter') || q.includes('infancia') || q.includes('administrativ') || q.includes('cuidado')) {
      return `💼 **Experiencia Laboral Oficial de Sheyla** *(cronológica de antes a ahora, 2022 a 2026)*:\n\n1. **Atención a la Infancia** (2022 - 2024)\n   • Cuidado de niños por las tardes después de los estudios escolares. Responsabilidad, paciencia y puntualidad.\n\n2. **Unitel Sistemas de Telecomunicaciones** (Marzo - Junio 2025)\n   • Taller de impresoras, Oficina de proyectos, Oficina de instalaciones y Oficina de administración.\n\n3. **Administrativa en Instalaciones** (Agosto - Octubre 2025)\n   • Cargo de administrativa en instalaciones: gestión de partes de trabajo, albaranes y suministros de obra.\n\n4. **Cafetería Masa Madre** (Febrero - Marzo 2026)\n   • Personal de barra, mesera y cocina. Organización y trato directo al cliente.\n\n5. **Cafetería Elegance** (Marzo - Mayo 2026)\n   • Personal de barra, mesera y cocina. Dinamismo, servicio cara al público y trabajo en equipo.`;
    }

    // 6. Habilidades / Competencias
    if (q.includes('habilidad') || q.includes('competencia') || q.includes('puntos fuertes') || q.includes('redes') || q.includes('sistemas') || q.includes('liderazgo')) {
      return `⚡ **Habilidades y Competencias de Sheyla** *(según su currículum)*:\n\n• **Competencias de Gestión y Humanas**:\n  - Buena coordinación y liderazgo.\n  - Resolución metódica de problemas y trabajo en equipo.\n  - Capacidad contrastada de comunicación cara al público.\n  - Organización de tareas, planificación y seguimiento de proyectos.\n  - En aprendizaje y formación continua.\n\n• **Competencias Técnicas**:\n  - Conocimientos de sistemas informáticos y administración de sistemas.\n  - Redes informáticas, direccionamiento y cableado.\n  - Conocimientos de páginas web y bases de datos relacionales.\n  - Conocimientos y aplicación de Inteligencia Artificial.`;
    }

    // 7. Contacto / Ubicación
    if (q.includes('contact') || q.includes('teléfono') || q.includes('telefono') || q.includes('correo') || q.includes('email') || q.includes('dónde vive') || q.includes('donde vive') || q.includes('ubicaci') || q.includes('fuensalida') || q.includes('toledo')) {
      return `📫 **Datos Oficiales de Contacto de Sheyla**:\n\n• **Nombre**: ${PERSONAL_INFO.fullName}\n• **Ubicación**: ${PERSONAL_INFO.location}\n• **Teléfono**: ${PERSONAL_INFO.phone}\n• **Email**: ${PERSONAL_INFO.email}\n\nPuedes llamarla o enviarle un correo para cualquier propuesta laboral o concertar una entrevista.`;
    }

    // 8. Quién es / Perfil
    if (q.includes('quién es') || q.includes('quien es') || q.includes('sobre ella') || q.includes('presenta') || q.includes('perfil') || q.includes('resumen')) {
      return `👋 **Perfil Profesional de Sheyla Thalía Gutiérrez Larquín**:\n\nEspecialista en **Administración de Sistemas Informáticos y Redes (ASIR)** e **Inteligencia Artificial**. Combina una formación técnica rigurosa (sistemas, redes, bases de datos y herramientas de IA) con gran experiencia en trato humano, comunicación cara al público y organización administrativa.`;
    }

    // 9. Cara al público / Hostelería
    if (q.includes('cara al público') || q.includes('publico') || q.includes('cliente') || q.includes('comunicaci')) {
      return `🤝 **Experiencia Cara al Público**:\n\nSheyla cuenta con experiencia directa de trato con clientes y personas adquirida tanto en su puesto de **Administrativa en Instalaciones** (coordinando con clientes y operarios), como en las cafeterías **Elegance** y **Masa Madre** (barra, sala y atención rápida) y en el cuidado infantil de 2022 a 2024.`;
    }

    // Default estricto sin inventos
    return `ℹ️ **Información estricta del CV**:\n\nEsa información específica no consta en el currículum oficial de Sheyla. Para asegurarnos de no proporcionar datos inexactos, puedes consultarlo directamente con ella:\n\n• **Correo**: ${PERSONAL_INFO.email}\n• **Teléfono**: ${PERSONAL_INFO.phone}\n• **Ubicación**: ${PERSONAL_INFO.location}`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Ahora'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    responseTimeoutRef.current = setTimeout(() => {
      const botResponseText = generateAnswer(query);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: 'Ahora'
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 400);
  };

  const resetChat = () => {
    if (responseTimeoutRef.current) {
      clearTimeout(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }
    setMessages([initialGreeting]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Botón Flotante con ICONO DE ROBOT súper llamativo */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {!isOpen && hasUnreadAlert && (
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border-2 border-white/30 max-w-xs">
            <Bot className="w-4 h-4 text-cyan-200 shrink-0" />
            <span>¡Pregúntale al Robot sobre Sheyla!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasUnreadAlert(false);
              }}
              className="text-white/80 hover:text-white ml-1 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasUnreadAlert(false);
          }}
          aria-label="Abrir robot asistente sobre Sheyla"
          className="group relative flex items-center gap-3 p-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ring-4 ring-cyan-400/40"
        >
          {/* ICONO DEL ROBOT LLAMATIVO */}
          <div className="relative w-11 h-11 rounded-full bg-slate-900 border-2 border-cyan-300 text-cyan-300 flex items-center justify-center shadow-inner shrink-0 group-hover:rotate-12 transition-transform">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>

          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="text-xs font-extrabold leading-none tracking-tight flex items-center gap-1.5">
              <span>Robot Asistente</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            </span>
            <span className="text-[10px] text-cyan-100 font-medium mt-0.5">
              Datos 100% Verificados del CV
            </span>
          </div>

          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
            {isOpen ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
          </div>
        </button>
      </div>

      {/* Ventana Modal del Chatbot */}
      {isOpen && (
        <div role="dialog" aria-modal="true" aria-label="Robot asistente de Sheyla" className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[440px] sm:max-h-[640px] z-50 flex flex-col bg-white dark:bg-slate-900 sm:rounded-3xl shadow-2xl border-2 border-blue-500/40 dark:border-blue-400/30 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Cabecera del Robot */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white flex items-center justify-between shadow-md border-b border-blue-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight flex items-center gap-1.5 text-white">
                  <span>Robot Asistente de Sheyla</span>
                  <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono font-semibold">
                    OFICIAL
                  </span>
                </h3>
                <p className="text-[11px] text-cyan-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Sin datos inventados · Respuestas del CV</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reiniciar conversación"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar chat"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Historial de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 dark:bg-slate-950/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-900 border border-cyan-400 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  <p className="leading-relaxed">
                    {msg.text
                      .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
                      .map((part, index) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={index}>{part.slice(2, -2)}</strong>;
                        }
                        if (part.startsWith('*') && part.endsWith('*')) {
                          return <em key={index}>{part.slice(1, -1)}</em>;
                        }
                        return part;
                      })}
                  </p>

                  {/* Preguntas sugeridas */}
                  {msg.quickReplies && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/80 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Preguntas frecuentes rápidas:
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {msg.quickReplies.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(q)}
                            className="text-[11px] font-medium text-left px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-slate-700/80 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-700 border border-blue-200/60 dark:border-slate-600 transition-colors flex items-center justify-between"
                          >
                            <span>{q}</span>
                            <span className="text-blue-400 text-xs">→</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <div className="w-6 h-6 rounded-lg bg-slate-900 border border-cyan-400 text-cyan-300 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-200"></span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">Consultando currículum...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input de Envío */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Pregúntame sobre los estudios o experiencia de Sheyla..."
                disabled={isTyping}
                className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-2 focus:outline-blue-600"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-colors"
                aria-label="Enviar pregunta al robot"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Asistente programado estrictamente con los datos de Sheyla Thalía Gutiérrez Larquín.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
