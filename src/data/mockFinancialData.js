export const defaultFinancialInputs = {
  companyName: "Calzados y Textiles del Altiplano, S.A.",
  nit: "8492019-3",
  location: "Sololá, Guatemala",
  sector: "Manufactura",
  contactPerson: "Don Carlos Xep",
  currency: "GTQ", // GTQ or USD
  
  // Inversión Inicial
  machinery: 90000,
  furniture: 30000,
  workingCapital: 30000,
  depreciationYears: 5,
  wacc: 12.0, // Tasa de corte (%)

  // Ventas Proyectadas (Años 1 al 5)
  salesY1: 320000,
  salesY2: 380000,
  salesY3: 450000,
  salesY4: 520000,
  salesY5: 600000,

  // Costos y Gastos
  costPercentage: 55, // %
  adminExpenses: 38000,
  salesExpenses: 27000,
  taxRate: 25, // ISR Guatemala (25%)

  // Financiamiento
  bankDebt: 50000,
  interestRate: 10.5 // % anual
};

export const sectorPresets = {
  Manufactura: {
    companyName: "Calzados y Textiles del Altiplano, S.A.",
    sector: "Manufactura",
    location: "Sololá, Guatemala",
    nit: "8492019-3",
    machinery: 90000,
    furniture: 30000,
    workingCapital: 30000,
    wacc: 12.0,
    salesY1: 320000,
    salesY2: 380000,
    salesY3: 450000,
    salesY4: 520000,
    salesY5: 600000,
    costPercentage: 55,
    adminExpenses: 38000,
    salesExpenses: 27000,
    taxRate: 25,
    bankDebt: 50000,
    interestRate: 10.5
  },
  Comercio: {
    companyName: "Distribuidora Comercial Sololá, S.A.",
    sector: "Comercio",
    location: "Panajachel, Sololá",
    nit: "5910243-1",
    machinery: 35000,
    furniture: 25000,
    workingCapital: 50000,
    wacc: 11.5,
    salesY1: 450000,
    salesY2: 520000,
    salesY3: 610000,
    salesY4: 700000,
    salesY5: 800000,
    costPercentage: 68,
    adminExpenses: 42000,
    salesExpenses: 31000,
    taxRate: 25,
    bankDebt: 40000,
    interestRate: 11.0
  },
  Servicios: {
    companyName: "Servicios Digitales y Logísticos de Atitlán",
    sector: "Servicios",
    location: "Sololá, Guatemala",
    nit: "7209148-5",
    machinery: 45000,
    furniture: 15000,
    workingCapital: 25000,
    wacc: 13.0,
    salesY1: 280000,
    salesY2: 340000,
    salesY3: 410000,
    salesY4: 490000,
    salesY5: 580000,
    costPercentage: 25,
    adminExpenses: 52000,
    salesExpenses: 22000,
    taxRate: 25,
    bankDebt: 25000,
    interestRate: 10.0
  }
};

export const projectInfo = {
  university: "Universidad del Valle de Guatemala",
  campus: "Campus Sololá",
  program: "Tecnología de Sistemas Informáticos",
  course: "Contabilidad Financiera",
  professor: "Licda. Gloria León",
  teamName: "FinAnalytics",
  documentTitle: "Fase de organización para el proyecto e implementación",
  creationDate: "22 de agosto de 2026",
  deliveryDate: "7 de noviembre de 2026",
  methodology: "SCRUM (6 Sprints, 91 Story Points, 18 Historias de Usuario)",
  
  members: [
    {
      name: "Natán Saquic",
      scrumRole: "Product Owner",
      technicalArea: "Backend / Lógica financiera",
      scrumDuty: "Define y prioriza el Product Backlog, representa la voz del negocio/usuario, acepta/rechaza incrementos en Sprint Review y es responsable ante la cátedra.",
      technicalDuty: "Diseño de la arquitectura del sistema, desarrollo del motor de cálculo (estados financieros, razones, VPN, TIR y payback) y de la API conectora."
    },
    {
      name: "Danilo Bulux",
      scrumRole: "Scrum Master",
      technicalArea: "Frontend / UX-UI",
      scrumDuty: "Facilita las ceremonias Scrum (Planning, Daily, Review, Retrospectiva), elimina impedimentos y vela por el cumplimiento del proceso ágil.",
      technicalDuty: "Diseño y desarrollo de la interfaz web: formularios de ingreso, dashboard visual de razones financieras y gráficas de tendencia accesibles."
    },
    {
      name: "Alexis Rosales",
      scrumRole: "Development Team",
      technicalArea: "Módulo de Reportes",
      scrumDuty: "Participa en la estimación de historias de usuario (Fibonacci) y en la construcción del incremento en cada sprint.",
      technicalDuty: "Desarrollo del módulo de generación de reportes descargables (PDF y Excel), redacción automática de la recomendación en lenguaje claro."
    },
    {
      name: "Elian Rosales",
      scrumRole: "Development Team",
      technicalArea: "QA y Datos",
      scrumDuty: "Participa en la estimación de historias de usuario (Fibonacci) y en la construcción del incremento en cada sprint.",
      technicalDuty: "Construcción y validación de la hoja de datos financieros simulados (fuente de verdad), diseño de casos de prueba, control de calidad y verificación manual de fórmulas contables."
    }
  ]
};

export const sprints = [
  {
    number: 0,
    name: "Sprint 0 — Fundamentos del proyecto",
    dates: "24 – 29 ago 2026",
    goal: "Establecer las bases del proyecto: backlog, arquitectura y datos de prueba.",
    deliverable: "Product Backlog inicial, arquitectura definida y conjunto de datos financieros de prueba.",
    userStories: ["HU-01", "HU-02"],
    status: "Completado"
  },
  {
    number: 1,
    name: "Sprint 1 — Ingreso y validación de datos",
    dates: "31 ago – 12 sep 2026",
    goal: "Permitir que el usuario capture los datos financieros base de su empresa de forma validada.",
    deliverable: "Módulo de ingreso de datos funcional, con validaciones básicas (9.1 y 9.6).",
    userStories: ["HU-03", "HU-04", "HU-05"],
    status: "Completado"
  },
  {
    number: 2,
    name: "Sprint 2 — Estados financieros automatizados",
    dates: "14 – 26 sep 2026",
    goal: "Generar automáticamente los estados financieros a partir de los datos capturados.",
    deliverable: "Módulo de estados financieros: estado de resultados y flujo de caja (9.2).",
    userStories: ["HU-06", "HU-07", "HU-08"],
    status: "Completado"
  },
  {
    number: 3,
    name: "Sprint 3 — Dashboard de razones financieras",
    dates: "28 sep – 10 oct 2026",
    goal: "Ofrecer al usuario una visión clara de la salud financiera de su empresa.",
    deliverable: "Dashboard de razones financieras con gráficas e interpretación (9.3).",
    userStories: ["HU-09", "HU-10", "HU-11"],
    status: "Completado"
  },
  {
    number: 4,
    name: "Sprint 4 — Evaluación de proyectos de inversión",
    dates: "12 – 24 oct 2026",
    goal: "Permitir evaluar y comparar proyectos de inversión de forma automática.",
    deliverable: "Módulo de evaluación de inversión: VPN, TIR y período de recuperación (9.4).",
    userStories: ["HU-12", "HU-13", "HU-14", "HU-15"],
    status: "Completado"
  },
  {
    number: 5,
    name: "Sprint 5 — Reportes, cierre y exposición",
    dates: "26 oct – 7 nov 2026",
    goal: "Consolidar los resultados en un reporte descargable y cerrar el proyecto.",
    deliverable: "Módulo de reportes (PDF/Excel), QA integral, informe escrito y exposición final (9.5).",
    userStories: ["HU-16", "HU-17", "HU-18"],
    status: "Completado"
  }
];

export const productBacklog = [
  { id: "HU-01", story: "Como equipo de desarrollo, queremos definir la arquitectura técnica y el stack tecnológico del proyecto, para tener una base sólida de desarrollo.", priority: "Must", points: 3, sprint: "Sprint 0", owner: "Natán Saquic", done: true },
  { id: "HU-02", story: "Como equipo de desarrollo, queremos contar con una hoja de datos financieros simulados de una empresa de servicios, para probar todos los módulos del sistema.", priority: "Must", points: 3, sprint: "Sprint 0", owner: "Elian Rosales", done: true },
  { id: "HU-03", story: "Como usuario, quiero crear un perfil de empresa ingresando su nombre y sector, para identificar los datos financieros que voy a analizar.", priority: "Must", points: 3, sprint: "Sprint 1", owner: "Danilo Bulux", done: true },
  { id: "HU-04", story: "Como usuario, quiero ingresar mis ventas, costos y gastos mensuales, para que el sistema calcule mis estados financieros.", priority: "Must", points: 5, sprint: "Sprint 1", owner: "Natán Saquic", done: true },
  { id: "HU-05", story: "Como usuario, quiero que el sistema valide que los datos ingresados sean coherentes, para evitar errores en los cálculos.", priority: "Must", points: 3, sprint: "Sprint 1", owner: "Elian Rosales", done: true },
  { id: "HU-06", story: "Como usuario, quiero visualizar automáticamente mi estado de resultados, para conocer mi utilidad neta sin hacer cálculos manuales.", priority: "Must", points: 8, sprint: "Sprint 2", owner: "Natán Saquic", done: true },
  { id: "HU-07", story: "Como usuario, quiero visualizar mi flujo de caja proyectado, para anticipar problemas de liquidez.", priority: "Must", points: 8, sprint: "Sprint 2", owner: "Natán Saquic", done: true },
  { id: "HU-08", story: "Como usuario, quiero ver mis estados financieros en un formato claro y ordenado, para entenderlos sin conocimientos contables avanzados.", priority: "Should", points: 3, sprint: "Sprint 2", owner: "Danilo Bulux", done: true },
  { id: "HU-09", story: "Como usuario, quiero visualizar un dashboard con mis principales razones financieras, para evaluar la salud financiera de mi empresa de un vistazo.", priority: "Must", points: 8, sprint: "Sprint 3", owner: "Danilo Bulux", done: true },
  { id: "HU-10", story: "Como usuario, quiero ver gráficas de tendencia de mis indicadores financieros, para identificar mejoras o deterioros en el tiempo.", priority: "Should", points: 5, sprint: "Sprint 3", owner: "Danilo Bulux", done: true },
  { id: "HU-11", story: "Como usuario, quiero recibir una breve interpretación de cada razón financiera, para entender qué significa el resultado obtenido.", priority: "Should", points: 3, sprint: "Sprint 3", owner: "Natán Saquic", done: true },
  { id: "HU-12", story: "Como usuario, quiero ingresar los datos de un proyecto de inversión (monto, flujos esperados, tasa de descuento), para evaluar si conviene realizarlo.", priority: "Must", points: 5, sprint: "Sprint 4", owner: "Natán Saquic", done: true },
  { id: "HU-13", story: "Como usuario, quiero que el sistema calcule automáticamente el VPN y la TIR de mi inversión, para tomar una decisión informada.", priority: "Must", points: 8, sprint: "Sprint 4", owner: "Natán Saquic", done: true },
  { id: "HU-14", story: "Como usuario, quiero comparar dos o más escenarios de inversión, para elegir el que ofrezca mejor rendimiento.", priority: "Should", points: 5, sprint: "Sprint 4", owner: "Natán Saquic", done: true },
  { id: "HU-15", story: "Como usuario, quiero que el sistema me indique el período de recuperación de la inversión, para saber en cuánto tiempo recupero mi dinero.", priority: "Must", points: 3, sprint: "Sprint 4", owner: "Elian Rosales", done: true },
  { id: "HU-16", story: "Como usuario, quiero descargar un reporte en PDF con todos mis resultados financieros, para compartirlo o archivarlo.", priority: "Must", points: 8, sprint: "Sprint 5", owner: "Alexis Rosales", done: true },
  { id: "HU-17", story: "Como usuario, quiero descargar mis resultados en un archivo Excel editable, para hacer análisis adicionales por mi cuenta.", priority: "Should", points: 5, sprint: "Sprint 5", owner: "Alexis Rosales", done: true },
  { id: "HU-18", story: "Como usuario, quiero que el reporte final incluya una recomendación en lenguaje claro, para tomar decisiones sin depender de un especialista.", priority: "Must", points: 5, sprint: "Sprint 5", owner: "Alexis Rosales", done: true }
];
