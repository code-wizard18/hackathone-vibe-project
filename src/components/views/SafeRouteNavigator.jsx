import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  Navigation,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Truck,
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  Car,
  AlertOctagon,
  Info
} from 'lucide-react';

export default function SafeRouteNavigator() {
  const { routes, camps, selectedCampId } = useDisaster();

  const [selectedRouteId, setSelectedRouteId] = useState('RT-1');

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner with Mandatory Disclaimer */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D99055]/20 text-[#D99055] border border-[#D99055]/30">
                Advisory Route Modeling
              </span>
              <span className="text-xs font-mono text-[#F05252] flex items-center gap-1 font-bold">
                <AlertOctagon size={13} />
                Simulated Data Only — Not Live Turn-by-Turn GPS
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F0E8] font-mono">
              Disaster-Safe Routes & Road Obstruction Visualizer
            </h2>
            <p className="text-xs text-[#A89F91] mt-1 max-w-2xl">
              Simulates convoy transit corridors between regional camps and depots. Flags washed-out bridges, mudslides, and flooded passes from field intelligence reports. <strong>Never present simulated routes as verified live turn-by-turn navigation.</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#221C18] border border-[#393027] text-xs font-mono text-[#F5F0E8]">
              Monitored Corridors: <strong className="text-[#D99055]">{routes.length} Active</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Routes Selector (4 cols) & Route Schematic (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Monitored Route List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#393027]">
            <h3 className="text-sm font-bold text-[#F5F0E8] font-mono flex items-center gap-2">
              <Navigation size={16} className="text-[#D99055]" />
              Corridor Status Index
            </h3>
            <span className="text-xs font-mono text-[#A89F91]">Select Corridor</span>
          </div>

          <div className="space-y-3">
            {routes.map(route => {
              const isSelected = selectedRouteId === route.id;
              const isBlocked = route.status === 'ROAD_CLOSED';
              const isCaution = route.safetyRating === 'CAUTION';

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#221C18] border-[#D99055] shadow-copper-sm ring-1 ring-[#D99055]'
                      : 'bg-[#191512] border-[#393027] hover:border-[#D99055]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#D99055]">
                        {route.id}
                      </span>
                      <h4 className="text-xs font-bold text-[#F5F0E8] font-mono mt-0.5">
                        {route.from} ➔ {route.to}
                      </h4>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isBlocked
                        ? 'bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/40'
                        : isCaution
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40'
                    }`}>
                      {route.safetyRating}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A89F91] mt-2 font-mono line-clamp-1">
                    {route.hazardSummary}
                  </p>

                  <div className="mt-3 pt-2 border-t border-[#393027]/60 flex items-center justify-between text-[11px] font-mono text-[#A89F91]">
                    <span>{route.distance}</span>
                    <span>Transit: {route.simulatedDuration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Waypoint Path & Hazard Schematic (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#393027]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F0E8] font-mono">
                    Corridor Simulation: {selectedRoute.from} to {selectedRoute.to}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#221C18] text-[#D99055] border border-[#393027]">
                    {selectedRoute.distance}
                  </span>
                </div>
                <p className="text-xs text-[#A89F91] mt-0.5">
                  Vehicle Clearance: <strong>{selectedRoute.recommendedVehicle}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right font-mono">
                <span className="text-xs font-bold text-[#F5F0E8] block">
                  Simulated Transit: {selectedRoute.simulatedDuration}
                </span>
                <span className="text-[10px] text-[#A89F91]">
                  (Standard baseline: {selectedRoute.standardDuration})
                </span>
              </div>
            </div>

            {/* Mandatory simulated disclaimer notice */}
            <div className="p-3.5 rounded-xl bg-[#F05252]/10 border border-[#F05252]/40 text-xs text-[#F05252] flex items-start gap-2.5">
              <AlertTriangle size={17} className="flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-mono">CRITICAL SAFETY ADVISORY:</strong>
                <p className="text-[11px] text-[#F5F0E8]/90 font-sans mt-0.5 leading-relaxed">
                  {selectedRoute.advisory} Road conditions change unpredictably during disasters. Heavy convoys must confirm with military road clearing teams before departure.
                </p>
              </div>
            </div>

            {/* Visual Waypoints Sequence Schematic */}
            <div>
              <h4 className="text-xs font-bold text-[#F5F0E8] font-mono mb-3 flex items-center gap-1.5">
                <Compass size={14} className="text-[#D99055]" />
                Waypoint Sequence & Segment Hazard Analysis
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#393027]">
                {selectedRoute.waypoints.map((wp, index) => {
                  const isBlocked = wp.status.includes('SUBMERGED') || wp.status.includes('CLOSED');
                  const isDebris = wp.status.includes('DEBRIS') || wp.status.includes('SLOW') || wp.status.includes('FOG');

                  return (
                    <div key={index} className="relative flex items-start gap-3 text-xs font-mono">
                      {/* Node dot */}
                      <span className={`absolute -left-6 sm:-left-8 top-1 w-3.5 h-3.5 rounded-full border-2 border-[#191512] ${
                        isBlocked
                          ? 'bg-[#F05252] shadow-critical-glow ring-2 ring-[#F05252]/50 animate-ping'
                          : isDebris
                            ? 'bg-amber-400 ring-2 ring-amber-400/40'
                            : 'bg-[#35C98A]'
                      }`} />

                      <div className="flex-1 p-3 rounded-xl bg-[#14110E] border border-[#26201A] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#F5F0E8]">
                              {wp.name}
                            </span>
                            <span className="text-[10px] text-[#A89F91]">
                              km {wp.km}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#A89F91] block mt-0.5">
                            Status Profile: {wp.status.replace('_', ' ')}
                          </span>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold self-start sm:self-auto ${
                          isBlocked
                            ? 'bg-[#F05252]/20 text-[#F05252]'
                            : isDebris
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-[#35C98A]/20 text-[#35C98A]'
                        }`}>
                          {wp.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Recommendations Card */}
            <div className="p-4 rounded-xl bg-[#221C18] border border-[#393027] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#D99055]/20 text-[#D99055]">
                  <Car size={20} />
                </div>
                <div>
                  <span className="text-[#A89F91] block">Mandated Transport Classification:</span>
                  <span className="text-[#F5F0E8] font-bold text-sm">{selectedRoute.recommendedVehicle}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#35C98A] font-bold flex items-center gap-1">
                  <ShieldCheck size={14} />
                  Convoy GPS Tracker Ready
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
