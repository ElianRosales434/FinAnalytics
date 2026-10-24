import React, { useState } from 'react';
import { 
  Kanban, 
  CheckCircle2, 
  Clock, 
  Users, 
  Calendar, 
  Layers, 
  CheckSquare, 
  Flame, 
  FileCheck2, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function ScrumBacklogView({ data }) {
  const [selectedSprintFilter, setSelectedSprintFilter] = useState('all');
  const [selectedOwnerFilter, setSelectedOwnerFilter] = useState('all');
  const [showDoDModal, setShowDoDModal] = useState(false);

  const { productBacklog, sprints, projectInfo } = data;

  const totalPoints = productBacklog.reduce((acc, curr) => acc + curr.points, 0);
  const completedStories = productBacklog.filter(s => s.done);
  const completedPoints = completedStories.reduce((acc, curr) => acc + curr.points, 0);

  const filteredStories = productBacklog.filter((story) => {
    const matchSprint = selectedSprintFilter === 'all' || story.sprint === selectedSprintFilter;
    const matchOwner = selectedOwnerFilter === 'all' || story.owner.includes(selectedOwnerFilter);
    return matchSprint && matchOwner;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Gestión Ágil: Product Backlog & Tablero Scrum</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-semibold border border-brand-200">
              Marco Scrum
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Seguimiento de las 18 Historias de Usuario (91 Story Points) planificadas en 6 Sprints bajo la técnica MoSCoW. Desarrollado por el equipo de Tecnología de Sistemas Informáticos (UVG Sololá).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDoDModal(!showDoDModal)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ver DoR y DoD (Calidad)</span>
          </button>
        </div>
      </div>

      {/* Scrum Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Marco de Trabajo</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">SCRUM</div>
          <div className="mt-1 text-xs text-slate-500">6 Sprints consecutivos</div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            22 ago – 7 nov 2026
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Historias de Usuario</span>
            <CheckSquare className="w-4 h-4 text-brand-600" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">18 Historias</div>
          <div className="mt-1 text-xs text-slate-500">Técnica MoSCoW (Must / Should)</div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold">
            100% Historias Must cubiertas
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Puntos de Historia</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-xl font-black text-purple-700">91 Puntos</div>
          <div className="mt-1 text-xs text-slate-500">Escala de Fibonacci (1 a 13)</div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            Sprint con mayor carga: Sp 4 (21 pts)
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Entrega Final</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-black text-emerald-700">7 Nov 2026</div>
          <div className="mt-1 text-xs text-slate-500">Cierre del Sprint 5</div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            Exposición final y entrega
          </div>
        </div>
      </div>

      {/* DoR & DoD Explanation Box (Expandable) */}
      {showDoDModal && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Criterios de Calidad: Definición de Listo (DoR) y Definición de Terminado (DoD)
            </h3>
            <button
              onClick={() => setShowDoDModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar panel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2 text-brand-300">
                1. Definición de Listo (Definition of Ready - DoR)
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Redactada en formato estándar: "Como [usuario], quiero [funcionalidad], para [beneficio]".</li>
                <li>Cuenta con criterios de aceptación claros y verificables.</li>
                <li>Ha sido estimada por el equipo en story points (escala de Fibonacci).</li>
                <li>No depende de otra historia de usuario que no haya sido completada.</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-2 text-emerald-300">
                2. Definición de Terminado (Definition of Done - DoD)
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Código desarrollado, integrado al repositorio principal y revisado por pares.</li>
                <li><strong>Cálculos verificados manualmente por el área de QA (Elian Rosales)</strong> contra la hoja de datos financieros simulados.</li>
                <li>Funcionalidad probada en navegador sin errores para los casos definidos.</li>
                <li>Historia demostrada y aceptada por el Product Owner (Natán Saquic) en la Sprint Review.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sprint Roadmap Timeline Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-600" />
          Cronograma de Sprints (22 de agosto al 7 de noviembre de 2026)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sprints.map((sp) => (
            <div 
              key={sp.number}
              onClick={() => setSelectedSprintFilter(selectedSprintFilter === `Sprint ${sp.number}` ? 'all' : `Sprint ${sp.number}`)}
              className={`p-3 rounded-xl border transition cursor-pointer ${
                selectedSprintFilter === `Sprint ${sp.number}`
                  ? 'bg-brand-50 border-brand-400 ring-2 ring-brand-500/20'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold text-slate-900">Sprint {sp.number}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                  sp.number <= 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {sp.number <= 1 ? 'Listo' : 'Plan'}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{sp.dates}</div>
              <div className="text-[11px] font-semibold text-slate-800 mt-1.5 leading-snug line-clamp-2">
                {sp.goal}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] text-brand-700 font-mono">
                {sp.userStories.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-700">Filtrar Historias:</span>
          
          <select
            value={selectedSprintFilter}
            onChange={(e) => setSelectedSprintFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white"
          >
            <option value="all">Todos los Sprints (Sprint 0 - 5)</option>
            <option value="Sprint 0">Sprint 0 (Fundamentos)</option>
            <option value="Sprint 1">Sprint 1 (Ingreso y validación)</option>
            <option value="Sprint 2">Sprint 2 (Estados Financieros)</option>
            <option value="Sprint 3">Sprint 3 (Razones Financieras)</option>
            <option value="Sprint 4">Sprint 4 (Evaluación Inversión)</option>
            <option value="Sprint 5">Sprint 5 (Reportes y Cierre)</option>
          </select>

          <select
            value={selectedOwnerFilter}
            onChange={(e) => setSelectedOwnerFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white"
          >
            <option value="all">Todos los Integrantes</option>
            <option value="Natán">Natán Saquic (PO / Backend)</option>
            <option value="Danilo">Danilo Bulux (SM / Frontend)</option>
            <option value="Alexis">Alexis Rosales (Dev / Reportes)</option>
            <option value="Elian">Elian Rosales (Dev / QA y Datos)</option>
          </select>
        </div>

        <div className="text-xs text-slate-500">
          Mostrando <strong>{filteredStories.length}</strong> de 18 historias ({filteredStories.reduce((a,c)=>a+c.points,0)} pts)
        </div>
      </div>

      {/* Product Backlog Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                <th className="py-3 px-4 w-16 text-center">ID</th>
                <th className="py-3 px-4">Historia de Usuario (Formato Estándar Scrum)</th>
                <th className="py-3 px-4 text-center w-24">Prioridad</th>
                <th className="py-3 px-4 text-center w-24">Puntos</th>
                <th className="py-3 px-4 text-center w-24">Sprint</th>
                <th className="py-3 px-4 w-40">Responsable</th>
                <th className="py-3 px-4 text-center w-28">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStories.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-700 bg-slate-50/50">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 text-slate-800 text-xs font-medium leading-snug">
                    {item.story}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.priority === 'Must' 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-purple-700 font-mono">
                    {item.points} pts
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-700 text-[11px]">
                    {item.sprint}
                  </td>
                  <td className="py-3 px-4 text-slate-700 text-xs font-semibold">
                    {item.owner}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Terminada
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
