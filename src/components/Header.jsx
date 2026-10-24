import React from 'react';
import { 
  Building2, 
  Coins, 
  CheckCircle2, 
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  companyData, 
  currency, 
  setCurrency,
  onOpenTeamModal,
  activeTabTitle,
  viewMode,
  setViewMode
}) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-6 sm:px-8 py-3.5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Path */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 uppercase tracking-wider">
            <span>FinAnalytics UVG Sololá</span>
            <span>/</span>
            <span>Contabilidad Financiera</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            {viewMode === 'full' ? 'Vista Panorámica del Sistema Completo' : activeTabTitle}
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Plataforma Funcional
            </span>
          </h2>
        </div>

        {/* Action Controls & Company Info */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle: Tabbed vs Full Continuous Page */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('tabs')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'tabs'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Por Módulos
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'full'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Página Completa</span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 text-[11px] px-2 font-medium flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              Moneda:
            </span>
            <button
              onClick={() => setCurrency('GTQ')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currency === 'GTQ'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Q (GTQ)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              $ (USD)
            </button>
          </div>

          {/* Active Company Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <Building2 className="w-3.5 h-3.5 text-brand-700 shrink-0" />
            <div className="leading-tight">
              <span className="font-semibold text-slate-800 block text-xs">{companyData.companyName}</span>
              <span className="text-[10px] text-slate-500">{companyData.sector} • {companyData.location}</span>
            </div>
          </div>

          {/* Team / Info Button */}
          <button
            onClick={onOpenTeamModal}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Ficha del Proyecto</span>
          </button>
        </div>
      </div>
    </header>
  );
}
