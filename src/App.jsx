import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import DataInputView from './components/DataInputView';
import FinancialStatementsView from './components/FinancialStatementsView';
import RatiosDashboardView from './components/RatiosDashboardView';
import InvestmentEvaluationView from './components/InvestmentEvaluationView';
import ReportsView from './components/ReportsView';
import TeamModal from './components/TeamModal';

import { 
  defaultFinancialInputs, 
  sectorPresets, 
  projectInfo 
} from './data/mockFinancialData';

import { 
  calculateIncomeStatement, 
  calculateCashFlow, 
  calculateRatios, 
  calculateNPV, 
  calculateIRR, 
  calculatePayback,
  calculateDiscountedPayback,
  calculateScenarios,
  validateFinancialData 
} from './utils/financialEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('tabs'); // 'tabs' or 'full'
  const [currency, setCurrency] = useState('GTQ');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  
  // Estado central de entradas de la empresa
  const [inputs, setInputs] = useState(() => {
    try {
      const saved = localStorage.getItem('finanalytics_inputs');
      return saved ? JSON.parse(saved) : defaultFinancialInputs;
    } catch {
      return defaultFinancialInputs;
    }
  });

  const currencySymbol = currency === 'GTQ' ? 'Q' : '$';

  // Guardar en localStorage cuando se editan entradas
  const updateInputs = (updater) => {
    setInputs(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('finanalytics_inputs', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleSectorPreset = (sectorName) => {
    if (sectorPresets[sectorName]) {
      updateInputs(sectorPresets[sectorName]);
    }
  };

  const handleResetDefaults = () => {
    updateInputs(defaultFinancialInputs);
  };

  // --- MOTOR MATEMÁTICO FINANCIERO EN TIEMPO REAL ---
  const incomeStatement = useMemo(() => {
    return calculateIncomeStatement(inputs);
  }, [inputs]);

  const cashFlow = useMemo(() => {
    return calculateCashFlow(inputs, incomeStatement);
  }, [inputs, incomeStatement]);

  const ratios = useMemo(() => {
    return calculateRatios(inputs, incomeStatement);
  }, [inputs, incomeStatement]);

  const investmentEvaluation = useMemo(() => {
    const wacc = Number(inputs.wacc) || 12;
    const initialCost = cashFlow.initialInvestment;
    const flows = cashFlow.operationalCashFlows;

    const npv = calculateNPV(wacc, initialCost, flows);
    const irr = calculateIRR(initialCost, flows);
    const paybackYears = calculatePayback(initialCost, flows);
    const discountedPaybackYears = calculateDiscountedPayback(wacc, initialCost, flows);
    const scenarios = calculateScenarios(inputs);

    return {
      wacc,
      initialCost,
      npv,
      irr,
      paybackYears,
      discountedPaybackYears,
      scenarios
    };
  }, [inputs, cashFlow]);

  const validations = useMemo(() => {
    return validateFinancialData(inputs);
  }, [inputs]);

  const tabTitles = {
    dashboard: 'Resumen Ejecutivo y Métricas en Tiempo Real',
    inputs: 'Módulo de Ingreso de Datos Financieros (9.1)',
    statements: 'Módulo de Estados Financieros Proyectados (9.2)',
    ratios: 'Dashboard de Razones Financieras y Diagnóstico (9.3)',
    evaluation: 'Módulo de Evaluación de Inversión y Escenarios (9.4)',
    reports: 'Módulo de Reportes, Dictamen y Exportación (9.5)'
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenTeamModal={() => setIsTeamModalOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <Header 
          companyData={inputs}
          currency={currency}
          setCurrency={setCurrency}
          onOpenTeamModal={() => setIsTeamModalOpen(true)}
          activeTabTitle={tabTitles[activeTab]}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* View Body */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-12">
          {viewMode === 'tabs' ? (
            /* TABBED VIEW (Single section at a time) */
            <>
              {activeTab === 'dashboard' && (
                <DashboardOverview 
                  inputs={inputs}
                  incomeStatement={incomeStatement}
                  investmentEvaluation={investmentEvaluation}
                  ratios={ratios}
                  currencySymbol={currencySymbol} 
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'inputs' && (
                <DataInputView 
                  inputs={inputs}
                  setInputs={updateInputs}
                  currencySymbol={currencySymbol} 
                  onSectorPreset={handleSectorPreset}
                  onResetDefaults={handleResetDefaults}
                  validations={validations}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'statements' && (
                <FinancialStatementsView 
                  incomeStatement={incomeStatement}
                  cashFlow={cashFlow}
                  currencySymbol={currencySymbol} 
                />
              )}

              {activeTab === 'ratios' && (
                <RatiosDashboardView 
                  ratios={ratios} 
                  currencySymbol={currencySymbol} 
                />
              )}

              {activeTab === 'evaluation' && (
                <InvestmentEvaluationView 
                  investmentEvaluation={investmentEvaluation} 
                  currencySymbol={currencySymbol} 
                />
              )}

              {activeTab === 'reports' && (
                <ReportsView 
                  inputs={inputs}
                  incomeStatement={incomeStatement}
                  cashFlow={cashFlow}
                  ratios={ratios}
                  investmentEvaluation={investmentEvaluation}
                  currencySymbol={currencySymbol} 
                />
              )}
            </>
          ) : (
            /* FULL CONTINUOUS LAYOUT VIEW (All sections in sequence) */
            <div className="space-y-16">
              {/* Section 0: Overview */}
              <section id="section-dashboard" className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-900 text-white">
                    Sección 0
                  </span>
                  <h2 className="text-lg font-bold text-slate-800">Resumen Ejecutivo y Métricas en Tiempo Real</h2>
                </div>
                <DashboardOverview 
                  inputs={inputs}
                  incomeStatement={incomeStatement}
                  investmentEvaluation={investmentEvaluation}
                  ratios={ratios}
                  currencySymbol={currencySymbol} 
                  onNavigate={(tab) => { setViewMode('tabs'); setActiveTab(tab); }}
                />
              </section>

              {/* Section 1: Inputs */}
              <section id="section-inputs" className="space-y-4 pt-6 border-t-2 border-dashed border-slate-300">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-600 text-white">
                    Módulo 9.1
                  </span>
                  <h2 className="text-lg font-bold text-slate-800">Ingreso de Datos Financieros</h2>
                </div>
                <DataInputView 
                  inputs={inputs}
                  setInputs={updateInputs}
                  currencySymbol={currencySymbol} 
                  onSectorPreset={handleSectorPreset}
                  onResetDefaults={handleResetDefaults}
                  validations={validations}
                  onNavigate={(tab) => { setViewMode('tabs'); setActiveTab(tab); }}
                />
              </section>

              {/* Section 2: Statements */}
              <section id="section-statements" className="space-y-4 pt-6 border-t-2 border-dashed border-slate-300">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-600 text-white">
                    Módulo 9.2
                  </span>
                  <h2 className="text-lg font-bold text-slate-800">Estados Financieros Proyectados (Resultados y Flujo)</h2>
                </div>
                <FinancialStatementsView 
                  incomeStatement={incomeStatement}
                  cashFlow={cashFlow}
                  currencySymbol={currencySymbol} 
                />
              </section>

              {/* Section 3: Ratios */}
              <section id="section-ratios" className="space-y-4 pt-6 border-t-2 border-dashed border-slate-300">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-600 text-white">
                    Módulo 9.3
                  </span>
                  <h2 className="text-lg font-bold text-slate-800">Dashboard de Razones Financieras (11 Indicadores)</h2>
                </div>
                <RatiosDashboardView 
                  ratios={ratios} 
                  currencySymbol={currencySymbol} 
                />
              </section>

              {/* Section 4: Evaluation */}
              <section id="section-evaluation" className="space-y-4 pt-6 border-t-2 border-dashed border-slate-300">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-600 text-white">
                    Módulo 9.4
                  </span>
                  <h2 className="text-lg font-bold text-slate-800">Evaluación de Inversión (VPN, TIR y Comparación de Escenarios)</h2>
                </div>
                <InvestmentEvaluationView 
                  investmentEvaluation={investmentEvaluation} 
                  currencySymbol={currencySymbol} 
                />
              </section>

              {/* Section 5: Reports */}
              <section id="section-reports" className="space-y-4 pt-6 border-t-2 border-dashed border-slate-300">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-600 text-white">
                    Módulo 9.5
                  </span>
                  <h2 className="text-lg font-bold text-slate-800">Informe y Dictamen Ejecutivo Descargable</h2>
                </div>
                <ReportsView 
                  inputs={inputs}
                  incomeStatement={incomeStatement}
                  cashFlow={cashFlow}
                  ratios={ratios}
                  investmentEvaluation={investmentEvaluation}
                  currencySymbol={currencySymbol} 
                />
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Modal with Team and Course Information (UVG Sololá) */}
      <TeamModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
        projectInfo={projectInfo}
      />
    </div>
  );
}
