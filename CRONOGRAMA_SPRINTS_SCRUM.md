# Metodología Scrum y Cronograma Detallado de Sprints

**Proyecto:** FinAnalytics — Plataforma Web de Análisis Financiero Integral  
**Institución:** Universidad del Valle de Guatemala — Campus Sololá  
**Carrera:** Tecnología de Sistemas Informáticos  
**Curso:** Contabilidad Financiera  
**Catedrática:** Licda. Gloria León  
**Fecha de Inicio:** 22 de agosto de 2026  
**Fecha de Entrega Final:** 7 de noviembre de 2026  

---

## 1. Organización del Equipo y Roles Scrum

El proyecto se gestiona bajo el marco ágil Scrum con cuatro integrantes que cumplen funciones técnicas y de gestión de manera fija durante todo el ciclo de desarrollo:

| Integrante | Rol Scrum | Área Técnica Principal | Responsabilidad Primaria |
| :--- | :--- | :--- | :--- |
| **Natán Saquic** | Product Owner | Backend y Lógica Financiera | Define y prioriza el Product Backlog, valida los incrementos funcionales en cada Sprint Review y desarrolla el motor matemático de cálculo financiero (Estados Financieros, Razones, VPN y TIR). |
| **Danilo Bulux** | Scrum Master | Frontend y UX/UI | Facilita las ceremonias ágiles (Planning, Daily, Review, Retrospectiva), elimina impedimentos del equipo y desarrolla la interfaz de usuario, formularios de captura y visualización de indicadores. |
| **Alexis Rosales** | Development Team | Módulo de Reportes | Participa en la estimación de historias de usuario y construye el módulo de generación de reportes descargables en formato Excel (.csv) y PDF imprimible, incluyendo la redacción ejecutiva. |
| **Elian Rosales** | Development Team | Control de Calidad (QA) y Datos | Diseña la hoja de datos financieros simulados de prueba como fuente de verdad, ejecuta casos de prueba unitarios e integrales y realiza la verificación manual de las fórmulas contables. |

---

## 2. Definición de Criterios de Calidad

### 2.1 Definición de Listo (Definition of Ready - DoR)
Una historia de usuario puede ingresar a un Sprint Planning únicamente si satisface las siguientes condiciones:
1. Redacción bajo el formato estándar: *"Como [tipo de usuario], quiero [funcionalidad], para [beneficio esperado]"*.
2. Criterios de aceptación explícitos, cuantificables y verificables.
3. Estimación formal en puntos de historia (Story Points) bajo la secuencia de Fibonacci (1, 2, 3, 5, 8, 13).
4. Independencia técnica: no depender de historias bloqueadas o no completadas.

### 2.2 Definición de Terminado (Definition of Done - DoD)
Una historia de usuario se considera formalmente terminada cuando:
1. El código fuente ha sido desarrollado, integrado a la rama principal y revisado por pares.
2. Los cálculos matemáticos han sido verificados manualmente por el área de QA (Elian Rosales) contra la hoja de datos financieros de control, con 100% de coincidencia.
3. La interfaz ha sido probada en navegador web sin inconsistencias visuales ni errores de ejecución.
4. La funcionalidad ha sido demostrada y aprobada por el Product Owner (Natán Saquic) durante la sesión de Sprint Review.

---

## 3. Cronograma General de los 6 Sprints

El ciclo de desarrollo comprende 11 semanas de trabajo divididas en 6 sprints consecutivos, con cierres programados los días sábado coincidiendo con la sesión semanal de clase:

| Sprint | Período de Ejecución | Objetivo del Sprint (Sprint Goal) | Entregable Principal |
| :---: | :---: | :--- | :--- |
| **Sprint 0** | 24 – 29 ago 2026 | Establecer las bases técnicas del proyecto: arquitectura, backlog inicial y conjuntos de datos de prueba. | Product Backlog inicial priorizado, arquitectura del sistema definida y hoja de datos financieros de prueba (fuente de verdad). |
| **Sprint 1** | 31 ago – 12 sep 2026 | Permitir la captura estructurada de los datos financieros base de la empresa con validaciones de consistencia. | Módulo de ingreso de datos funcional con validaciones preventivas de coherencia contable (Módulos 9.1 y 9.6). |
| **Sprint 2** | 14 – 26 sep 2026 | Generar automáticamente los estados financieros proyectados a partir de los datos capturados. | Módulo de estados financieros: Estado de Resultados multianual y Estado de Flujo de Caja Libre con fórmulas visibles (Módulo 9.2). |
| **Sprint 3** | 28 sep – 10 oct 2026 | Proveer una visualización integral del estado del negocio mediante indicadores de gestión financiera. | Dashboard visual con 11 razones financieras (Liquidez, Rentabilidad, Endeudamiento) con clasificación semáforo e interpretación textual (Módulo 9.3). |
| **Sprint 4** | 12 – 24 oct 2026 | Evaluar y comparar la viabilidad económica de proyectos de inversión bajo condiciones de incertidumbre. | Módulo de evaluación de proyectos con cálculo automático de VPN, TIR (Newton-Raphson), Payback y análisis comparativo de 3 escenarios (Módulo 9.4). |
| **Sprint 5** | 26 oct – 7 nov 2026 | Consolidar los resultados del análisis en un reporte ejecutivo descargable y preparar el cierre formal del proyecto. | Módulo de reportes con exportación a Excel y PDF, dictamen en lenguaje claro, informe técnico final y exposición ante la cátedra (Módulo 9.5). |

---

## 4. Product Backlog Priorizado (18 Historias de Usuario - 91 Puntos de Historia)

La priorización del trabajo se estructuró mediante la técnica MoSCoW (*Must have*, *Should have*), totalizando 91 story points distribuidos a lo largo de los seis sprints:

| ID | Historia de Usuario | Prioridad | Puntos | Sprint | Responsable Principal |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **HU-01** | Como equipo de desarrollo, queremos definir la arquitectura técnica y el stack tecnológico del proyecto, para tener una base sólida de desarrollo. | Must | 3 | Sprint 0 | Natán Saquic |
| **HU-02** | Como equipo de desarrollo, queremos contar con una hoja de datos financieros simulados de una empresa de servicios, para probar todos los módulos del sistema. | Must | 3 | Sprint 0 | Elian Rosales |
| **HU-03** | Como usuario, quiero crear un perfil de empresa ingresando su nombre y sector, para identificar los datos financieros que voy a analizar. | Must | 3 | Sprint 1 | Danilo Bulux |
| **HU-04** | Como usuario, quiero ingresar mis ventas, costos y gastos mensuales, para que el sistema calcule mis estados financieros. | Must | 5 | Sprint 1 | Natán Saquic |
| **HU-05** | Como usuario, quiero que el sistema valide que los datos ingresados sean coherentes, para evitar errores en los cálculos. | Must | 3 | Sprint 1 | Elian Rosales |
| **HU-06** | Como usuario, quiero visualizar automáticamente mi estado de resultados, para conocer mi utilidad neta sin hacer cálculos manuales. | Must | 8 | Sprint 2 | Natán Saquic |
| **HU-07** | Como usuario, quiero visualizar mi flujo de caja proyectado, para anticipar problemas de liquidez. | Must | 8 | Sprint 2 | Natán Saquic |
| **HU-08** | Como usuario, quiero ver mis estados financieros en un formato claro y ordenado, para entenderlos sin conocimientos contables avanzados. | Should | 3 | Sprint 2 | Danilo Bulux |
| **HU-09** | Como usuario, quiero visualizar un dashboard con mis principales razones financieras, para evaluar la salud financiera de mi empresa de un vistazo. | Must | 8 | Sprint 3 | Danilo Bulux |
| **HU-10** | Como usuario, quiero ver gráficas de tendencia de mis indicadores financieros, para identificar mejoras o deterioros en el tiempo. | Should | 5 | Sprint 3 | Danilo Bulux |
| **HU-11** | Como usuario, quiero recibir una breve interpretación de cada razón financiera, para entender qué significa el resultado obtenido. | Should | 3 | Sprint 3 | Natán Saquic |
| **HU-12** | Como usuario, quiero ingresar los datos de un proyecto de inversión (monto, flujos esperados, tasa de descuento), para evaluar si conviene realizarlo. | Must | 5 | Sprint 4 | Natán Saquic |
| **HU-13** | Como usuario, quiero que el sistema calcule automáticamente el VPN y la TIR de mi inversión, para tomar una decisión informada. | Must | 8 | Sprint 4 | Natán Saquic |
| **HU-14** | Como usuario, quiero comparar dos o más escenarios de inversión, para elegir el que ofrezca mejor rendimiento. | Should | 5 | Sprint 4 | Natán Saquic |
| **HU-15** | Como usuario, quiero que el sistema me indique el período de recuperación de la inversión, para saber en cuánto tiempo recupero mi dinero. | Must | 3 | Sprint 4 | Elian Rosales |
| **HU-16** | Como usuario, quiero descargar un reporte en PDF con todos mis resultados financieros, para compartirlo o archivarlo. | Must | 8 | Sprint 5 | Alexis Rosales |
| **HU-17** | Como usuario, quiero descargar mis resultados en un archivo Excel editable, para hacer análisis adicionales por mi cuenta. | Should | 5 | Sprint 5 | Alexis Rosales |
| **HU-18** | Como usuario, quiero que el reporte final incluya una recomendación en lenguaje claro, para tomar decisiones sin depender de un especialista. | Must | 5 | Sprint 5 | Alexis Rosales |

**Total de Puntos del Proyecto:** 91 Story Points  
**Historias Must:** 14 historias (75 puntos)  
**Historias Should:** 4 historias (16 puntos)  

---

## 5. Eventos y Ceremonias Ágiles

1. **Sprint Planning:** Realizado al inicio de cada sprint los días lunes para seleccionar los ítems del backlog y fijar el Sprint Goal.
2. **Daily Scrum:** Sesiones breves de seguimiento diario (15 minutos) a cargo del Scrum Master (Danilo Bulux) para registrar avances y mitigar bloqueos.
3. **Sprint Review:** Demostración formal de los incrementos de software terminados los días sábado ante los stakeholders y la cátedra.
4. **Retrospectiva del Sprint:** Análisis de mejora continua inmediatamente después de cada Review para implementar ajustes de proceso en la siguiente iteración.
