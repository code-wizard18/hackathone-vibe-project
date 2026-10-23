import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  Radio,
  AlertOctagon,
  Clock,
  ShieldAlert,
  Send,
  CheckCircle2,
  AlertTriangle,
  Users,
  Compass,
  FileText,
  Activity,
  RefreshCw,
  PhoneCall,
  Satellite
} from 'lucide-react';

export default function SilentCampDetector() {
  const { 
    camps, 
    silentIncidents, 
    triggerCampVerification, 
    restoreCampTelemetry, 
    volunteers 
  } = useDisaster();

  const [selectedIncidentCampId, setSelectedIncidentCampId] = useState('camp-delta');
  const [operatorCallNotes, setOperatorCallNotes] = useState('');

  const currentIncident = silentIncidents.find(inc => inc.campId === selectedIncidentCampId) || silentIncidents[0];
  const targetCamp = camps.find(c => c.id === selectedIncidentCampId);

  // Available nearby verified volunteers for field dispatch
  const nearbyVolunteers = volunteers.filter(v => v.verifiedBadge && v.status === 'available');

  const handleTriggerVerification = (method) => {
    triggerCampVerification(selectedIncidentCampId, method);
  };

  const handleRestoreTelemetry = () => {
    restoreCampTelemetry(selectedIncidentCampId);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner with Strict Humanitarian Axiom */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/40 flex items-center gap-1">
                <AlertOctagon size={13} className="animate-pulse" />
                Emergency Telemetry Loss Monitor
              </span>
              <span className="text-xs font-mono text-[#35C98A]">
                Fail-Safe Protocol Active
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F0E8] font-mono">
              Silent Camp & Stale Telemetry Detector
            </h2>
            <p className="text-xs text-[#A89F91] mt-1 max-w-2xl">
              Monitors automated telemetry pings, scheduled check-ins, and delivery handshakes. If a camp goes silent, the protocol strictly triggers active human verification and UAV sweeps — <strong>missing communications must NEVER be misconstrued as an empty or abandoned camp.</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#221C18] px-3.5 py-2 rounded-xl border border-[#393027] text-xs font-mono">
            <Radio className="text-[#F05252] animate-pulse" size={16} />
            <span className="text-[#A89F91]">Silent Outposts:</span>
            <span className="text-[#F05252] font-bold">{silentIncidents.filter(i => i.status !== 'COMMUNICATION_RESTORED').length}</span>
          </div>
        </div>
      </div>

      {/* Incidents Selection Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {silentIncidents.map(inc => {
          const isSelected = selectedIncidentCampId === inc.campId;
          const isRestored = inc.status === 'COMMUNICATION_RESTORED';

          return (
            <button
              key={inc.campId}
              onClick={() => setSelectedIncidentCampId(inc.campId)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#221C18] border-[#D99055] shadow-copper-sm ring-1 ring-[#D99055]'
                  : 'bg-[#191512] border-[#393027] hover:border-[#D99055]/40 text-[#A89F91]'
              }`}
            >
              <div className={`p-2 rounded-xl ${
                isRestored
                  ? 'bg-[#35C98A]/20 text-[#35C98A]'
                  : inc.status === 'CRITICAL_SILENCE'
                    ? 'bg-[#F05252]/20 text-[#F05252] animate-pulse'
                    : 'bg-amber-500/20 text-amber-400'
              }`}>
                <Radio size={16} />
              </div>

              <div>
                <span className="text-xs font-bold text-[#F5F0E8] font-mono block">
                  {inc.campName.split('(')[0]}
                </span>
                <span className={`text-[10px] font-mono ${
                  isRestored ? 'text-[#35C98A]' : inc.status === 'CRITICAL_SILENCE' ? 'text-[#F05252]' : 'text-amber-400'
                }`}>
                  {isRestored ? 'Telemetry Restored' : `Silent ${inc.lastCheckIn} (${inc.missedCheckins} missed)`}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Incident Details (7 cols) + Action Verification Center (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Incident Telemetry & Audit Logs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#393027]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#F5F0E8] font-mono">
                    Incident Profile: {currentIncident.campName}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    currentIncident.status === 'COMMUNICATION_RESTORED'
                      ? 'bg-[#35C98A]/20 text-[#35C98A]'
                      : 'bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/40'
                  }`}>
                    {currentIncident.status}
                  </span>
                </div>
                <p className="text-xs text-[#A89F91] mt-0.5">
                  Commander: {targetCamp?.commander || 'Unassigned'} • Sheltering: {targetCamp?.population.toLocaleString()} souls
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs font-bold text-[#F05252]">
                  {currentIncident.lastCheckIn}
                </span>
                <span className="text-[10px] text-[#A89F91] block">
                  Last verified ping
                </span>
              </div>
            </div>

            {/* Diagnostic telemetry telemetry cards */}
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#14110E] border border-[#26201A]">
                <span className="text-[10px] text-[#A89F91] uppercase block">Packet Loss Rate</span>
                <span className="text-lg font-bold text-[#F05252] mt-1 block">
                  {currentIncident.telemetryPacketLoss}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#14110E] border border-[#26201A]">
                <span className="text-[10px] text-[#A89F91] uppercase block">Missed Heartbeats</span>
                <span className="text-lg font-bold text-amber-400 mt-1 block">
                  {currentIncident.missedCheckins} Intervals
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#14110E] border border-[#26201A]">
                <span className="text-[10px] text-[#A89F91] uppercase block">Verification Status</span>
                <span className="text-xs font-bold text-[#35C98A] mt-1 block truncate">
                  {currentIncident.verificationStatus}
                </span>
              </div>
            </div>

            {/* Strict Axiom Callout */}
            <div className="p-3.5 rounded-xl bg-[#F05252]/10 border border-[#F05252]/40 text-xs text-[#F05252] flex items-start gap-2.5">
              <ShieldAlert size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-mono">HUMANITARIAN INTEGRITY DIRECTIVE:</strong>
                <p className="text-[11px] text-[#F5F0E8]/90 font-sans mt-0.5 leading-relaxed">
                  {currentIncident.operatorNotes}
                </p>
              </div>
            </div>

            {/* Last Known Status Report */}
            <div className="p-3.5 rounded-xl bg-[#221C18] border border-[#393027] text-xs font-mono space-y-1">
              <span className="text-[#D99055] font-bold block">
                Last Telemetry Packet Intercept:
              </span>
              <p className="text-[#F5F0E8] font-sans">
                "{currentIncident.lastKnownStatus}"
              </p>
            </div>

            {/* Verification Activity Audit Logs */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-[#F5F0E8] font-mono flex items-center gap-1.5">
                <FileText size={14} className="text-[#D99055]" />
                Verification Audit Trail & Event Chronology
              </h4>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {currentIncident.logs.map((log, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-lg bg-[#14110E] border border-[#26201A] flex items-start gap-3 text-xs font-mono"
                  >
                    <span className="text-[#D99055] font-bold whitespace-nowrap">
                      {log.time}
                    </span>
                    <span className="text-[#A89F91] leading-relaxed">
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right: Operational Verification Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl space-y-4 font-mono text-xs">
            <div className="pb-3 border-b border-[#393027]">
              <h3 className="text-sm font-bold text-[#F5F0E8] flex items-center gap-2">
                <Satellite size={17} className="text-[#D99055]" />
                Trigger Field Verification
              </h3>
              <p className="text-[11px] text-[#A89F91] mt-0.5">
                Dispatch redundant confirmation channels to establish status
              </p>
            </div>

            {/* Action 1: HAM / VHF Radio Relay */}
            <div className="p-3.5 rounded-xl bg-[#14110E] border border-[#26201A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F5F0E8] flex items-center gap-2">
                  <PhoneCall size={14} className="text-[#D99055]" />
                  Channel 8 VHF Emergency Broadcast
                </span>
                <span className="text-[10px] text-[#35C98A]">Fastest</span>
              </div>
              <p className="text-[11px] text-[#A89F91]">
                Transmit automated distress polling bursts across military VHF 144.200 MHz and repeater nodes.
              </p>
              <button
                onClick={() => handleTriggerVerification('VHF / HAM Radio Relay Ping (Ch. 8)')}
                className="w-full py-2 rounded-lg bg-[#221C18] border border-[#D99055] text-[#D99055] font-bold hover:bg-[#D99055] hover:text-[#0B0A09] transition-all"
              >
                Transmit Emergency Radio Ping
              </button>
            </div>

            {/* Action 2: Nearby Volunteer Dispatch */}
            <div className="p-3.5 rounded-xl bg-[#14110E] border border-[#26201A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F5F0E8] flex items-center gap-2">
                  <Users size={14} className="text-[#35C98A]" />
                  Dispatch Nearby Verified Volunteer
                </span>
                <span className="text-[10px] text-[#D99055]">Ground Check</span>
              </div>
              <p className="text-[11px] text-[#A89F91]">
                Alert closest verified civilian volunteer ({nearbyVolunteers[0]?.name || 'Volunteer Unit'}) to conduct on-site physical welfare check.
              </p>
              <button
                onClick={() => handleTriggerVerification(`Volunteer Dispatch: ${nearbyVolunteers[0]?.name || 'Field Scout'}`)}
                className="w-full py-2 rounded-lg bg-[#35C98A]/20 border border-[#35C98A] text-[#35C98A] font-bold hover:bg-[#35C98A] hover:text-[#0B0A09] transition-all"
              >
                Dispatch Volunteer Scout
              </button>
            </div>

            {/* Action 3: Drone Reconnaissance Flight */}
            <div className="p-3.5 rounded-xl bg-[#14110E] border border-[#26201A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F5F0E8] flex items-center gap-2">
                  <Satellite size={14} className="text-sky-400" />
                  Deploy UAV Drone Reconnaissance
                </span>
                <span className="text-[10px] text-sky-400">Aerial Intel</span>
              </div>
              <p className="text-[11px] text-[#A89F91]">
                Launch automated survey drone from central depot to capture live video of perimeter berms and solar arrays.
              </p>
              <button
                onClick={() => handleTriggerVerification('UAV Drone Reconnaissance Flight (Mission Drone-3)')}
                className="w-full py-2 rounded-lg bg-sky-500/20 border border-sky-500 text-sky-400 font-bold hover:bg-sky-500 hover:text-[#0B0A09] transition-all"
              >
                Launch UAV Flight Path
              </button>
            </div>

            {/* Action 4: Restore Telemetry Simulation */}
            <div className="pt-2 border-t border-[#393027]">
              <button
                onClick={handleRestoreTelemetry}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D99055] to-[#B87239] text-[#0B0A09] font-bold hover:brightness-110 flex items-center justify-center gap-2 shadow-copper-sm"
              >
                <CheckCircle2 size={15} />
                <span>SIMULATE TELEMETRY RESTORATION</span>
              </button>
              <span className="text-[10px] text-[#A89F91] text-center block mt-1.5">
                Simulates successful signal handshake and resets silent timers.
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
