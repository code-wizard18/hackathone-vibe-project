import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import {
  LayoutDashboard,
  Hourglass,
  ArrowLeftRight,
  Ticket,
  LifeBuoy,
  Compass,
  Radio,
  UserCheck,
  Navigation,
  AlertCircle,
  TrendingDown,
  ShieldAlert,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ mobileMenuOpen, onCloseMobileMenu }) {
  const { 
    activeTab, 
    setActiveTab, 
    stats, 
    transfers, 
    silentIncidents, 
    tasks, 
    tokens 
  } = useDisaster();

  const navItems = [
    {
      id: 'overview',
      label: 'Mission Overview',
      subtitle: 'Global Situational Intel',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'depletion',
      label: 'Resource Predictor',
      subtitle: 'Depletion countdowns',
      icon: Hourglass,
      badge: stats.criticalCampsCount > 0 ? { count: stats.criticalCampsCount, color: 'bg-critical text-white' } : null,
      highlight: stats.criticalCampsCount > 0
    },
    {
      id: 'barter',
      label: 'Camp-to-Camp Barter',
      subtitle: 'Safety-stock locked transfers',
      icon: ArrowLeftRight,
      badge: stats.activeTransfersCount > 0 ? { count: stats.activeTransfersCount, color: 'bg-copper text-background' } : null,
    },
    {
      id: 'tokens',
      label: 'Priority Token Triage',
      subtitle: 'P1/P2/P3 Clinical Queue',
      icon: Ticket,
      badge: stats.waitingTokensCount > 0 ? { count: stats.waitingTokensCount, color: 'bg-amber-alert text-background' } : null,
    },
    {
      id: 'citizen',
      label: 'Citizen Quick-Help',
      subtitle: 'Accessible emergency UI',
      icon: LifeBuoy,
      special: true,
      badge: { count: 'LIVE', color: 'bg-emerald text-background' }
    },
    {
      id: 'planner',
      label: 'AI Camp Layout Planner',
      subtitle: 'Simulated site layout',
      icon: Compass,
      badge: null,
    },
    {
      id: 'silent',
      label: 'Silent Camp Detector',
      subtitle: 'Telemetry audit & check-ins',
      icon: Radio,
      badge: stats.silentCampsCount > 0 ? { count: stats.silentCampsCount, color: 'bg-critical text-white animate-pulse' } : null,
      highlight: stats.silentCampsCount > 0
    },
    {
      id: 'volunteers',
      label: 'Volunteer Matching',
      subtitle: 'Skill & radius deployment',
      icon: UserCheck,
      badge: { count: tasks.filter(t => t.status === 'open').length, color: 'bg-cream-dark text-cream' }
    },
    {
      id: 'routes',
      label: 'Disaster-Safe Routes',
      subtitle: 'Advisory hazard navigation',
      icon: Navigation,
      badge: null
    }
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (onCloseMobileMenu) onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={onCloseMobileMenu}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-[53px] bottom-0 left-0 z-30 w-72 bg-[#0B0A09] border-r border-[#393027] flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation Link List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className="px-3 pb-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#A89F91]">
            <span>Command Modules</span>
            <span className="text-[10px] text-[#D99055]">8 Engines</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group relative
                  ${isActive 
                    ? 'bg-[#191512] text-[#F5F0E8] border border-[#D99055] shadow-copper-sm' 
                    : item.special
                      ? 'bg-[#191512]/60 text-[#F5F0E8] border border-[#393027] hover:border-[#D99055]/50 hover:bg-[#191512]'
                      : 'text-[#A89F91] hover:text-[#F5F0E8] hover:bg-[#191512]/50 border border-transparent'}
                `}
              >
                {/* Active Glow Accent Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#D99055] rounded-r-md" />
                )}

                <div className="flex items-center gap-3 min-w-0">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                    ${isActive 
                      ? 'bg-[#D99055] text-[#0B0A09]' 
                      : item.special 
                        ? 'bg-[#F05252]/20 text-[#F05252] group-hover:bg-[#F05252] group-hover:text-white' 
                        : 'bg-[#191512] text-[#A89F91] group-hover:text-[#D99055] group-hover:bg-[#221C18]'}
                  `}>
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  <div className="min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-[#F5F0E8]' : 'text-[#F5F0E8]/90 group-hover:text-[#F5F0E8]'}`}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-[#A89F91] truncate font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Badge if present */}
                {item.badge && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${item.badge.color}`}>
                    {item.badge.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Sidebar: System Telemetry & Mission Security Note */}
        <div className="p-3 border-t border-[#393027] bg-[#14110E] space-y-2">
          <div className="rounded-lg bg-[#191512] p-2.5 border border-[#393027]">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#A89F91] mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#35C98A]" />
                Relief Network Link
              </span>
              <span className="text-[#35C98A] font-bold">100% ONLINE</span>
            </div>
            <div className="w-full bg-[#0B0A09] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#D99055] to-[#35C98A] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, stats.capacityPercentage)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-[#A89F91] mt-1.5">
              <span>Overall Sheltered:</span>
              <span className="text-[#F5F0E8] font-semibold">{stats.totalPopulation.toLocaleString()} souls</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-[10px] text-[#A89F91]/70 font-mono">
            <span>UNHCR / NDMA Advisory Protocol</span>
            <span className="text-[#D99055]">DEMO v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
}
