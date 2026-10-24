import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  Percent, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  TrendingUp,
  Coins,
  FileCheck,
  Briefcase,
  RotateCcw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function DataInputView({ 
  inputs, 
  setInputs, 
  currencySymbol, 
  onSectorPreset, 
  onResetDefaults,
  validations,
  onNavigate
}) {
  const [activeSubTab, setActiveSubTab] = useState('investment');
  const [salesMode, setSalesMode] = useState('assistant'); // 'assistant' or 'manual'
  const [unitPrice, setUnitPrice] = useState(106.67);
  const [monthlyUnitsY1, setMonthlyUnitsY1] = useState(250);
  const [growthRate, setGrowthRate] = useState(17);

  const totalInvestment = (Number(inputs.machinery) || 0) + (Number(inputs.furniture) || 0) + (Number(inputs.workingCapital) || 0);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAutoProjectSales = (customPrice = unitPrice, customUnits = monthlyUnitsY1, customGrowth = growthRate) => {
    const priceNum = Number(customPrice) || 0;
    const unitsNum = Number(customUnits) || 0;
    const growthNum = (Number(customGrowth) || 0) / 100;
    
    const y1 = Math.round(unitsNum * 12 * priceNum);
    const y2 = Math.round(y1 * (1 + growthNum));
    const y3 = Math.round(y2 * (1 + growthNum));
    const y4 = Math.round(y3 * (1 + growthNum));
    const y5 = Math.round(y4 * (1 + growthNum));

    setInputs(prev => ({
      ...prev,
      salesY1: y1,
      salesY2: y2,
      salesY3: y3,
      salesY4: y4,
      salesY5: y5
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Active System Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Módulo de Ingreso de Datos Financieros</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Recálculo en Vivo Activo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Edita los parámetros de la empresa en tiempo real. Todos los estados financieros, razones (11), VPN y TIR se actualizan automáticamente al cambiar cualquier valor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetDefaults}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Valores</span>
          </button>
        </div>
      </div>

      {/* Sector Preset Selector (Hoja de datos simulados por Elian Rosales) */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <Briefcase className="w-5 h-5 text-brand-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Cargar Caso de Prueba Rápido (Control de Calidad / Elian Rosales)</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Datos Validados</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Haz clic en cualquier sector para cargar parámetros reales de empresas guatemaltecas:
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['Manufactura', 'Comercio', 'Servicios'].map((sec) => (
            <button
              key={sec}
              onClick={() => onSectorPreset(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                inputs.sector === sec
                  ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Sections (Left) + Validation & Summary Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Container (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Sub-tabs for Form Sections */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto">
            {[
              { id: 'investment', label: '1. Perfil e Inversión' },
              { id: 'sales', label: '2. Proyección de Ventas' },
              { id: 'costs', label: '3. Costos y Gastos Operativos' },
              { id: 'financing', label: '4. Deuda y Financiamiento' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-4 py-3 text-xs font-bold transition whitespace-nowrap border-b-2 cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'border-brand-600 text-brand-700 bg-white shadow-sm'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            {/* TAB 1: General & Inversión Inicial */}
            {activeSubTab === 'investment' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-600" />
                    Perfil de la Empresa (Responsable: Danilo Bulux)
                  </h3>
                  <p className="text-xs text-slate-500">Datos generales del negocio evaluado</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nombre Comercial o Razón Social <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={inputs.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium"
                      placeholder="Ej. Mi Empresa, S.A."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Número de Identificación Tributaria (NIT) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={inputs.nit}
                      onChange={(e) => handleInputChange('nit', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium"
                      placeholder="Ej. 1234567-8"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ubicación / Municipio</label>
                    <input
                      type="text"
                      value={inputs.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium"
                      placeholder="Ej. Sololá, Guatemala"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sector Económico</label>
                    <select
                      value={inputs.sector}
                      onChange={(e) => handleInputChange('sector', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 font-medium bg-white"
                    >
                      <option value="Manufactura">Manufactura</option>
                      <option value="Comercio">Comercio</option>
                      <option value="Servicios">Servicios</option>
                    </select>
                  </div>
                </div>

                <div className="border-b border-slate-100 pb-3 pt-4">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand-600" />
                    Composición de la Inversión Inicial (Año 0)
                  </h3>
                  <p className="text-xs text-slate-500">Monto total y distribución de activos para la puesta en marcha</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Maquinaria y Equipo ({currencySymbol})</label>
                    <input
                      type="number"
                      value={inputs.machinery}
                      onChange={(e) => handleInputChange('machinery', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500 bg-white"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Activo fijo depreciable</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobiliario e Instalaciones ({currencySymbol})</label>
                    <input
                      type="number"
                      value={inputs.furniture}
                      onChange={(e) => handleInputChange('furniture', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500 bg-white"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Acondicionamiento físico</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Capital de Trabajo Inicial ({currencySymbol})</label>
                    <input
                      type="number"
                      value={inputs.workingCapital}
                      onChange={(e) => handleInputChange('workingCapital', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 font-bold focus:outline-none focus:border-brand-500 bg-white"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Inventario y caja operativa</span>
                  </div>
                </div>

                {/* Tasa de descuento */}
                <div className="p-4 bg-brand-50/70 border border-brand-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-brand-900 flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-brand-600" />
                      Tasa de Descuento (WACC / Tasa de Corte Exigida)
                    </div>
                    <p className="text-[11px] text-brand-700 mt-0.5">
                      Costo promedio ponderado de capital exigido para evaluar el VPN y la TIR
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={inputs.wacc}
                      onChange={(e) => handleInputChange('wacc', e.target.value)}
                      className="w-20 px-3 py-1.5 rounded-lg border border-brand-300 text-xs font-bold text-slate-900 bg-white text-right"
                    />
                    <span className="font-bold text-brand-900 text-xs">%</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Proyección de Ventas */}
            {activeSubTab === 'sales' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      Proyección de Ventas (Responsable: Natán Saquic)
                    </h3>
                    <p className="text-xs text-slate-500">Estimación de ingresos anuales en {currencySymbol}</p>
                  </div>

                  {/* Switch entre Asistente y Manual */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setSalesMode('assistant')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        salesMode === 'assistant' 
                          ? 'bg-brand-600 text-white shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Asistente de Proyección
                    </button>
                    <button
                      type="button"
                      onClick={() => setSalesMode('manual')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        salesMode === 'manual' 
                          ? 'bg-brand-600 text-white shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Edición Manual
                    </button>
                  </div>
                </div>

                {/* ASISTENTE AUTOMÁTICO DE VENTAS */}
                {salesMode === 'assistant' && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 border border-blue-200/80 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-600" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-brand-900">
                          Asistente: Calcula tus ventas a partir de 3 datos simples
                        </h4>
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                        Generador Automático
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      {/* 1. Precio Promedio */}
                      <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                        <label className="block font-semibold text-slate-700 mb-1">
                          1. Precio Promedio o Ticket ({currencySymbol})
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-xs font-bold text-slate-400">{currencySymbol}</span>
                          <input
                            type="number"
                            step="0.01"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                            className="w-full pl-7 pr-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-500"
                            placeholder="100.00"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 block">Precio por unidad o servicio</span>
                      </div>

                      {/* 2. Unidades / Clientes Mensuales Año 1 */}
                      <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                        <label className="block font-semibold text-slate-700 mb-1">
                          2. Unidades / Clientes al Mes (Año 1)
                        </label>
                        <input
                          type="number"
                          value={monthlyUnitsY1}
                          onChange={(e) => setMonthlyUnitsY1(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-500"
                          placeholder="250"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Total Año 1: {(Number(monthlyUnitsY1) * 12).toLocaleString()} unidades
                        </span>
                      </div>

                      {/* 3. Tasa de Crecimiento Anual */}
                      <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs">
                        <label className="block font-semibold text-slate-700 mb-1">
                          3. Crecimiento Anual Estimado (%)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="1"
                            value={growthRate}
                            onChange={(e) => setGrowthRate(e.target.value)}
                            className="w-20 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-brand-500"
                            placeholder="15"
                          />
                          <span className="text-xs font-bold text-slate-600">% anual</span>
                        </div>
                        
                        {/* Botones rápidos de tasa */}
                        <div className="mt-1.5 flex gap-1 text-[10px]">
                          <button
                            type="button"
                            onClick={() => { setGrowthRate(10); handleAutoProjectSales(unitPrice, monthlyUnitsY1, 10); }}
                            className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                          >
                            10%
                          </button>
                          <button
                            type="button"
                            onClick={() => { setGrowthRate(15); handleAutoProjectSales(unitPrice, monthlyUnitsY1, 15); }}
                            className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                          >
                            15%
                          </button>
                          <button
                            type="button"
                            onClick={() => { setGrowthRate(20); handleAutoProjectSales(unitPrice, monthlyUnitsY1, 20); }}
                            className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
                          >
                            20%
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[11px] text-slate-500">
                        Fórmula: <code className="font-mono text-slate-700">Año 1 = (Unidades × 12) × Precio; Años siguientes = Año Anterior × (1 + {growthRate}%)</code>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAutoProjectSales()}
                        className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-brand-600/20 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Calcular y Proyectar a 5 Años</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* RESULTADO: LOS 5 AÑOS CALCULADOS (EDITABLES) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">
                      Ventas Anuales Proyectadas en {currencySymbol} (puedes ajustar cada año manualmente):
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Total 5 Años: {currencySymbol} {(Number(inputs.salesY1) + Number(inputs.salesY2) + Number(inputs.salesY3) + Number(inputs.salesY4) + Number(inputs.salesY5)).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { label: "Año 1", key: "salesY1" },
                      { label: "Año 2", key: "salesY2" },
                      { label: "Año 3", key: "salesY3" },
                      { label: "Año 4", key: "salesY4" },
                      { label: "Año 5", key: "salesY5" }
                    ].map((field, idx) => {
                      const prevVal = idx === 0 ? null : inputs[`salesY${idx}`];
                      const currentVal = inputs[field.key];
                      const diffPct = prevVal && Number(prevVal) > 0 ? (((Number(currentVal) - Number(prevVal)) / Number(prevVal)) * 100).toFixed(1) : null;

                      return (
                        <div key={field.key} className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-brand-300 transition">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-800">{field.label}</span>
                            {diffPct && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                                +{diffPct}%
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">{currencySymbol}</span>
                            <input
                              type="number"
                              value={inputs[field.key]}
                              onChange={(e) => handleInputChange(field.key, e.target.value)}
                              className="w-full pl-7 pr-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Crecimiento Compuesto:</strong> Modifica libremente las ventas de cada año o utiliza el Asistente Automático. El sistema recalculará el costo de ventas, utilidad bruta, flujos y razones en tiempo real en los estados financieros.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: Costos y Gastos */}
            {activeSubTab === 'costs' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-brand-600" />
                    Estructura Operativa de Costos y Gastos
                  </h3>
                  <p className="text-xs text-slate-500">Parámetros para el Estado de Resultados y cálculo de márgenes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Costo de Ventas Directo (% sobre Ventas)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={inputs.costPercentage}
                        onChange={(e) => handleInputChange('costPercentage', e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500"
                      />
                      <span className="font-bold text-slate-700 text-xs">%</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Materia prima, mano de obra e insumos directos</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tasa de Impuesto Sobre la Renta (ISR)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={inputs.taxRate}
                        onChange={(e) => handleInputChange('taxRate', e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500"
                      />
                      <span className="font-bold text-slate-700 text-xs">%</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">25% Régimen sobre las utilidades de actividades lucrativas (SAT)</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gastos de Administración Anuales ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={inputs.adminExpenses}
                      onChange={(e) => handleInputChange('adminExpenses', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Sueldos administrativos fijos, alquileres, servicios</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gastos de Venta y Comercialización ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={inputs.salesExpenses}
                      onChange={(e) => handleInputChange('salesExpenses', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Comisiones, transporte, logística y publicidad</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Financiamiento */}
            {activeSubTab === 'financing' && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Coins className="w-4 h-4 text-brand-600" />
                    Estructura de Financiamiento con Terceros
                  </h3>
                  <p className="text-xs text-slate-500">Préstamo bancario para adquisición de activos fijos</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monto del Préstamo Bancario ({currencySymbol})</label>
                    <input
                      type="number"
                      value={inputs.bankDebt}
                      onChange={(e) => handleInputChange('bankDebt', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Deuda bancaria a mediano plazo</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tasa de Interés Activa Anual</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-500"
                      />
                      <span className="font-bold text-slate-700 text-xs">%</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Tasa bancaria para préstamos a pymes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Navigation Shortcut */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Los cambios se reflejan inmediatamente en todos los módulos.
              </span>
              <button
                type="button"
                onClick={() => onNavigate('statements')}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Ver Estados Financieros Calculados →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Live Validation & Summary (1 Col) */}
        <div className="space-y-5">
          {/* Inversión Resumen Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Resumen de Inversión Inicial Calculado</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Maquinaria y Equipo</span>
                <span className="font-semibold text-slate-900">{currencySymbol} {(Number(inputs.machinery) || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Mobiliario e Instalaciones</span>
                <span className="font-semibold text-slate-900">{currencySymbol} {(Number(inputs.furniture) || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Capital de Trabajo</span>
                <span className="font-semibold text-slate-900">{currencySymbol} {(Number(inputs.workingCapital) || 0).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-bold text-sm">
                <span className="text-slate-900">Total Inversión (I₀)</span>
                <span className="text-brand-600">{currencySymbol} {totalInvestment.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Módulo de Validación 9.6 (Elian Rosales) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Módulo de Validación Contable
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Activo
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Control en tiempo real de inconsistencias contables (QA / Elian Rosales):
            </p>

            <div className="space-y-2.5">
              {validations.map((v, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs ${
                    v.type === 'danger' 
                      ? 'bg-rose-50 border-rose-200 text-rose-900' 
                      : v.type === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  {v.type === 'danger' ? (
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  ) : v.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <span className="text-[11px] leading-snug font-medium">
                    {v.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
