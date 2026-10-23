import React, { useState, useEffect } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { 
  ShieldAlert, 
  Activity, 
  Radio, 
  LifeBuoy, 
  Clock, 
  AlertTriangle, 
  MapPin, 
  Layers,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ onToggleMobileMenu, mobileMenuOpen }) {
  const { 
    camps, 
    selectedCampId, 
    setSelectedCampId, 
    stats, 
    setActiveTab, 
    activeTab 
  } = useDisaster();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedCamp = camps.find(c => c.id === selectedCampId) || camps[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0A09]/95 backdrop-blur-md border-b border-[#393027] px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Brand & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleMobileMenu}
            className="p-1.5 rounded-lg border border-[#393027] text-cream-muted hover:text-cream hover:bg-[#191512] lg:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#D99055] to-[#B87239] shadow-copper-sm group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-[#0B0A09]" strokeWidth={2.4} />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#35C98A] border-2 border-[#0B0A09] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base lg:text-lg text-[#F5F0E8] font-mono">
                  DISPLACE<span className="text-[#D99055]">OS</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold tracking-widest bg-[#D99055]/15 text-[#D99055] border border-[#D99055]/30 rounded">
                  v2.4 Pro
                </span>
              </div>
              <p className="text-[11px] text-[#A89F91] hidden sm:block tracking-tight font-medium">
                AI Disaster Relief Intelligence & Field Orchestration
              </p>
            </div>
          </div>
        </div>

        {/* Center: Prominent Simulated Data Badge & Live Operations Ticker */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* SIMULATED DATA BADGE (REQUIRED) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#221C18] border border-[#D99055]/40 text-[#D99055] text-xs font-mono font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D99055] animate-ping" />
            <span className="font-bold tracking-wider">SIMULATED DATA</span>
            <span className="hidden md:inline text-[10px] text-[#A89F91] border-l border-[#393027] pl-1.5">
              Mission Advisory Mode
            </span>
          </div>

          {/* Critical Warnings Indicator */}
          {stats.criticalCampsCount > 0 && (
            <div 
              onClick={() => setActiveTab('depletion')}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F05252]/10 border border-[#F05252]/40 text-[#F05252] text-xs font-mono cursor-pointer hover:bg-[#F05252]/20 transition-colors"
              title="Click to view depletion predictions"
            >
              <AlertTriangle size={13} className="animate-bounce" />
              <span>{stats.criticalCampsCount} Camps Critical (&lt;12h stock)</span>
            </div>
          )}

          {stats.silentCampsCount > 0 && (
            <div 
              onClick={() => setActiveTab('silent')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono cursor-pointer hover:bg-amber-500/20 transition-colors"
              title="Click to inspect silent camps"
            >
              <Radio size={13} className="text-amber-400 animate-pulse" />
              <span>{stats.silentCampsCount} Telemetry Alert</span>
            </div>
          )}
        </div>

        {/* Right: Camp Focus Switcher & Quick Citizen Help Button */}
        <div className="flex items-center gap-2 lg:gap-3">
          
          {/* Camp Selector dropdown */}
          <div className="relative">
            <label className="text-[10px] text-[#A89F91] font-mono uppercase tracking-wider block -mb-0.5 hidden xl:block">
              Focused Sector
            </label>
            <div className="relative flex items-center">
              <MapPin size={13} className="absolute left-2.5 text-[#D99055] pointer-events-none" />
              <select
                value={selectedCampId}
                onChange={(e) => setSelectedCampId(e.target.value)}
                className="bg-[#191512] text-[#F5F0E8] text-xs pl-7 pr-7 py-1.5 rounded-lg border border-[#393027] focus:outline-none focus:border-[#D99055] appearance-none font-medium cursor-pointer transition-colors max-w-[150px] sm:max-w-[210px] truncate"
              >
                {camps.map(camp => (
                  <option key={camp.id} value={camp.id}>
                    {camp.name} ({camp.population.toLocaleString()} pop)
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 text-[#A89F91] pointer-events-none" />
            </div>
          </div>

          {/* Quick Help Direct Citizen Button (Huge Emergency CTA) */}
          <button
            onClick={() => setActiveTab('citizen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wide transition-all shadow-copper-sm ${
              activeTab === 'citizen'
                ? 'bg-[#F05252] text-white shadow-critical-glow ring-2 ring-[#F05252]/50'
                : 'bg-gradient-to-r from-[#D99055] to-[#B87239] text-[#0B0A09] hover:brightness-110 active:scale-95'
            }`}
          >
            <LifeBuoy size={15} className={activeTab === 'citizen' ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">CITIZEN</span> HELP UI
          </button>

          {/* Clock Ticker */}
          <div className="hidden 2xl:flex items-center gap-1 text-xs font-mono text-[#A89F91] bg-[#14110E] px-2.5 py-1.5 rounded-lg border border-[#26201A]">
            <Clock size={12} className="text-[#D99055]" />
            <span>{currentTime}</span>
          </div>

        </div>

      </div>
    </header>
  );
}
