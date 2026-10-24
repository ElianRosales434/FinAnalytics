# FinAnalytics - Plataforma Web de Análisis Financiero Integral

**Universidad del Valle de Guatemala (UVG) - Campus Sololá**  
**Facultad de Ingeniería / Tecnología de Sistemas Informáticos**  
**Curso:** Contabilidad Financiera  
**Catedrática:** Licda. Gloria León  
**Equipo:** FinAnalytics  

### Integrantes del Equipo
* **Natán Saquic:** Líder de Proyecto / Backend y Lógica Financiera
* **Danilo Bulux:** Desarrollador Principal / Frontend y UX/UI
* **Alexis Rosales:** Desarrollador / Módulo de Reportes y Exportación
* **Elian Rosales:** Control de Calidad (QA) y Modelado de Datos

---

## Descripción del Proyecto

FinAnalytics es una aplicación web interactiva desarrollada para que micro y pequeñas empresas puedan ingresar datos contables básicos y obtener de manera inmediata y automatizada un diagnóstico financiero completo:

1. **Ingreso y Validación de Datos:** Formulario estructurado con asistente de proyección de ventas a 5 años y validación preventiva de inconsistencias contables.
2. **Estados Financieros Proyectados:** Generación en tiempo real del Estado de Resultados multianual y el Estado de Flujo de Caja Libre con desglose de fórmulas.
3. **Dashboard de Razones Financieras:** Análisis de 11 indicadores de liquidez, rentabilidad y endeudamiento con diagnóstico semafórico e interpretaciones analíticas.
4. **Evaluación de Proyectos de Inversión:** Cálculo automático de Valor Presente Neto (VPN), Tasa Interna de Retorno (TIR mediante método de Newton-Raphson), período de recuperación simple y descontado, y comparación dinámica de 3 escenarios de sensibilidad (pesimista, base y optimista).
5. **Módulo de Reportes y Dictamen:** Generación de dictamen ejecutivo descargable en formato Excel (.csv compatible con UTF-8) e imprimible en PDF con formato formal.
6. **Gestión y Cronograma Scrum:** Documentación metodológica detallada disponible en [CRONOGRAMA_SPRINTS_SCRUM.md](CRONOGRAMA_SPRINTS_SCRUM.md).

---

## Tecnologías Utilizadas

* **React 18**
* **Vite**
* **Tailwind CSS**
* **Lucide React** (Iconografía técnica)

---

## Instalación y Ejecución Local

### Prerrequisitos
* Node.js (versión 18 o superior)
* npm

### Pasos de ejecución
1. Clonar el repositorio:
```bash
git clone https://github.com/ElianRosales434/proyecto-contabilidad.git
cd proyecto-contabilidad
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

4. Construcción para producción:
```bash
npm run build
```
Genera la carpeta optimizada `dist/` para despliegue en cualquier servidor web o plataforma estática.
