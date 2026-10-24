import React, { useState } from 'react';
import { 
  Droplet, 
  PieChart, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  BarChart2,
  ShieldAlert
} from 'lucide-react';

export default function RatiosDashboardView({ ratios, currencySymbol }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas las Razones (11)', icon: BarChart2 },
    { id: 'Liquidez', label: '1. Liquidez (3)', icon: Droplet },
    { id: 'Rentabilidad', label: '2. Rentabilidad (5)', icon: PieChart },
    { id: 'Endeudamiento', label: '3. Endeudamiento (3)', icon: Scale }
  ];

  const filteredRatios = selectedCategory === 'all'
    ? ratios
    : ratios.filter(r => r.category === selectedCategory);

  const optimalCount = ratios.filter(r => r.status === 'optimal').length;
  const warningCount = ratios.filter(r => r.status === 'warning').length;
  const dangerCount = ratios.filter(r => r.status === 'danger').length;

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Dashboard de Razones Financieras</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
              Cálculo Dinámico
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Indicadores automatizados de Liquidez, Rentabilidad y Endeudamiento con diagnóstico semáforo e interpretación en lenguaje claro para micro y pequeñas empresas.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {optimalCount} Óptimos
          </span>
          {warningCount > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              {warningCount} En Observación
            </span>
          )}
          {dangerCount > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              {dangerCount} Críticos
            </span>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ratios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRatios.map((ratio) => {
          const isOptimal = ratio.status === 'optimal';
          const isWarning = ratio.status === 'warning';

          return (
            <div 
              key={ratio.code}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition group"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {ratio.code}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                    isOptimal 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : isWarning
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-rose-100 text-rose-800 border-rose-200'
                  }`}>
                    {isOptimal ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                    ) : (
                      <ShieldAlert className="w-3 h-3 text-rose-600" />
                    )}
                    {ratio.statusLabel}
                  </span>
                </div>

                {/* Ratio Name & Big Value */}
                <h3 className="font-bold text-slate-900 text-sm">{ratio.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={`text-3xl font-black tracking-tight table-number ${
                    isOptimal ? 'text-slate-900' : isWarning ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {ratio.unit === 'Q' ? `${currencySymbol} ` : ''}{ratio.value}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{ratio.unit !== 'Q' ? ratio.unit : ''}</span>
                </div>

                {/* Benchmark */}
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-600">Criterio estándar:</span>
                  <span className="font-mono text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{ratio.benchmark}</span>
                </div>

                {/* Formula Box */}
                <div className="mt-3 p-2 rounded-lg bg-slate-50 border border-slate-100 font-mono text-[10px] text-slate-600">
                  <span className="text-slate-400 select-none">Fórmula: </span>
                  <strong className="text-slate-800">{ratio.formula}</strong>
                </div>

                {/* Natural Language Interpretation */}
                <div className={`mt-3 p-3 rounded-xl border text-xs leading-snug ${
                  isOptimal
                    ? 'bg-emerald-50/60 border-emerald-100 text-emerald-950'
                    : isWarning
                    ? 'bg-amber-50/60 border-amber-100 text-amber-950'
                    : 'bg-rose-50/60 border-rose-100 text-rose-950'
                }`}>
                  <div className={`font-bold text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1 ${
                    isOptimal ? 'text-emerald-800' : isWarning ? 'text-amber-800' : 'text-rose-800'
                  }`}>
                    <Info className="w-3 h-3" />
                    Interpretación para la empresa:
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {ratio.interpretation}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>Categoría: {ratio.category}</span>
                <span className="text-brand-600 font-semibold font-mono">FinAnalytics</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
