import React from 'react';
import { 
  X, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  BookOpen,
  Award,
  FileText
} from 'lucide-react';

export default function TeamModal({ isOpen, onClose, projectInfo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-brand-900 to-slate-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-600/30 border border-brand-400/40 flex items-center justify-center text-brand-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-brand-300">
                {projectInfo.university} • {projectInfo.campus}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Ficha Técnica: Equipo {projectInfo.teamName}
              </h2>
              <div className="text-xs text-slate-300 mt-0.5">
                Carrera: {projectInfo.program} • Cátedra: {projectInfo.professor}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Institutional Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Institución</span>
              <span className="font-bold text-slate-900 text-xs">{projectInfo.university}</span>
              <span className="text-[11px] text-slate-500 block">{projectInfo.campus}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cátedra</span>
              <span className="font-bold text-brand-700 text-xs">{projectInfo.course}</span>
              <span className="text-[11px] text-slate-500 block">Docente: {projectInfo.professor}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Fecha de Entrega</span>
              <span className="font-extrabold text-emerald-700 text-xs">{projectInfo.deliveryDate}</span>
              <span className="text-[11px] text-slate-500 block">Sololá, Guatemala</span>
            </div>
          </div>

          {/* Integrantes del Equipo */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-brand-600" />
                Integrantes del Equipo y Áreas Técnicas
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">4 Integrantes</span>
            </div>

            <div className="space-y-3">
              {projectInfo.members.map((member, index) => (
                <div key={index} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-brand-300 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div>
                      <span className="text-sm font-extrabold text-slate-900">{member.name}</span>
                      <span className="text-xs text-brand-700 font-semibold ml-2">
                        {member.technicalArea}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 text-[11px] leading-relaxed text-slate-600">
                    <strong className="text-slate-800 block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                      Responsabilidad Técnica:
                    </strong>
                    {member.technicalDuty}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External Sprints Reference Note */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600 shrink-0" />
              <span>
                El cronograma de sprints y el Product Backlog se encuentran documentados en el archivo formal: <strong>CRONOGRAMA_SPRINTS_SCRUM.md</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-[10px] text-slate-500">
            Universidad del Valle de Guatemala • Campus Sololá • Contabilidad Financiera
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
}
