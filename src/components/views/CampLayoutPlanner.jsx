import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  Compass,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Droplets,
  HeartPulse,
  Home,
  Utensils,
  Box,
  LogOut,
  Maximize2,
  RefreshCw,
  FileCheck,
  Info,
  MapPin,
  Lock,
  Unlock
} from 'lucide-react';
import { LAYOUT_ZONES_CONFIG } from '../../data/initialData';

export default function CampLayoutPlanner() {
  const { 
    camps, 
    selectedCampId, 
    setSelectedCampId, 
    plannerState, 
    updatePlannerState, 
    approveCampLayoutPlan 
  } = useDisaster();

  const currentCamp = camps.find(c => c.id === selectedCampId) || camps[0];

  // Parameters
  const [terrain, setTerrain] = useState(currentCamp.terrain || 'flat');
  const [floodRisk, setFloodRisk] = useState(currentCamp.floodRisk || 'high');
  const [areaSqMeters, setAreaSqMeters] = useState(currentCamp.areaSqMeters || 35000);
  const [roadAccess, setRoadAccess] = useState(currentCamp.roadAccess || 'gravel');

  // Human approval form state
  const [officerName, setOfficerName] = useState(plannerState.officerSignOffName || 'Capt. R. Deshmukh (Command Relief Lead)');
  const [selectedZoneDetail, setSelectedZoneDetail] = useState(LAYOUT_ZONES_CONFIG[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Generate dynamic hazards based on inputs
  const computeHazards = (terr, flood, road) => {
    const hazards = [];
    if (flood === 'high') {
      hazards.push({
        id: 'h_flood',
        severity: 'CRITICAL',
        title: 'High Inundation & Flash Flood Hazard',
        desc: 'Family sleeping modules must be positioned on higher ground (>30m contour) or mounted on gravel berms with 1.5m perimeter drainage culverts.'
      });
    }
    if (terr === 'marsh' || terr === 'slope') {
      hazards.push({
        id: 'h_latrine',
        severity: 'HIGH',
        title: 'Water Table & Latrine Proximity Conflict',
        desc: 'Sphere Standards require toilets to be at least 30m downwind and downhill from water extraction stations to avert cholera and water table leaching.'
      });
    }
    if (road === 'dirt' || road === 'obstructed') {
      hazards.push({
        id: 'h_logistics',
        severity: 'HIGH',
        title: 'Emergency Evacuation & Supply Bottleneck',
        desc: 'Road access is rated obstructed/dirt. Logistics warehouse and medical triage must have an unblocked 12m perimeter evacuation corridor.'
      });
    }
    if (terr === 'rocky') {
      hazards.push({
        id: 'h_stakes',
        severity: 'MODERATE',
        title: 'Hard Subsurface Pegging Difficulty',
        desc: 'Rocky substrate will impair standard tent stakes. Heavy aggregate sandbags required for tensioning family living tents.'
      });
    }

    hazards.push({
      id: 'h_general',
      severity: 'ADVISORY',
      title: 'Human Validation Imperative',
      desc: 'All coordinates and zone partitions are AI-simulated mathematical approximations. On-ground surveying by military/NDRF field engineers is mandatory.'
    });

    return hazards;
  };

  const dynamicHazards = computeHazards(terrain, floodRisk, roadAccess);

  const handleSimulateLayout = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      updatePlannerState({
        campId: currentCamp.id,
        terrain,
        floodRisk,
        areaSqMeters,
        roadAccess,
        approvedByOfficer: false,
        officerSignOffName: '',
        hazardsFlagged: dynamicHazards
      });
    }, 600);
  };

  const handleApprove = (e) => {
    e.preventDefault();
    approveCampLayoutPlan(officerName);
  };

  // Mock layout cells for schematic visualization
  const layoutSchematic = [
    { zoneId: 'storage', row: '1', col: '1/3', label: 'Logistics Warehouse & Depots', area: '4,500 m²', icon: Box, color: '#A855F7', border: 'border-purple-500/50', bg: 'bg-purple-500/10' },
    { zoneId: 'exit', row: '1', col: '3/5', label: 'North Evacuation Gate & Helipad', area: '6,000 m²', icon: LogOut, color: '#35C98A', border: 'border-[#35C98A]/50', bg: 'bg-[#35C98A]/10' },
    { zoneId: 'triage', row: '2', col: '1/3', label: 'Medical & Triage Hospital Bay', area: '5,000 m²', icon: HeartPulse, color: '#F05252', border: 'border-[#F05252]/50', bg: 'bg-[#F05252]/10' },
    { zoneId: 'water', row: '2', col: '3/5', label: 'Water Treatment & Bladder Station', area: '3,800 m²', icon: Droplets, color: '#38BDF8', border: 'border-sky-500/50', bg: 'bg-sky-500/10' },
    { zoneId: 'kitchen', row: '3', col: '1/2', label: 'Community Kitchen & Rations', area: '3,200 m²', icon: Utensils, color: '#D99055', border: 'border-[#D99055]/50', bg: 'bg-[#D99055]/10' },
    { zoneId: 'sleeping', row: '3', col: '2/4', label: 'Family Sleeping Tents (Sector A-D)', area: '14,000 m²', icon: Home, color: '#A89F91', border: 'border-[#A89F91]/50', bg: 'bg-[#A89F91]/10' },
    { zoneId: 'toilets', row: '3', col: '4/5', label: 'Downhill Latrines & Soak Pits', area: '2,500 m²', icon: ShieldAlert, color: '#EAB308', border: 'border-amber-500/50', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D99055]/20 text-[#D99055] border border-[#D99055]/30">
                AI Site Engineering Engine
              </span>
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                <AlertTriangle size={13} />
                Requires Field Officer Sign-off
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F0E8] font-mono">
              AI Camp Layout Planner
            </h2>
            <p className="text-xs text-[#A89F91] mt-1 max-w-2xl">
              Synthesizes terrain topography, flood hazard modeling, and access roads to generate Sphere-compliant site plans with 7 core humanitarian zones. All recommendations are explicitly simulated and require certified human officer approval.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedCampId}
              onChange={(e) => {
                setSelectedCampId(e.target.value);
                const cp = camps.find(c => c.id === e.target.value);
                if (cp) {
                  setTerrain(cp.terrain);
                  setFloodRisk(cp.floodRisk);
                  setAreaSqMeters(cp.areaSqMeters);
                  setRoadAccess(cp.roadAccess);
                }
              }}
              className="bg-[#221C18] text-[#F5F0E8] text-xs px-3 py-2 rounded-xl border border-[#D99055] font-mono font-bold cursor-pointer"
            >
              {camps.map(camp => (
                <option key={camp.id} value={camp.id}>
                  {camp.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters & Hazard Rules (4 cols) + Interactive Schematic (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Environmental Parameters & Approval (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Site Parameters Form */}
          <div className="bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl space-y-4 text-xs font-mono">
            <div className="flex items-center gap-2 pb-2 border-b border-[#393027]">
              <Compass size={17} className="text-[#D99055]" />
              <h3 className="text-sm font-bold text-[#F5F0E8]">
                Site Topography Parameters
              </h3>
            </div>

            {/* Terrain Selection */}
            <div>
              <label className="text-[#A89F91] block mb-1">
                Terrain Substrate:
              </label>
              <select
                value={terrain}
                onChange={(e) => setTerrain(e.target.value)}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none cursor-pointer"
              >
                <option value="flat">Flat Plain (Good drainage potential)</option>
                <option value="slope">Sloped Hillside (Gravity drainage, runoff risk)</option>
                <option value="marsh">Marshland / Low Delta (High water table)</option>
                <option value="rocky">Rocky Ridge (Low drainage, hard anchoring)</option>
              </select>
            </div>

            {/* Flood Risk */}
            <div>
              <label className="text-[#A89F91] block mb-1">
                Hydro-Meteorological Flood Risk:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map(risk => (
                  <button
                    type="button"
                    key={risk}
                    onClick={() => setFloodRisk(risk)}
                    className={`py-1.5 rounded-lg border text-center uppercase font-bold transition-all ${
                      floodRisk === risk
                        ? risk === 'high'
                          ? 'bg-[#F05252]/20 border-[#F05252] text-[#F05252]'
                          : risk === 'medium'
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : 'bg-[#35C98A]/20 border-[#35C98A] text-[#35C98A]'
                        : 'bg-[#14110E] border-[#393027] text-[#A89F91]'
                    }`}
                  >
                    {risk}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Area */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[#A89F91]">Available Usable Area:</label>
                <span className="text-[#F5F0E8] font-bold">{areaSqMeters.toLocaleString()} m²</span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={areaSqMeters}
                onChange={(e) => setAreaSqMeters(Number(e.target.value))}
                className="w-full accent-[#D99055] cursor-pointer"
              />
              <span className="text-[10px] text-[#A89F91]">
                Sphere standard recommends 45 m² total camp area per sheltered person.
              </span>
            </div>

            {/* Road Access */}
            <div>
              <label className="text-[#A89F91] block mb-1">Road & Convoy Access:</label>
              <select
                value={roadAccess}
                onChange={(e) => setRoadAccess(e.target.value)}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none cursor-pointer"
              >
                <option value="paved">Paved Highway (All heavy bowsers & trailers)</option>
                <option value="gravel">Gravel Arterial (4x4 & light trucks)</option>
                <option value="dirt">Dirt Road (Vulnerable to mud collapse)</option>
                <option value="obstructed">Partially Obstructed / Debris Blocked</option>
              </select>
            </div>

            {/* Re-simulate Button */}
            <button
              type="button"
              onClick={handleSimulateLayout}
              disabled={isSimulating}
              className="w-full py-2.5 rounded-xl bg-[#221C18] border border-[#D99055] text-[#D99055] font-bold hover:bg-[#D99055] hover:text-[#0B0A09] flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
              <span>{isSimulating ? 'Re-calculating Site Grids...' : 'OPTIMIZE SIMULATED PLAN'}</span>
            </button>
          </div>

          {/* Mandatory Human Approval & Sign-off Card */}
          <div className={`border rounded-2xl p-5 shadow-2xl space-y-3 font-mono text-xs transition-all ${
            plannerState.approvedByOfficer 
              ? 'bg-[#191512] border-[#35C98A] shadow-emerald-glow' 
              : 'bg-[#191512] border-amber-500/60 shadow-copper-sm'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-[#393027]">
              <span className="font-bold flex items-center gap-1.5 text-[#F5F0E8]">
                {plannerState.approvedByOfficer ? <Lock size={15} className="text-[#35C98A]" /> : <Unlock size={15} className="text-amber-400" />}
                Field Officer Sign-Off Protocol
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                plannerState.approvedByOfficer 
                  ? 'bg-[#35C98A]/20 text-[#35C98A]' 
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {plannerState.approvedByOfficer ? 'CERTIFIED' : 'PENDING APPROVAL'}
              </span>
            </div>

            {plannerState.approvedByOfficer ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#14110E] border border-[#35C98A]/40 text-[#35C98A] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 size={15} />
                    <span>CERTIFIED HUMAN APPROVAL LOGGED</span>
                  </div>
                  <p className="text-[11px] text-[#F5F0E8]">
                    Officer: <strong>{plannerState.officerSignOffName}</strong>
                  </p>
                  <p className="text-[10px] text-[#A89F91]">
                    Signed: {plannerState.approvedAt} • Simulated layout authorized for construction.
                  </p>
                </div>
                <button
                  onClick={() => updatePlannerState({ approvedByOfficer: false })}
                  className="text-[11px] text-[#D99055] hover:underline"
                >
                  Unlock & Re-open Layout Revisions
                </button>
              </div>
            ) : (
              <form onSubmit={handleApprove} className="space-y-3">
                <p className="text-[11px] text-[#A89F91] leading-relaxed">
                  <strong>Mandatory Requirement:</strong> To prevent unsafe deployments, an operational field lead must inspect the layout schematic and sign off.
                </p>
                <div>
                  <label className="text-[#A89F91] block mb-1">
                    Field Commander / NDRF Engineer Name:
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    placeholder="e.g. Maj. K. Sen (Relief Commander)"
                    className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#35C98A] text-[#0B0A09] font-bold hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <FileCheck size={15} />
                  <span>CERTIFY & APPROVE LAYOUT PLAN</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Column: Visual Mock Site Schematic & Hazard Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Visual Mock Site Plan Interactive Grid */}
          <div className="bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#393027]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F0E8] font-mono">
                    Visual Mock Site Plan: {currentCamp.name.split('(')[0]}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D99055]/15 text-[#D99055] border border-[#D99055]/30">
                    SIMULATED LAYOUT
                  </span>
                </div>
                <p className="text-xs text-[#A89F91] mt-0.5">
                  Click any zone to inspect zoning dimensions, Sphere standards, and isolation buffers.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#A89F91]">
                <span>Scale: 1:2500</span>
                <span>• North ↑</span>
              </div>
            </div>

            {/* Interactive Grid Schematic Visualizer */}
            <div className="p-4 rounded-xl bg-[#0B0A09] border border-[#26201A] relative min-h-[380px] bg-grid-pattern flex flex-col justify-between">
              
              {/* Compass Rose */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#191512]/90 border border-[#393027] text-[10px] font-mono text-[#A89F91] flex items-center gap-1 z-10">
                <span>N</span>
                <span className="text-[#D99055]">▲</span>
              </div>

              {/* Grid Layout of Zones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {layoutSchematic.map((zone) => {
                  const Icon = zone.icon;
                  const isSelected = selectedZoneDetail?.id === zone.zoneId;

                  return (
                    <div
                      key={zone.zoneId}
                      onClick={() => {
                        const found = LAYOUT_ZONES_CONFIG.find(z => z.id === zone.zoneId);
                        if (found) setSelectedZoneDetail(found);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${zone.bg} ${zone.border} ${
                        isSelected ? 'ring-2 ring-white scale-[1.02]' : 'hover:scale-[1.01]'
                      } ${zone.zoneId === 'sleeping' ? 'sm:col-span-2' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon size={18} style={{ color: zone.color }} />
                        <span className="text-[10px] font-mono text-[#A89F91]">
                          {zone.area}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-[#F5F0E8] font-mono leading-tight">
                        {zone.label}
                      </h4>

                      <div className="mt-2 text-[10px] font-mono text-[#A89F91] flex items-center justify-between">
                        <span>Zone #{zone.zoneId.toUpperCase()}</span>
                        <span className="text-white/80">Inspect →</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Perimeter Safety Buffer & Drainage Channel */}
              <div className="mt-4 pt-3 border-t border-dashed border-[#393027] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#A89F91]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35C98A]" />
                  <span>12m Cleared Perimeter Perimeter & Ring Drainage Ditch</span>
                </div>
                <span className="text-[#D99055]">
                  Elevation Gradient: Downhill Slope Towards Sector 4 Latrines
                </span>
              </div>
            </div>

            {/* Selected Zone Deep Dive Spec Drawer */}
            {selectedZoneDetail && (
              <div className="p-4 rounded-xl bg-[#14110E] border border-[#393027] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#F5F0E8] font-mono flex items-center gap-2">
                    <Info size={14} className="text-[#D99055]" />
                    <span>Zone Specifications: {selectedZoneDetail.name}</span>
                  </h4>
                  <span className="text-[10px] font-mono text-[#D99055]">
                    Standard Safety Buffer: {selectedZoneDetail.defaultMinDistanceToToiletsMeters}m from latrines
                  </span>
                </div>
                <p className="text-xs text-[#A89F91]">
                  {selectedZoneDetail.description}. Built with reinforced weather resistant framing and independent backup solar-battery lighting.
                </p>
              </div>
            )}
          </div>

          {/* Flagged Hazards & Safety Recommendations Feed */}
          <div className="bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#F5F0E8] font-mono flex items-center gap-2">
                <ShieldAlert size={16} className="text-[#F05252]" />
                Automated Site Hazard Evaluation
              </h3>
              <span className="text-xs font-mono text-[#F05252] font-bold">
                {dynamicHazards.length} Flags Detected
              </span>
            </div>

            <div className="space-y-2.5">
              {dynamicHazards.map((h, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                    h.severity === 'CRITICAL'
                      ? 'bg-[#F05252]/10 border-[#F05252]/40 text-[#F05252]'
                      : h.severity === 'HIGH'
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                        : 'bg-[#221C18] border-[#393027] text-[#A89F91]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle size={13} />
                      {h.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0B0A09]">
                      {h.severity}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#F5F0E8]/90 font-sans">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
