import React, { useState } from 'react';
import { 
  BadgeDollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Percent,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export default function InvestmentEvaluationView({ 
  investmentEvaluation, 
  currencySymbol 
}) {
  const [selectedScenario, setSelectedScenario] = useState('base');

  const { wacc, initialCost, npv, irr, paybackYears, discountedPaybackYears, scenarios } = investmentEvaluation;

  const isViable = npv > 0 && irr > wacc;
  const activeScenarioData = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Módulo de Evaluación de Inversión</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              Cálculo Matemático Real
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Cálculo matemático de Valor Presente Neto (VPN), Tasa Interna de Retorno (TIR) mediante algoritmo Newton-Raphson, y Período de Recuperación (Payback) con análisis comparativo de escenarios.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" />
            Tasa de Descuento (WACC): {wacc}%
          </span>
        </div>
      </div>

      {/* Decision Banner (Calculated conditionally) */}
      <div className={`text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isViable ? 'bg-emerald-900' : 'bg-rose-950'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${
            isViable 
              ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' 
              : 'bg-rose-500/20 border-rose-400/30 text-rose-300'
          }`}>
            {isViable ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            ) : (
              <ShieldAlert className="w-7 h-7 text-rose-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${isViable ? 'text-emerald-300' : 'text-rose-300'}`}>
                Dictamen Técnico Financiero
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
                isViable ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
              }`}>
                {isViable ? 'Inversión Recomendada' : 'Proyecto No Viable'}
              </span>
            </div>
            <h3 className="text-xl font-extrabold mt-1 text-white">
              {isViable ? 'Proyecto de Inversión Rentable' : 'Riesgo de Destrucción de Valor'}
            </h3>
            <p className={`text-xs mt-1 max-w-2xl leading-relaxed ${isViable ? 'text-emerald-100/90' : 'text-rose-100/90'}`}>
              {isViable 
                ? `El Valor Presente Neto es favorable (+${currencySymbol} ${npv.toLocaleString()}) y la TIR (${irr}%) supera el costo de capital exigido del ${wacc}%. El proyecto genera riqueza neta para los propietarios.`
                : `El proyecto no cumple con los criterios mínimos de rentabilidad: el VPN es negativo o la TIR (${irr}%) no cubre el costo de corte (${wacc}%). Se recomienda revisar costos o renegociar la inversión.`}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-white/80">Recuperación de Capital</div>
            <div className="text-lg font-black text-white">{paybackYears} Años</div>
          </div>
        </div>
      </div>

      {/* Hero 3 Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1: VPN */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Valor Presente Neto (VPN / VAN)</span>
            <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
              npv > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              <BadgeDollarSign className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-3xl font-black tracking-tight table-number ${
              npv > 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {npv > 0 ? `+${currencySymbol} ` : `-${currencySymbol} `}{Math.abs(npv).toLocaleString()}
            </div>
            <div className="mt-2 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
              VPN = ∑ [ F_t / (1 + r)^t ] - I_0
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-snug">
            <strong>Regla de Decisión:</strong> {npv > 0 
              ? "VPN > 0: El proyecto recupera la inversión inicial, remunera el costo de oportunidad y genera beneficio adicional." 
              : "VPN < 0: El proyecto no logra recuperar el valor descontado de los fondos invertidos."}
          </div>
        </div>

        {/* Metric 2: TIR */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tasa Interna de Retorno (TIR)</span>
            <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
              irr > wacc ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-600'
            }`}>
              <TrendingUp className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-3xl font-black tracking-tight table-number ${
              irr > wacc ? 'text-purple-700' : 'text-rose-600'
            }`}>
              {irr}%
            </div>
            <div className="mt-2 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
              TIR tal que: VPN(TIR) = 0
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-snug">
            <strong>Regla de Decisión:</strong> {irr > wacc 
              ? `TIR (${irr}%) > WACC (${wacc}%). El rendimiento porcentual anual supera la tasa exigida por los inversionistas.` 
              : `TIR (${irr}%) < WACC (${wacc}%). El rendimiento no compensa el costo de capital exigido.`}
          </div>
        </div>

        {/* Metric 3: Payback */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Período de Recuperación (Payback)</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-900 tracking-tight table-number">
              {paybackYears} Años
            </div>
            <div className="mt-2 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
              Payback Descontado: {discountedPaybackYears} Años
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-snug">
            <strong>Regla de Decisión:</strong> La inversión de {currencySymbol} {initialCost.toLocaleString()} se recupera en el año {Math.ceil(paybackYears)}, dentro del horizonte de 5 años.
          </div>
        </div>
      </div>

      {/* Comparative Scenarios (Módulo 9.4) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-600" />
              Comparación Dinámica de Escenarios de Inversión
            </h3>
            <p className="text-xs text-slate-500">Análisis de sensibilidad recalculado en vivo ante fluctuaciones de ventas</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedScenario === sc.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sc.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Scenarios Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                <th className="py-3 px-4">Escenario</th>
                <th className="py-3 px-4">Premisa Comercial</th>
                <th className="py-3 px-4 text-right">VPN Calculado</th>
                <th className="py-3 px-4 text-right">TIR</th>
                <th className="py-3 px-4 text-center">Recuperación</th>
                <th className="py-3 px-4 text-center">Nivel de Riesgo</th>
                <th className="py-3 px-4 text-center">Decisión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scenarios.map((sc) => {
                const isSelected = selectedScenario === sc.id;
                return (
                  <tr 
                    key={sc.id}
                    onClick={() => setSelectedScenario(sc.id)}
                    className={`cursor-pointer transition ${
                      isSelected ? 'bg-brand-50/60 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        sc.id === 'optimistic' ? 'bg-emerald-500' : sc.id === 'base' ? 'bg-brand-500' : 'bg-amber-500'
                      }`} />
                      {sc.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">{sc.description}</td>
                    <td className={`py-3.5 px-4 text-right font-extrabold table-number ${
                      sc.npv > 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {sc.npv > 0 ? `+${currencySymbol} ` : `-${currencySymbol} `}{Math.abs(sc.npv).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-purple-700 table-number">{sc.irr}%</td>
                    <td className="py-3.5 px-4 text-center text-slate-700 font-medium">{sc.payback}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sc.risk.includes('Bajo') ? 'bg-emerald-100 text-emerald-800' : sc.risk.includes('Moderado') ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sc.risk}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        sc.viable ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200'
                      }`}>
                        {sc.viable ? 'Viable' : 'No Recomendado'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Scenario Spotlight */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Escenario en foco:</span>
            <span className="font-semibold text-brand-700">{activeScenarioData.name}</span>
            <span className="text-slate-400">—</span>
            <span className="text-slate-600">{activeScenarioData.description}</span>
          </div>

          <span className="text-[11px] text-slate-500 font-mono">Recalculado con Newton-Raphson</span>
        </div>
      </div>
    </div>
  );
}
