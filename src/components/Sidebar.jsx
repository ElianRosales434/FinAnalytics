import React from 'react';
import { 
  LayoutDashboard, 
  FileInput, 
  FileSpreadsheet, 
  TrendingUp, 
  BadgeDollarSign, 
  FileText, 
  Users, 
  ChevronRight,
  Kanban,
  Eye,
  Layers
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenTeamModal, viewMode, setViewMode }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Resumen Ejecutivo',
      subtitle: 'KPIs y diagnóstico en vivo',
      icon: LayoutDashboard,
      badge: 'En vivo'
    },
    {
      id: 'inputs',
      label: '1. Ingreso de Datos',
      subtitle: 'Parámetros e inversión',
      icon: FileInput,
      badge: 'Interactivo'
    },
    {
      id: 'statements',
      label: '2. Estados Financieros',
      subtitle: 'Resultados y Flujo de caja',
      icon: FileSpreadsheet,
      badge: 'Fórmulas'
    },
    {
      id: 'ratios',
      label: '3. Razones Financieras',
      subtitle: '11 indicadores semáforo',
      icon: TrendingUp,
      badge: '11 Ratios'
    },
    {
      id: 'evaluation',
      label: '4. Evaluación Inversión',
      subtitle: 'VPN, TIR y Escenarios',
      icon: BadgeDollarSign,
      badge: 'Decisión'
    },
    {
      id: 'reports',
      label: '5. Módulo de Reportes',
      subtitle: 'Dictamen, PDF y Excel',
      icon: FileText,
      badge: 'Exportar'
    }
  ];

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col h-screen sticky top-0 shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold tracking-tight text-white font-sans">FinAnalytics</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Plataforma Web de Análisis Financiero</p>
          </div>
        </div>

        {/* Academic Tag */}
        <div className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            UVG Sololá
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Contabilidad Fin.</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="flex items-center justify-between px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>Módulos de la Plataforma</span>
          <span className="text-[10px] text-emerald-400 font-mono">Activo</span>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = viewMode === 'tabs' && activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setViewMode('tabs');
                setActiveTab(item.id);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 group cursor-pointer ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 font-medium'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <div>
                  <div className="text-xs leading-tight font-semibold">{item.label}</div>
                  <div className={`text-[10px] leading-tight mt-0.5 ${isActive ? 'text-brand-100' : 'text-slate-400'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'}`} />
              </div>
            </button>
          );
        })}

        {/* View All Button */}
        <div className="pt-2">
          <button
            onClick={() => setViewMode(viewMode === 'full' ? 'tabs' : 'full')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition border cursor-pointer ${
              viewMode === 'full'
                ? 'bg-brand-500/20 text-brand-200 border-brand-500/40 font-bold'
                : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-brand-400" />
              <div>
                <div className="text-xs font-semibold">Ver Todo en Una Página</div>
                <div className="text-[10px] text-slate-400">Desplazamiento continuo</div>
              </div>
            </div>
            <Eye className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Footer Team / Project info button */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/60">
        <button
          onClick={onOpenTeamModal}
          className="w-full p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-left border border-slate-700/60 transition flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:text-brand-300">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Equipo FinAnalytics (4)</div>
              <div className="text-[10px] text-slate-400">Natán, Danilo, Alexis, Elian</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
        </button>

        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span>Entrega: 7 nov 2026</span>
          <span className="text-emerald-400 font-mono">100% Funcional</span>
        </div>
      </div>
    </aside>
  );
}
