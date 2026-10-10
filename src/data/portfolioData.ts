export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  category: 'tecnico' | 'gestion' | 'atencion';
  description: string;
  subareas?: string[];
  achievements: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  yearStart: number;
  type: 'academico' | 'especializacion';
  description: string;
  topics: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    description: string;
    tags: string[];
  }[];
}

export const PERSONAL_INFO = {
  fullName: 'Sheyla Thalía Gutiérrez Larquín',
  shortName: 'Sheyla Thalía',
  title: 'Administración de Sistemas Informáticos y Redes (ASIR) e Inteligencia Artificial',
  headline: 'Técnica Superior en Sistemas & Redes con especialización en Inteligencia Artificial y Gestión Operativa',
  location: 'Fuensalida, Toledo, España',
  email: 'sheylathalia04@gmail.com',
  phone: '+34 681-20-25-52',
  phoneClean: '+34681202552',
  profileImage: 'assets/img/sheyla.jfif',
  profileImageFallback: 'assets/img/sheyla.jpg',
  aboutBio: `Técnica Superior en Administración de Sistemas Informáticos y Redes (ASIR) complementada con formación avanzada en Inteligencia Artificial y Ciberseguridad por la Cámara de Comercio de Toledo y Udemy. Cuento con experiencia práctica en empresas tecnológicas punteras como Unitel Sistemas de Telecomunicaciones, interviniendo en mantenimiento de hardware de taller, oficinas de proyectos, despliegues de instalaciones de telecomunicaciones y tareas administrativas técnicas.

Mi perfil combina una sólida base técnica en infraestructuras de red, servidores y bases de datos con excelentes capacidades de comunicación, coordinación de equipos, resolución de problemas y atención directa al cliente forjada a lo largo de diversas etapas formativas y laborales. Me mantengo en continuo aprendizaje para aportar valor innovador, orden y eficiencia a cualquier organización.`,
  strengths: [
    {
      title: 'Infraestructura & Telecomunicaciones',
      desc: 'Administración de servidores, redes locales, cableado, racks y diagnóstico de equipos en taller.'
    },
    {
      title: 'Inteligencia Artificial Aplicada',
      desc: 'Integración de herramientas de IA para optimización de tareas administrativas, gestión y productividad.'
    },
    {
      title: 'Versatilidad Operativa & Trabajo en Equipo',
      desc: 'Capacidad contrastada en gestión administrativa, comunicación cara al público y resolución ágil de incidencias.'
    }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'sistemas',
    name: 'Sistemas & Redes',
    description: 'Gestión de infraestructura tecnológica, telecomunicaciones y soporte técnico',
    skills: [
      {
        name: 'Administración de Sistemas Operativos',
        description: 'Instalación, configuración y mantenimiento de entornos Windows Server y distribuciones GNU/Linux.',
        tags: ['Windows Server', 'Linux (Debian/Ubuntu)', 'Servicios del Sistema', 'Soporte TI']
      },
      {
        name: 'Redes Informáticas & Telecomunicaciones',
        description: 'Arquitectura de red local, protocolos TCP/IP, direccionamiento, conmutación y cableado estructurado.',
        tags: ['TCP/IP', 'VLANs', 'Switches y Routers', 'Cableado de Red', 'Racks']
      },
      {
        name: 'Taller de Hardware & Mantenimiento',
        description: 'Diagnóstico de averías, mantenimiento preventivo y correctivo, y reparación de equipos e impresoras.',
        tags: ['Taller de Impresoras', 'Mantenimiento Hardware', 'Ensamblaje', 'Diagnóstico']
      },
      {
        name: 'Ciberseguridad & Detección de Phishing',
        description: 'Prevención de ataques de ingeniería social, análisis de amenazas por correo electrónico y buenas prácticas.',
        tags: ['Prevención Phishing', 'Políticas de Seguridad', 'Hardening Básico', 'Udemy Certified']
      }
    ]
  },
  {
    id: 'ia',
    name: 'Inteligencia Artificial & Datos',
    description: 'Aplicación práctica de modelos de IA, datos relacionales y tecnologías web',
    skills: [
      {
        name: 'Fundamentos de Inteligencia Artificial',
        description: 'Comprensión de modelos, flujos de trabajo inteligentes y herramientas modernas de IA generativa.',
        tags: ['Fundamentos IA', 'Modelos Generativos', 'Automatización de Tareas', 'Cámara de Comercio']
      },
      {
        name: 'Emprendimiento & Gestión con IA',
        description: 'Optimización de procesos de administración, redacción técnica, análisis y productividad operativa.',
        tags: ['Gestión Inteligente', 'Productividad', 'Optimización de Procesos', 'Innovación']
      },
      {
        name: 'Bases de Datos Relacionales',
        description: 'Diseño conceptual, consultas estructuradas SQL y mantenimiento de la integridad de datos.',
        tags: ['SQL', 'Consultas & Tablas', 'Modelado Relacional', 'Gestión de Datos']
      },
      {
        name: 'Desarrollo de Páginas Web',
        description: 'Construcción y maquetación de interfaces web modernas y adaptables para usuarios finales.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Diseño Responsive']
      }
    ]
  },
  {
    id: 'gestion',
    name: 'Gestión & Competencias Personales',
    description: 'Habilidades humanas, coordinación de tareas y atención cara al público',
    skills: [
      {
        name: 'Coordinación & Liderazgo',
        description: 'Iniciativa para guiar tareas grupales, coordinar intervenciones técnicas y facilitar el consenso.',
        tags: ['Liderazgo colaborativo', 'Coordinación de equipos', 'Organización']
      },
      {
        name: 'Resolución de Problemas & Toma de Decisiones',
        description: 'Capacidad analítica para abordar imprevistos con rapidez y soluciones pragmáticas.',
        tags: ['Pensamiento analítico', 'Resolución ágil', 'Adaptabilidad']
      },
      {
        name: 'Comunicación Cara al Público',
        description: 'Facilidad de trato empático y profesional, forjado en atención al cliente, hostelería y soporte.',
        tags: ['Trato al cliente', 'Escucha activa', 'Claridad expositiva']
      },
      {
        name: 'Planificación de Proyectos & Aprendizaje Continuo',
        description: 'Seguimiento meticuloso de plazos, priorización de actividades y actualización formativa constante.',
        tags: ['Gestión del tiempo', 'Seguimiento de tareas', 'Formación continua']
      }
    ]
  }
];

// ORDEN CRONOLÓGICO ESTRICTO: De antes a ahora (2022 -> 2026)
export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-infancia',
    role: 'Atención y Cuidado a la Infancia',
    organization: 'Servicio Particular',
    period: '2022 - 2024',
    location: 'Fuensalida, Toledo',
    category: 'atencion',
    description: 'Cuidado de niños en las tardes después de los estudios.',
    achievements: [
      'Desarrollo de alta responsabilidad, paciencia, empatía y puntualidad.',
      'Acompañamiento escolar, organización de rutinas y apoyo en deberes lectivos.',
      'Comunicación transparente y relación de confianza con las familias.'
    ]
  },
  {
    id: 'exp-unitel',
    role: 'Técnica en Prácticas (Sistemas & Telecomunicaciones)',
    organization: 'Unitel Sistemas de Telecomunicaciones',
    period: 'Marzo - Junio 2025',
    location: 'Toledo, España',
    category: 'tecnico',
    description: 'Desarrollo técnico y rotación profesional a través de cuatro oficinas especializadas de la empresa:',
    subareas: [
      'Taller de Impresoras: Diagnóstico, mantenimiento correctivo y sustitución de piezas mecánicas/electrónicas.',
      'Oficina de Proyectos: Soporte en elaboración de memorias técnicas, inventariado y documentación de pliegos.',
      'Oficina de Instalaciones: Despliegue de red en armarios rack, cableado estructurado y configuración de equipos.',
      'Oficina de Administración: Gestión de partes de avería, tramitación de órdenes de servicio y soporte documental.'
    ],
    achievements: [
      'Rotación exitosa demostrando polivalencia tanto en hardware como en gestión técnica.',
      'Diagnóstico y resolución de averías en equipos de impresión corporativos.',
      'Participación activa en despliegues reales de infraestructura de telecomunicaciones.'
    ]
  },
  {
    id: 'exp-administrativa',
    role: 'Administrativa en Instalaciones',
    organization: 'Cargo de Administrativa en Instalaciones',
    period: 'Agosto - Octubre 2025',
    location: 'Toledo, España',
    category: 'gestion',
    description: 'Cargo de administrativa en obras e instalaciones técnicas.',
    achievements: [
      'Tramitación y control de partes de trabajo de instaladores y partes de obra.',
      'Gestión de albaranes, pedidos de material y seguimiento de suministros técnicos.',
      'Coordinación directa entre personal de campo, oficina técnica y proveedores.'
    ]
  },
  {
    id: 'exp-masamadre',
    role: 'Personal de Barra, Mesera y Cocina',
    organization: 'Cafetería Masa Madre',
    period: 'Febrero - Marzo 2026',
    location: 'Toledo, España',
    category: 'atencion',
    description: 'Personal de barra, mesera, cocina. Organización y trato directo al cliente.',
    achievements: [
      'Atención en mostrador y mesas con servicio ágil y cordial.',
      'Preparación de comandas, gestión de cobros y mantenimiento de orden operativo.'
    ]
  },
  {
    id: 'exp-elegance',
    role: 'Personal de Barra, Mesera y Cocina',
    organization: 'Cafetería Elegance',
    period: 'Marzo - Mayo 2026',
    location: 'Toledo, España',
    category: 'atencion',
    description: 'Personal de barra, mesera, cocina. Servicio cara al público en horarios de alta intensidad.',
    achievements: [
      'Atención al cliente personalizada, ágil y resolutiva en picos de alta afluencia.',
      'Trabajo en equipo bajo presión manteniendo la calidad y el buen trato.',
      'Gestión coordinada entre sala, barra y cocina.'
    ]
  }
];

// ORDEN CRONOLÓGICO ESTRICTO: De antes a ahora (2021 -> 2026)
export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'edu-bachillerato',
    degree: 'Bachillerato de Ciencias de la Salud',
    institution: 'IES ALDEBARÁN',
    period: 'Septiembre 2021 - Junio 2023',
    yearStart: 2021,
    type: 'academico',
    description: 'Bachillerato de Ciencias de la Salud completado en el IES Aldebarán.',
    topics: [
      'Razonamiento lógico y metodología analítica',
      'Resolución estructurada de problemas',
      'Rigor científico y trabajo organizado'
    ]
  },
  {
    id: 'edu-asir',
    degree: 'Grado Superior en Administración de Sistemas Informáticos y Redes (ASIR)',
    institution: 'IES ALDEBARÁN',
    period: 'Septiembre 2023 - Junio 2025',
    yearStart: 2023,
    type: 'academico',
    description: 'Titulación oficial de Formación Profesional Superior completada en el IES Aldebarán.',
    topics: [
      'Implantación de Sistemas Operativos (Linux / Windows Server)',
      'Planificación y Administración de Redes Informáticas',
      'Gestión y Administración de Bases de Datos Relacionales (SQL)',
      'Seguridad Informática y Alta Disponibilidad',
      'Implantación de Aplicaciones Web y Servicios de Red'
    ]
  },
  {
    id: 'cur-phishing',
    degree: 'Curso de Phishing',
    institution: 'Udemy',
    period: 'Julio 2024',
    yearStart: 2024,
    type: 'especializacion',
    description: 'Curso especializado en técnicas de phishing, ingeniería social y prevención de ataques informáticos.',
    topics: [
      'Detección y análisis de correos electrónicos fraudulentos',
      'Vectores de ataque por suplantación de identidad',
      'Buenas prácticas y concienciación corporativa en seguridad'
    ]
  },
  {
    id: 'cur-ia-fundamentos',
    degree: 'Curso de Fundamentos Básicos de Inteligencia Artificial',
    institution: 'Cámara de Comercio de Toledo',
    period: 'Agosto 2026 - Septiembre 2026',
    yearStart: 2026,
    type: 'especializacion',
    description: 'Formación especializada en conceptos esenciales, modelos y herramientas modernas de Inteligencia Artificial.',
    topics: [
      'Conceptos clave de Inteligencia Artificial y Machine Learning',
      'Herramientas generativas y flujos de trabajo inteligentes',
      'Aplicación práctica en procesos empresariales'
    ]
  },
  {
    id: 'cur-ia-emprendimiento',
    degree: 'Curso de Emprendimiento Inteligente con Inteligencia Artificial: Administración y Gestión',
    institution: 'Cámara de Comercio de Toledo',
    period: 'Septiembre 2026 - Octubre 2026',
    yearStart: 2026,
    type: 'especializacion',
    description: 'Formación especializada en la optimización de procesos de administración y gestión empresarial mediante IA.',
    topics: [
      'IA aplicada a la administración y gestión empresarial',
      'Automatización de tareas operativas y optimización de productividad',
      'Estrategias de emprendimiento y modernización tecnológica'
    ]
  }
];
