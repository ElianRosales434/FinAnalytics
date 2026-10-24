import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  BookOpen, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Info,
  DollarSign
} from 'lucide-react';

export default function FinancialStatementsView({ 
  incomeStatement, 
  cashFlow, 
  currencySymbol 
}) {
  const [activeStatement, setActiveStatement] = useState('income'); // 'income' or 'cashflow'
  const [showFormulas, setShowFormulas] = useState(true);

  const currentData = activeStatement === 'income' ? incomeStatement : cashFlow;

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Módulo de Estados Financieros Proyectados</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              Cálculo Automático
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Generación automática del Estado de Resultados y del Flujo de Caja Libre. Construido a partir de los datos ingresados en el Módulo 9.1, con fórmulas visibles para transparencia didáctica.
          </p>
        </div>

        {/* Toggle Didáctico */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
              showFormulas
                ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {showFormulas ? <Eye className="w-4 h-4 text-amber-600" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
            <span>Fórmulas Didácticas: {showFormulas ? 'Visibles' : 'Ocultas'}</span>
          </button>
        </div>
      </div>

      {/* Selector de Estado Financiero */}
      <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveStatement('income')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeStatement === 'income'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>1. Estado de Resultados (5 Años)</span>
          </button>
          <button
            onClick={() => setActiveStatement('cashflow')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeStatement === 'cashflow'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>2. Flujo de Caja Libre Proyectado (Año 0 a 5)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pr-3 text-xs text-slate-500 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Valores en {currencySymbol}</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              {activeStatement === 'income' 
                ? 'Estado de Resultados Proyectado Multianual' 
                : 'Estado de Flujo de Caja Libre Proyectado'}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">
              (Periodicidad Anual)
            </span>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {activeStatement === 'income' ? 'Criterio: Devengado Contable' : 'Criterio: Efectivo Real'}
          </div>
        </div>

        {/* Financial Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                <th className="py-3 px-4 font-extrabold w-1/3">Concepto / Cuenta Contable</th>
                {showFormulas && (
                  <th className="py-3 px-4 font-semibold text-amber-800 bg-amber-50/70 w-1/4 border-l border-r border-amber-200/50">
                    Fórmula / Lógica Aplicada
                  </th>
                )}
                {currentData.years.map((yr, idx) => (
                  <th key={idx} className="py-3 px-4 text-right font-extrabold text-slate-800">
                    {yr}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.rows.map((row) => {
                const isHighlight = row.isTotal;
                const isSub = row.isSubtotal;
                
                return (
                  <tr 
                    key={row.id}
                    className={`transition-colors hover:bg-slate-50 ${
                      isHighlight ? 'bg-emerald-50/70 font-extrabold text-emerald-950 border-t-2 border-b-2 border-emerald-300' : ''
                    } ${isSub ? 'bg-slate-50/80 font-bold text-slate-900 border-t border-b border-slate-200' : 'text-slate-700'}`}
                  >
                    <td className="py-2.5 px-4">
                      <span>{row.label}</span>
                    </td>

                    {showFormulas && (
                      <td className="py-2 px-4 bg-amber-50/40 text-[11px] font-mono text-amber-900 border-l border-r border-amber-200/40">
                        {row.formula}
                      </td>
                    )}

                    {row.values.map((val, idx) => {
                      const roundedVal = Math.round(val);
                      const isNegative = roundedVal < 0;
                      return (
                        <td 
                          key={idx} 
                          className={`py-2.5 px-4 text-right table-number font-medium ${
                            isHighlight ? 'font-black text-emerald-800 text-sm' : ''
                          } ${isNegative ? 'text-rose-600' : ''}`}
                        >
                          {val === 0 && row.id === "flujoInversion" && idx > 0 ? (
                            <span className="text-slate-400">-</span>
                          ) : (
                            `${isNegative ? '-' : ''}${currencySymbol} ${Math.abs(roundedVal).toLocaleString()}`
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Explanation */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-600 shrink-0" />
            <span>
              {activeStatement === 'income'
                ? 'El Estado de Resultados deduce el 25% de ISR sobre las utilidades antes de impuestos según la normativa tributaria guatemalteca.'
                : 'El Flujo de Caja Libre proyecta la capacidad del negocio para recuperar la inversión inicial y remunerar el capital.'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-slate-400 font-mono">FinAnalytics • UVG Sololá</span>
          </div>
        </div>
      </div>

      {/* Pedagogical Insights Box */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 text-amber-900">
        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          Nota Didáctica para la Cátedra de Contabilidad Financiera
        </h4>
        <p className="text-xs leading-relaxed text-amber-900/90">
          La <strong>Utilidad Neta</strong> y el <strong>Flujo de Caja Libre</strong> difieren sustancialmente: el flujo de caja ajusta las partidas no desembolsables (como las depreciaciones anuales que se suman de nuevo) y descuenta la inversión en capital de trabajo. Esta distinción es la base para el cálculo matemático del VPN y la TIR.
        </p>
      </div>
    </div>
  );
}
