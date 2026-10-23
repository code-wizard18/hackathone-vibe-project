import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  Hourglass,
  Droplets,
  Utensils,
  Activity,
  HeartPulse,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
  Sliders,
  ShieldAlert,
  ArrowLeftRight,
  Clock,
  Sparkles
} from 'lucide-react';

export default function DepletionPredictor() {
  const { 
    camps, 
    selectedCampId, 
    setSelectedCampId, 
    calculateDepletion, 
    setActiveTab 
  } = useDisaster();

  // Selected camp
  const currentCamp = camps.find(c => c.id === selectedCampId) || camps[0];

  // What-if Scenario Simulation Adjusters
  const [popSurge, setPopSurge] = useState(0); // additional displaced arrivals
  const [rateMultiplier, setRateMultiplier] = useState(1.0); // extreme heat or surge factor

  const effectivePopulation = currentCamp.population + popSurge;

  const resourceConfig = [
    {
      key: 'water',
      label: 'Potable Drinking Water',
      unit: 'Liters',
      icon: Droplets,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      whoStandard: 'Sphere Standard: 3.0 - 5.0 L/person/day in hot climate'
    },
    {
      key: 'food',
      label: 'Ration Packs (Ready-to-Eat)',
      unit: 'Ration Packs',
      icon: Utensils,
      color: 'text-[#D99055]',
      bg: 'bg-[#D99055]/10',
      border: 'border-[#D99055]/30',
      whoStandard: 'UNHCR Standard: 2,100 kcal / person / day (2 packs)'
    },
    {
      key: 'ors',
      label: 'ORS (Oral Rehydration Salts)',
      unit: 'Sachets',
      icon: Activity,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      whoStandard: 'Cholera/Diarrhea Cluster Protocol: 0.35 sachets/capita'
    },
    {
      key: 'medicine',
      label: 'Trauma & Antibiotic Kits',
      unit: 'Trauma Kits',
      icon: HeartPulse,
      color: 'text-[#F05252]',
      bg: 'bg-[#F05252]/10',
      border: 'border-[#F05252]/30',
      whoStandard: 'Inter-Agency Emergency Health Kit (IEHK) baseline'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Mission Explanation */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D99055]/15 text-[#D99055] border border-[#D99055]/30">
                Transparent Formula Engine
              </span>
              <span className="text-xs font-mono text-[#A89F91]">
                Formula: Stock ÷ (Population × Daily Rate ÷ 24)
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F0E8] font-mono">
              Resource Depletion Predictor
            </h2>
            <p className="text-xs text-[#A89F91] mt-1 max-w-2xl">
              Calculates granular burnout countdowns based on empirical stock, population load, and daily consumption rates. No black-box claims — every mathematical derivation is exposed below.
            </p>
          </div>

          {/* Camp Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#A89F91] whitespace-nowrap hidden sm:inline">
              Selected Camp:
            </span>
            <select
              value={selectedCampId}
              onChange={(e) => setSelectedCampId(e.target.value)}
              className="bg-[#221C18] text-[#F5F0E8] text-xs px-3 py-2 rounded-xl border border-[#D99055] font-mono font-bold focus:outline-none cursor-pointer"
            >
              {camps.map(camp => (
                <option key={camp.id} value={camp.id}>
                  {camp.name} ({camp.population} pop)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* What-If Simulation Control Drawer */}
        <div className="mt-5 pt-4 border-t border-[#393027] bg-[#14110E] -mx-5 -mb-5 p-4 lg:px-6 rounded-b-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D99055]">
              <Sliders size={15} />
              <span className="font-bold uppercase tracking-wider">What-If Stress Simulation</span>
              <span className="text-[11px] text-[#A89F91] font-normal">
                (Simulate sudden refugee surges or heatwave consumption spikes)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {/* Population Surge Slider */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#A89F91]">
                  Displaced Arrival Surge:
                </span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={popSurge}
                  onChange={(e) => setPopSurge(Number(e.target.value))}
                  className="w-32 accent-[#D99055] cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-[#F5F0E8] w-14">
                  +{popSurge} pop
                </span>
              </div>

              {/* Reset simulation */}
              {(popSurge > 0 || rateMultiplier !== 1.0) && (
                <button
                  onClick={() => { setPopSurge(0); setRateMultiplier(1.0); }}
                  className="text-[11px] font-mono text-[#F05252] hover:underline"
                >
                  Reset to Actuals
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 4 Core Depletion Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resourceConfig.map(res => {
          const Icon = res.icon;
          const resourceData = currentCamp.resources[res.key] || {
            currentStock: 0,
            safetyStock: 0,
            dailyRate: 1,
            unit: res.unit
          };

          const effectiveDailyRate = resourceData.dailyRate * rateMultiplier;
          const depletion = calculateDepletion(
            resourceData.currentStock,
            effectivePopulation,
            effectiveDailyRate
          );

          const isCritical = depletion.status === 'CRITICAL';
          const isHighRisk = depletion.status === 'HIGH_RISK';
          const belowSafetyStock = resourceData.currentStock < resourceData.safetyStock;
          const deficit = Math.max(0, resourceData.safetyStock - resourceData.currentStock);

          // Projected depletion date
          const depletionHours = depletion.hoursRemaining;
          const depletionTime = new Date(Date.now() + depletionHours * 3600 * 1000).toLocaleTimeString([], {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div
              key={res.key}
              className={`bg-[#191512] rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isCritical 
                  ? 'border-[#F05252] shadow-critical-glow' 
                  : isHighRisk 
                    ? 'border-amber-500/60 shadow-copper-sm' 
                    : 'border-[#393027]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${res.bg} ${res.border} border`}>
                      <Icon size={20} className={res.color} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F5F0E8] font-mono">
                        {res.label}
                      </h4>
                      <p className="text-[11px] text-[#A89F91]">
                        {res.whoStandard}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold ${
                    isCritical
                      ? 'bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/40 animate-pulse'
                      : isHighRisk
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40'
                  }`}>
                    {isCritical ? 'CRITICAL DEFICIT' : isHighRisk ? 'HIGH DEPLETION' : 'STABLE BUFFER'}
                  </span>
                </div>

                {/* Main Countdown Display */}
                <div className="mt-5 p-4 rounded-xl bg-[#14110E] border border-[#26201A]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#A89F91] tracking-wider block">
                        Estimated Burnout Countdown
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className={`text-3xl font-extrabold font-mono tracking-tight ${
                          isCritical ? 'text-[#F05252]' : isHighRisk ? 'text-amber-400' : 'text-[#35C98A]'
                        }`}>
                          {depletion.hoursRemaining} hrs
                        </span>
                        <span className="text-xs text-[#A89F91] font-mono">
                          (~{depletion.daysRemaining} days)
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#A89F91] tracking-wider block">
                        Projected Zero Stock
                      </span>
                      <span className="text-xs font-mono font-semibold text-[#F5F0E8] mt-1 block">
                        {depletion.hoursRemaining > 200 ? '> 10 Days' : depletionTime}
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar vs Safety Stock */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-mono mb-1 text-[#A89F91]">
                      <span>Stock: {resourceData.currentStock.toLocaleString()} {resourceData.unit}</span>
                      <span>Safety Floor: {resourceData.safetyStock.toLocaleString()} {resourceData.unit}</span>
                    </div>
                    <div className="w-full bg-[#0B0A09] h-2.5 rounded-full overflow-hidden relative">
                      {/* Safety threshold marker */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                        style={{ left: '50%' }}
                        title="Safety Stock Buffer Line"
                      />
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCritical ? 'bg-[#F05252]' : isHighRisk ? 'bg-amber-500' : 'bg-[#35C98A]'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (resourceData.currentStock / (resourceData.safetyStock * 2 || 1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Mathematical Derivation Transparency Box */}
                <div className="mt-4 p-3 rounded-lg bg-[#221C18]/60 border border-[#393027] text-xs font-mono space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#D99055] font-bold text-[11px]">
                    <Info size={13} />
                    <span>Calculation Breakdown (No Black Box)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#A89F91]">
                    <div>
                      <span>Population Load:</span>
                      <span className="text-[#F5F0E8] ml-1 font-semibold">{effectivePopulation.toLocaleString()}</span>
                    </div>
                    <div>
                      <span>Consumption/Person:</span>
                      <span className="text-[#F5F0E8] ml-1 font-semibold">{resourceData.dailyRate} {resourceData.unit}/day</span>
                    </div>
                    <div>
                      <span>Hourly Consumption:</span>
                      <span className="text-[#F5F0E8] ml-1 font-semibold">{depletion.hourlyConsumption} {resourceData.unit}/hr</span>
                    </div>
                    <div>
                      <span>Formula:</span>
                      <span className="text-[#D99055] ml-1 font-semibold">{resourceData.currentStock} ÷ {depletion.hourlyConsumption}</span>
                    </div>
                  </div>
                </div>

                {/* Reorder Alert Notification */}
                {belowSafetyStock && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#F05252]/10 border border-[#F05252]/30 flex items-center gap-2 text-xs text-[#F05252]">
                    <AlertTriangle size={15} className="flex-shrink-0" />
                    <p className="leading-tight">
                      <strong>Reorder Alert Triggered:</strong> Deficit of {deficit.toLocaleString()} {resourceData.unit} below mandated safety buffer.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action: Barter replenishment trigger */}
              <div className="mt-4 pt-3 border-t border-[#393027] flex items-center justify-between">
                <span className="text-[11px] text-[#A89F91] font-mono">
                  {belowSafetyStock ? 'Requires immediate replenishment' : 'Stock level monitored'}
                </span>

                <button
                  onClick={() => {
                    setSelectedCampId(currentCamp.id);
                    setActiveTab('barter');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    isCritical
                      ? 'bg-[#F05252] text-white hover:brightness-110 shadow-critical-glow'
                      : 'bg-[#221C18] border border-[#D99055] text-[#D99055] hover:bg-[#D99055] hover:text-[#0B0A09]'
                  }`}
                >
                  <ArrowLeftRight size={13} />
                  <span>Request Barter Transfer</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Comparison Table */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 shadow-2xl">
        <h3 className="text-base font-bold text-[#F5F0E8] font-mono mb-3 flex items-center gap-2">
          <Clock size={16} className="text-[#D99055]" />
          Cross-Camp Depletion Horizon Matrix
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#393027] text-[#A89F91]">
                <th className="py-2.5 px-3">Relief Camp</th>
                <th className="py-2.5 px-3">Population</th>
                <th className="py-2.5 px-3">Water Hours</th>
                <th className="py-2.5 px-3">Food Hours</th>
                <th className="py-2.5 px-3">ORS Hours</th>
                <th className="py-2.5 px-3">Medical Hours</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#393027]/50">
              {camps.map(c => {
                const w = calculateDepletion(c.resources.water.currentStock, c.population, c.resources.water.dailyRate);
                const f = calculateDepletion(c.resources.food.currentStock, c.population, c.resources.food.dailyRate);
                const o = calculateDepletion(c.resources.ors.currentStock, c.population, c.resources.ors.dailyRate);
                const m = calculateDepletion(c.resources.medicine.currentStock, c.population, c.resources.medicine.dailyRate);

                return (
                  <tr key={c.id} className="hover:bg-[#221C18]/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#F5F0E8]">
                      {c.name.split('(')[0]}
                    </td>
                    <td className="py-3 px-3 text-[#A89F91]">
                      {c.population.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded ${w.status === 'CRITICAL' ? 'bg-[#F05252]/20 text-[#F05252] font-bold' : 'text-[#F5F0E8]'}`}>
                        {w.hoursRemaining}h
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded ${f.status === 'CRITICAL' ? 'bg-[#F05252]/20 text-[#F05252] font-bold' : 'text-[#F5F0E8]'}`}>
                        {f.hoursRemaining}h
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded ${o.status === 'CRITICAL' ? 'bg-[#F05252]/20 text-[#F05252] font-bold' : 'text-[#F5F0E8]'}`}>
                        {o.hoursRemaining}h
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded ${m.status === 'CRITICAL' ? 'bg-[#F05252]/20 text-[#F05252] font-bold' : 'text-[#F5F0E8]'}`}>
                        {m.hoursRemaining}h
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedCampId(c.id)}
                        className="text-[11px] text-[#D99055] hover:underline font-bold"
                      >
                        Inspect Camp
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
