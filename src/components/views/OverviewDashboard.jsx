import React from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  Users,
  AlertTriangle,
  ArrowLeftRight,
  Ticket,
  Radio,
  Droplets,
  Activity,
  ShieldCheck,
  LifeBuoy,
  Compass,
  TrendingDown,
  Clock,
  ChevronRight,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export default function OverviewDashboard() {
  const { 
    camps, 
    stats, 
    transfers, 
    tokens, 
    silentIncidents, 
    setActiveTab, 
    setSelectedCampId, 
    calculateDepletion 
  } = useDisaster();

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Situational Awareness & Readiness Level */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#191512] via-[#221C18] to-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#D99055]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D99055]/20 text-[#D99055] border border-[#D99055]/40 uppercase tracking-wider">
                Emergency Phase 2 — Active Response
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#35C98A] bg-[#35C98A]/10 border border-[#35C98A]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35C98A] animate-ping" />
                Network Synchronized
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#F5F0E8] tracking-tight">
              Disaster Relief Mission Control
            </h1>
            <p className="text-sm text-[#A89F91] mt-1 max-w-2xl">
              Coordinating multi-sector relief across 5 regional displaced population hubs. Real-time resource depletion tracking, camp barter transfers, clinical triage, and simulated evacuation logistics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('citizen')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F05252] to-[#B83232] text-white text-xs font-bold font-mono shadow-critical-glow hover:brightness-110 active:scale-95 transition-all"
            >
              <LifeBuoy size={16} />
              CITIZEN QUICK-HELP UI
            </button>
            <button
              onClick={() => setActiveTab('barter')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#221C18] border border-[#D99055] text-[#D99055] text-xs font-bold font-mono hover:bg-[#D99055] hover:text-[#0B0A09] transition-all shadow-copper-sm"
            >
              <ArrowLeftRight size={16} />
              INITIATE BARTER TRANSFER
            </button>
          </div>
        </div>
      </div>

      {/* Primary Key Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Sheltered Souls */}
        <div className="bg-[#191512] border border-[#393027] rounded-xl p-4.5 relative overflow-hidden group hover:border-[#D99055]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A89F91]">
              Displaced Population
            </span>
            <div className="p-2 rounded-lg bg-[#221C18] text-[#D99055]">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#F5F0E8]">
              {stats.totalPopulation.toLocaleString()}
            </span>
            <span className="text-xs text-[#A89F91]">
              / {stats.totalMaxCapacity.toLocaleString()} max cap
            </span>
          </div>
          <div className="mt-3 w-full bg-[#0B0A09] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#D99055] to-[#35C98A] h-full rounded-full"
              style={{ width: `${stats.capacityPercentage}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-mono text-[#A89F91]">
            <span>{stats.capacityPercentage}% occupied</span>
            <span className="text-[#35C98A]">{camps.length} safe camps</span>
          </div>
        </div>

        {/* Metric 2: Critical Stock Deficits */}
        <div 
          onClick={() => setActiveTab('depletion')}
          className={`bg-[#191512] border rounded-xl p-4.5 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.01] ${
            stats.criticalCampsCount > 0 ? 'border-[#F05252]/60 shadow-critical-glow' : 'border-[#393027]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A89F91]">
              Critical Depletion (&lt;12h)
            </span>
            <div className="p-2 rounded-lg bg-[#F05252]/10 text-[#F05252]">
              <Flame size={16} className={stats.criticalCampsCount > 0 ? 'animate-bounce' : ''} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#F05252]">
              {stats.criticalCampsCount}
            </span>
            <span className="text-xs text-[#A89F91]">
              Camps with imminent shortages
            </span>
          </div>
          <p className="mt-2 text-xs text-[#F5F0E8]/80 leading-snug">
            Camp Beta & Delta have critical potable water & ORS depletion countdowns.
          </p>
          <div className="mt-2 text-[11px] text-[#D99055] font-mono flex items-center gap-1">
            <span>Inspect Countdown Timers</span>
            <ChevronRight size={12} />
          </div>
        </div>

        {/* Metric 3: Active Barters & Convoys */}
        <div 
          onClick={() => setActiveTab('barter')}
          className="bg-[#191512] border border-[#393027] hover:border-[#D99055]/60 rounded-xl p-4.5 relative overflow-hidden cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A89F91]">
              Active Camp Barters
            </span>
            <div className="p-2 rounded-lg bg-[#D99055]/15 text-[#D99055]">
              <ArrowLeftRight size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#D99055]">
              {stats.activeTransfersCount}
            </span>
            <span className="text-xs text-[#A89F91]">
              In transit or pending approval
            </span>
          </div>
          <p className="mt-2 text-xs text-[#A89F91] leading-snug">
            Zero safety-stock violation guarantee. Real-time balance sync.
          </p>
          <div className="mt-2 text-[11px] text-[#D99055] font-mono flex items-center gap-1">
            <span>Manage Convoys</span>
            <ChevronRight size={12} />
          </div>
        </div>

        {/* Metric 4: Priority Clinical Tokens */}
        <div 
          onClick={() => setActiveTab('tokens')}
          className="bg-[#191512] border border-[#393027] hover:border-[#35C98A]/60 rounded-xl p-4.5 relative overflow-hidden cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A89F91]">
              Priority Triage Queue
            </span>
            <div className="p-2 rounded-lg bg-[#35C98A]/15 text-[#35C98A]">
              <Ticket size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#F5F0E8]">
              {stats.waitingTokensCount}
            </span>
            <span className="text-xs text-[#A89F91]">
              Waiting in triage
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-mono">
            <span className="px-1.5 py-0.5 rounded bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/30">
              P1: {stats.p1Count}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              P2: {stats.p2Count}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#221C18] text-[#A89F91] border border-[#393027]">
              P3: {stats.p3Count}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#35C98A] font-mono flex items-center gap-1">
            <span>Triage Callboard</span>
            <ChevronRight size={12} />
          </div>
        </div>

      </div>

      {/* Main Grid: Sector Camp Statuses + Quick Actions Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Camps Operational Cards (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#F5F0E8] font-mono">
                Regional Relief Camps Telemetry
              </h3>
              <p className="text-xs text-[#A89F91]">
                Real-time population census, depletion risks, and road connectivity
              </p>
            </div>
            <button
              onClick={() => setActiveTab('depletion')}
              className="text-xs font-mono text-[#D99055] hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {camps.map((camp) => {
              const waterDep = calculateDepletion(camp.resources.water.currentStock, camp.population, camp.resources.water.dailyRate);
              const foodDep = calculateDepletion(camp.resources.food.currentStock, camp.population, camp.resources.food.dailyRate);
              const isCritical = waterDep.status === 'CRITICAL' || foodDep.status === 'CRITICAL';
              const isSilent = camp.telemetryStatus === 'silent';
              const isStale = camp.telemetryStatus === 'stale';

              return (
                <div
                  key={camp.id}
                  className={`bg-[#191512] border rounded-xl p-4 transition-all hover:border-[#D99055]/50 flex flex-col justify-between ${
                    isSilent
                      ? 'border-[#F05252]/60 bg-[#191512]/95 shadow-critical-glow'
                      : isCritical
                        ? 'border-[#F05252]/40'
                        : 'border-[#393027]'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono font-bold text-[#D99055]">
                            {camp.code}
                          </span>
                          <span className="text-xs font-bold text-[#F5F0E8]">
                            {camp.name.split('(')[0]}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A89F91]">
                          {camp.location} • Alt {camp.elevation}
                        </p>
                      </div>

                      {/* Status pill */}
                      {isSilent ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/40 animate-pulse">
                          SILENT &gt; 7h
                        </span>
                      ) : isStale ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                          STALE TELEMETRY
                        </span>
                      ) : isCritical ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/40">
                          DEPLETION ALERT
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40">
                          STABLE
                        </span>
                      )}
                    </div>

                    {/* Stock Indicators */}
                    <div className="mt-3.5 space-y-2">
                      {/* Water indicator */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#A89F91] flex items-center gap-1">
                            <Droplets size={12} className="text-sky-400" />
                            Potable Water:
                          </span>
                          <span className={waterDep.status === 'CRITICAL' ? 'text-[#F05252] font-bold' : 'text-[#F5F0E8]'}>
                            {camp.resources.water.currentStock.toLocaleString()} L ({waterDep.hoursRemaining}h left)
                          </span>
                        </div>
                        <div className="w-full bg-[#0B0A09] h-1.5 rounded-full overflow-hidden mt-1">
                          <div 
                            className={`h-full rounded-full ${
                              waterDep.status === 'CRITICAL' ? 'bg-[#F05252]' : waterDep.status === 'HIGH_RISK' ? 'bg-amber-500' : 'bg-sky-400'
                            }`}
                            style={{ width: `${Math.min(100, (camp.resources.water.currentStock / (camp.resources.water.safetyStock * 2)) * 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Food indicator */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#A89F91]">Ration Packs:</span>
                          <span className={foodDep.status === 'CRITICAL' ? 'text-[#F05252] font-bold' : 'text-[#F5F0E8]'}>
                            {camp.resources.food.currentStock.toLocaleString()} ({foodDep.hoursRemaining}h left)
                          </span>
                        </div>
                        <div className="w-full bg-[#0B0A09] h-1.5 rounded-full overflow-hidden mt-1">
                          <div 
                            className={`h-full rounded-full ${
                              foodDep.status === 'CRITICAL' ? 'bg-[#F05252]' : 'bg-[#D99055]'
                            }`}
                            style={{ width: `${Math.min(100, (camp.resources.food.currentStock / (camp.resources.food.safetyStock * 2)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terrain & Flood Badge */}
                    <div className="mt-3 pt-2.5 border-t border-[#393027]/60 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[#A89F91]">
                      <span className="px-1.5 py-0.5 rounded bg-[#221C18] border border-[#393027]">
                        Terrain: {camp.terrain}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded border ${
                        camp.floodRisk === 'high' ? 'bg-[#F05252]/10 text-[#F05252] border-[#F05252]/30' : 'bg-[#221C18] border-[#393027]'
                      }`}>
                        Flood: {camp.floodRisk.toUpperCase()}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#221C18] border border-[#393027]">
                        Road: {camp.roadAccess}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedCampId(camp.id);
                        setActiveTab('depletion');
                      }}
                      className="text-xs font-mono text-[#D99055] hover:text-[#F0AA75] flex items-center gap-1 font-semibold"
                    >
                      <span>Simulate Depletion</span>
                      <ChevronRight size={13} />
                    </button>

                    {isCritical && (
                      <button
                        onClick={() => {
                          setSelectedCampId(camp.id);
                          setActiveTab('barter');
                        }}
                        className="px-2.5 py-1 rounded bg-[#D99055] text-[#0B0A09] text-[11px] font-mono font-bold hover:brightness-110"
                      >
                        Request Barter
                      </button>
                    )}

                    {isSilent && (
                      <button
                        onClick={() => {
                          setSelectedCampId(camp.id);
                          setActiveTab('silent');
                        }}
                        className="px-2.5 py-1 rounded bg-[#F05252] text-white text-[11px] font-mono font-bold hover:brightness-110"
                      >
                        Verify Silent Camp
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Urgent Alerts & Quick Dispatch Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F5F0E8] font-mono">
              Operational Priority Feed
            </h3>
            <span className="text-[11px] font-mono text-[#35C98A]">
              Live Feed
            </span>
          </div>

          <div className="bg-[#191512] border border-[#393027] rounded-xl p-4 space-y-3.5">
            
            {/* Urgent Alert 1 */}
            <div className="p-3 rounded-lg bg-[#F05252]/10 border border-[#F05252]/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#F05252] font-bold flex items-center gap-1">
                  <AlertTriangle size={13} />
                  WATER CRITICAL: Camp Beta
                </span>
                <span className="text-[#A89F91]">8.5h left</span>
              </div>
              <p className="text-xs text-[#F5F0E8]/90">
                Water reserves down to 3,900 L with 890 souls sheltered. Convoy TR-1081 dispatched from Camp Alpha.
              </p>
              <button
                onClick={() => setActiveTab('barter')}
                className="mt-1 text-[11px] font-mono text-[#D99055] hover:underline flex items-center gap-1"
              >
                Track Transfer Convoy →
              </button>
            </div>

            {/* Urgent Alert 2 */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Radio size={13} />
                  TELEMETRY DROP: Camp Delta
                </span>
                <span className="text-[#A89F91]">7h 48m silent</span>
              </div>
              <p className="text-xs text-[#F5F0E8]/90">
                3 missed radio intervals. Control room UAV reconnaissance underway. Camp is NOT declared empty.
              </p>
              <button
                onClick={() => setActiveTab('silent')}
                className="mt-1 text-[11px] font-mono text-[#D99055] hover:underline flex items-center gap-1"
              >
                View Verification Protocol →
              </button>
            </div>

            {/* Quick Actions Panel */}
            <div className="pt-2 border-t border-[#393027] space-y-2">
              <span className="text-[11px] font-mono uppercase text-[#A89F91] tracking-wider block">
                Quick Command Shortcuts
              </span>
              
              <button
                onClick={() => setActiveTab('planner')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#221C18] border border-[#393027] hover:border-[#D99055] text-xs font-medium text-[#F5F0E8] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Compass size={14} className="text-[#D99055]" />
                  AI Camp Layout Site Planner
                </span>
                <ChevronRight size={13} className="text-[#A89F91]" />
              </button>

              <button
                onClick={() => setActiveTab('volunteers')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#221C18] border border-[#393027] hover:border-[#D99055] text-xs font-medium text-[#F5F0E8] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Users size={14} className="text-[#35C98A]" />
                  Match Volunteers to Open Tasks
                </span>
                <ChevronRight size={13} className="text-[#A89F91]" />
              </button>

              <button
                onClick={() => setActiveTab('routes')}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#221C18] border border-[#393027] hover:border-[#D99055] text-xs font-medium text-[#F5F0E8] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-sky-400" />
                  Disaster-Safe Routes & Road Blocks
                </span>
                <ChevronRight size={13} className="text-[#A89F91]" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
