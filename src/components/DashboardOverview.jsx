import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Percent, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function DashboardOverview({ 
  inputs, 
  incomeStatement, 
  investmentEvaluation, 
  ratios, 
  currencySymbol, 
  onNavigate 
}) {
  const isViable = investmentEvaluation.npv > 0 && investmentEvaluation.irr > investmentEvaluation.wacc;

  // Encontrar las ratios principales
  const currentRatio = ratios.find(r => r.code === 'LIQ-01') || { value: '1.85', statusLabel: 'Adecuado' };
  const netMarginRatio = ratios.find(r => r.code === 'RENT-03') || { value: '12.4%', statusLabel: 'Adecuado' };
  const debtRatio = ratios.find(r => r.code === 'END-01') || { value: '38.5%', statusLabel: 'Adecuado' };

  // Datos para las barras de evolución de los 5 años
  const maxSales = Math.max(...incomeStatement.sales, 1);
  const yearsProgress = incomeStatement.sales.map((s, idx) => ({
    year: `Año ${idx + 1}`,
    sales: Math.round(s),
    net: Math.round(incomeStatement.netIncome[idx] || 0),
    salesPct: (s / maxSales) * 100,
    netPct: Math.max(5, ((incomeStatement.netIncome[idx] || 0) / maxSales) * 100)
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* Active System Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-brand-700/50">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sistema Financiero Integral en Tiempo Real (UVG Sololá)</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
            Diagnóstico Financiero: {inputs.companyName}
          </h1>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Plataforma activa para el análisis contable y evaluación de proyectos. Cada cifra ingresada en el sistema actualiza de inmediato el Estado de Resultados, Flujo de Caja, 11 Razones y Criterios de Inversión (VPN / TIR).
          </p>
          
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('inputs')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <span>Editar Parámetros de la Empresa</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition border border-white/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ver Dictamen y Reporte Completo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 Hero KPIs (Calculados en vivo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Inversión Inicial */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inversión Inicial (I₀)</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight table-number">
              {currencySymbol} {investmentEvaluation.initialCost.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span>WACC / Tasa de corte:</span>
              <span className="font-semibold text-slate-700">{investmentEvaluation.wacc}%</span>
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Horizonte: 5 años</span>
            <span className="font-medium text-brand-600">Activo Fijo + KT</span>
          </div>
        </div>

        {/* KPI 2: VPN */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Valor Presente Neto (VPN)</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              investmentEvaluation.npv > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-extrabold tracking-tight table-number ${
              investmentEvaluation.npv > 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {investmentEvaluation.npv > 0 ? `+${currencySymbol} ` : `-${currencySymbol} `}{Math.abs(investmentEvaluation.npv).toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${investmentEvaluation.npv > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span className={`text-xs font-bold ${investmentEvaluation.npv > 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {investmentEvaluation.npv > 0 ? 'VPN > 0 • Genera Valor' : 'VPN < 0 • Destruye Valor'}
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Criterio de decisión</span>
            <span className={`font-bold ${isViable ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isViable ? 'Recomendado' : 'Rechazar'}
            </span>
          </div>
        </div>

        {/* KPI 3: TIR */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tasa Interna Retorno (TIR)</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
              investmentEvaluation.irr > investmentEvaluation.wacc ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-600'
            }`}>
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-extrabold tracking-tight table-number ${
              investmentEvaluation.irr > investmentEvaluation.wacc ? 'text-purple-700' : 'text-rose-600'
            }`}>
              {investmentEvaluation.irr}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {investmentEvaluation.irr > investmentEvaluation.wacc 
                ? `Supera la tasa mínima del ${investmentEvaluation.wacc}%` 
                : `Por debajo del costo de corte (${investmentEvaluation.wacc}%)`}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Rendimiento anual</span>
            <span className="font-semibold text-purple-700 font-mono">Newton-Raphson</span>
          </div>
        </div>

        {/* KPI 4: Período de Recuperación (Payback) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recuperación (Payback)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight table-number">
              {investmentEvaluation.paybackYears} Años
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Recuperación estimada en el <span className="font-semibold text-slate-800">Año {Math.ceil(investmentEvaluation.paybackYears)}</span>
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Plazo proyectado: 5 años</span>
            <span className="font-semibold text-amber-600">Horizonte Válido</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Proyección Financiera Gráfica (5 años) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Evolución Calculada de Ventas y Utilidad Neta</h3>
              <p className="text-xs text-slate-500">Valores proyectados en tiempo real para el horizonte de 5 períodos</p>
            </div>
            <button
              onClick={() => onNavigate('statements')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Tabla Completa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Bar Representation */}
          <div className="space-y-4 pt-2">
            {yearsProgress.map((item, index) => (
              <div key={index} className="space-y-1.5 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.year}</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-600">
                      Ventas: <strong className="text-slate-900">{currencySymbol} {item.sales.toLocaleString()}</strong>
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      Utilidad Neta: <strong>{currencySymbol} {item.net.toLocaleString()}</strong>
                    </span>
                  </div>
                </div>
                {/* Progress bars */}
                <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-brand-500 h-full rounded-l-full transition-all duration-300" 
                    style={{ width: `${item.salesPct}%` }}
                  />
                  <div 
                    className="bg-emerald-500 h-full -ml-2 rounded-r-full transition-all duration-300" 
                    style={{ width: `${item.netPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-500 inline-block"></span>
                Ventas Netas Totales
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
                Utilidad Neta del Ejercicio
              </span>
            </div>
            <span className="text-slate-500 font-mono">Actualizado automáticamente</span>
          </div>
        </div>

        {/* Right 1 Col: 3 Pilares Financieros (Semáforo Dinámico) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Semáforo de Salud Financiera</h3>
                <p className="text-xs text-slate-500">Diagnóstico dinámico de los 3 pilares</p>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="space-y-3.5">
              {/* Pilar 1: Liquidez */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      currentRatio.status === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                    <span className="font-bold text-xs text-slate-900">1. Liquidez Inmediata</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">{currentRatio.value} veces</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Razón corriente: {currentRatio.statusLabel}. Capacidad para responder a obligaciones a corto plazo.
                </p>
              </div>

              {/* Pilar 2: Rentabilidad */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      netMarginRatio.status === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                    <span className="font-bold text-xs text-slate-900">2. Rentabilidad Operativa</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">{netMarginRatio.value} Margen</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Margen neto del ejercicio: {netMarginRatio.statusLabel}. Retorno de utilidades sobre ventas.
                </p>
              </div>

              {/* Pilar 3: Endeudamiento */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      debtRatio.status === 'optimal' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}></span>
                    <span className="font-bold text-xs text-slate-900">3. Solvencia & Deuda</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">{debtRatio.value} Deuda</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Nivel de endeudamiento total: {debtRatio.statusLabel}. Proporción financiada con acreedores.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('ratios')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver las 11 Razones Financieras Detalladas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
