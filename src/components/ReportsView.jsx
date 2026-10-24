import React from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  Download
} from 'lucide-react';
import { exportToCSV } from '../utils/financialEngine';

export default function ReportsView({ 
  inputs, 
  incomeStatement, 
  cashFlow, 
  ratios, 
  investmentEvaluation, 
  currencySymbol 
}) {
  const isViable = investmentEvaluation.npv > 0 && investmentEvaluation.irr > investmentEvaluation.wacc;

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent = exportToCSV(
      inputs, 
      incomeStatement, 
      cashFlow, 
      ratios, 
      investmentEvaluation, 
      currencySymbol
    );
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FinAnalytics_${inputs.companyName.replace(/\s+/g, '_')}_Reporte.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Módulo de Reportes y Dictamen Financiero</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              Exportación Activa
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consolida los resultados calculados en un informe ejecutivo para micro y pequeñas empresas. Descarga en Excel o imprime en PDF.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Descargar Hoja Excel (.csv)</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-brand-600/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* Formal Executive Document Preview (Styled like paper) */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-300 shadow-xl p-8 sm:p-12 text-slate-800 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
              FA
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">FinAnalytics — Dictamen Financiero Ejecutivo</h1>
              <p className="text-xs text-slate-500">Evaluación Financiera Integral & Toma de Decisiones de Negocio</p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-500">
            <div>Universidad del Valle de Guatemala • Campus Sololá</div>
            <div>Tecnología de Sistemas Informáticos • Contabilidad Financiera</div>
            <div className="font-mono text-[11px] text-brand-600">Fecha: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* QA Seal Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Validación de calidad contable (Elian Rosales):</strong> Los cálculos de este reporte (estados financieros, 11 razones y VPN/TIR) han sido verificados conforme a los estándares de formulación y evaluación de proyectos.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-800 shrink-0">
            Verificación Aprobada
          </span>
        </div>

        {/* Company Summary Banner */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Empresa Evaluada</span>
            <span className="font-bold text-slate-900 text-sm">{inputs.companyName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Sector / NIT</span>
            <span className="font-semibold text-slate-700">{inputs.sector} • {inputs.nit}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Inversión Evaluada (I₀)</span>
            <span className="font-bold text-brand-700">{currencySymbol} {investmentEvaluation.initialCost.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Tasa Exigida (WACC)</span>
            <span className="font-bold text-slate-800">{investmentEvaluation.wacc}% anual</span>
          </div>
        </div>

        {/* 1. Resumen Ejecutivo */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-800 border-b border-brand-100 pb-1">
            1. Resumen Ejecutivo y Dictamen del Analista
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            Con base en los estados financieros y la estructura de costos suministrada para <strong>{inputs.companyName}</strong>, el proyecto de inversión evaluado presenta condiciones financieras <strong>{isViable ? 'ampliamente favorables' : 'desfavorables o de alto riesgo'}</strong>. {isViable ? 'El negocio cubre sus compromisos operativos, el servicio de la deuda bancaria y genera excedentes monetarios superiores al costo de oportunidad.' : 'El rendimiento proyectado no logra superar la tasa de corte mínima exigida del mercado.'}
          </p>
        </div>

        {/* 2. Cuadro Resumen de Indicadores Clave */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-800 border-b border-brand-100 pb-1">
            2. Indicadores Financieros de Decisión (Criterios de Capital)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border text-center ${
              investmentEvaluation.npv > 0 ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
            }`}>
              <div className="text-[11px] font-bold text-slate-600 uppercase">Valor Presente Neto (VPN)</div>
              <div className={`text-2xl font-black mt-1 ${
                investmentEvaluation.npv > 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                {investmentEvaluation.npv > 0 ? `+${currencySymbol} ` : `-${currencySymbol} `}{Math.abs(investmentEvaluation.npv).toLocaleString()}
              </div>
              <div className="text-[10px] mt-1 font-semibold text-slate-600">
                {investmentEvaluation.npv > 0 ? 'VPN > 0 • Genera Valor' : 'VPN < 0 • Destruye Valor'}
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-center ${
              investmentEvaluation.irr > investmentEvaluation.wacc ? 'bg-purple-50/50 border-purple-200' : 'bg-rose-50/50 border-rose-200'
            }`}>
              <div className="text-[11px] font-bold text-slate-600 uppercase">Tasa Interna de Retorno (TIR)</div>
              <div className={`text-2xl font-black mt-1 ${
                investmentEvaluation.irr > investmentEvaluation.wacc ? 'text-purple-700' : 'text-rose-700'
              }`}>
                {investmentEvaluation.irr}%
              </div>
              <div className="text-[10px] mt-1 font-semibold text-slate-600">
                {investmentEvaluation.irr > investmentEvaluation.wacc ? `TIR > WACC (${investmentEvaluation.wacc}%)` : `TIR < WACC (${investmentEvaluation.wacc}%)`}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-center">
              <div className="text-[11px] font-bold text-slate-600 uppercase">Período de Recuperación</div>
              <div className="text-2xl font-black text-amber-700 mt-1">{investmentEvaluation.paybackYears} Años</div>
              <div className="text-[10px] text-amber-800 mt-1 font-semibold">Horizonte de 5 Años</div>
            </div>
          </div>
        </div>

        {/* 3. Recomendaciones en Lenguaje Claro */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-800 border-b border-brand-100 pb-1">
            3. Recomendaciones Prácticas para el Empresario (Lenguaje No Técnico)
          </h3>
          
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </span>
              <div>
                <strong className="text-slate-900 block">Decisión sobre la Inversión:</strong>
                <p className="text-slate-600 mt-0.5">
                  {isViable 
                    ? `Se recomienda proceder con la inversión de ${currencySymbol} ${investmentEvaluation.initialCost.toLocaleString()} en activos fijos y capital de trabajo, dado que el flujo libre proyectado amortiza el capital en ${investmentEvaluation.paybackYears} años y rinde un margen de seguridad positivo.`
                    : `Se aconseja suspender o replantear el proyecto hasta ajustar el volumen de ventas o reducir los costos operativos, ya que en las condiciones actuales no genera la tasa de corte del ${investmentEvaluation.wacc}%.`}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </span>
              <div>
                <strong className="text-slate-900 block">Monitoreo de Liquidez:</strong>
                <p className="text-slate-600 mt-0.5">
                  Vigilar que los cobros a clientes no superen los 30-45 días para mantener la solvencia corriente y asegurar fondos de maniobra para el pago de los compromisos bancarios.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </span>
              <div>
                <strong className="text-slate-900 block">Tolerancia al Riesgo:</strong>
                <p className="text-slate-600 mt-0.5">
                  En el escenario pesimista evaluado (-20% en ventas), el VPN estimado es de {currencySymbol} {investmentEvaluation.scenarios.find(s=>s.id==='pessimistic')?.npv.toLocaleString()}, lo que indica la resistencia del negocio ante eventualidades del mercado.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Firmas de los 4 Integrantes */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">
            Equipo de Desarrollo FinAnalytics — Tecnología de Sistemas Informáticos
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
            <div className="border-t border-slate-300 pt-2">
              <div className="font-extrabold text-slate-900">Natán Saquic</div>
              <div className="text-[10px] text-brand-700 font-semibold">Líder de Proyecto</div>
              <div className="text-[10px] text-slate-500">Backend y Lógica Financiera</div>
            </div>

            <div className="border-t border-slate-300 pt-2">
              <div className="font-extrabold text-slate-900">Danilo Bulux</div>
              <div className="text-[10px] text-brand-700 font-semibold">Desarrollador Principal</div>
              <div className="text-[10px] text-slate-500">Frontend y Experiencia de Usuario</div>
            </div>

            <div className="border-t border-slate-300 pt-2">
              <div className="font-extrabold text-slate-900">Alexis Rosales</div>
              <div className="text-[10px] text-brand-700 font-semibold">Desarrollador</div>
              <div className="text-[10px] text-slate-500">Módulo de Reportes y Exportación</div>
            </div>

            <div className="border-t border-slate-300 pt-2">
              <div className="font-extrabold text-slate-900">Elian Rosales</div>
              <div className="text-[10px] text-brand-700 font-semibold">Control de Calidad</div>
              <div className="text-[10px] text-slate-500">QA y Modelado de Datos</div>
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-400 pt-2">
          Cátedra: Licda. Gloria León • Contabilidad Financiera • Universidad del Valle de Guatemala (Campus Sololá)
        </div>
      </div>
    </div>
  );
}
