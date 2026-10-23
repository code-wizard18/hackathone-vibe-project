import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  Ticket,
  AlertTriangle,
  UserCheck,
  Clock,
  HeartPulse,
  Baby,
  Accessibility,
  Calendar,
  ChevronRight,
  Filter,
  CheckCircle2,
  Stethoscope,
  Info,
  ShieldCheck,
  BellRing
} from 'lucide-react';

export default function PriorityTokenSystem() {
  const { 
    tokens, 
    generatePriorityToken, 
    updateTokenStatus, 
    camps, 
    selectedCampId 
  } = useDisaster();

  // Intake Form State
  const [citizenName, setCitizenName] = useState('');
  const [campId, setCampId] = useState(selectedCampId || 'camp-beta');
  const [serviceNeeded, setServiceNeeded] = useState('Emergency Triage & Resuscitation');
  const [clinicalCondition, setClinicalCondition] = useState('acute_dyspnea');
  const [customClinicalNotes, setCustomClinicalNotes] = useState('');
  const [selectedDemographics, setSelectedDemographics] = useState([]);

  // Queue View Filter
  const [priorityFilter, setPriorityFilter] = useState('ALL'); // 'ALL' | 'P1' | 'P2' | 'P3'
  const [statusFilter, setStatusFilter] = useState('WAITING'); // 'WAITING' | 'IN_SERVICE' | 'COMPLETED' | 'ALL'

  // Pre-configured clinical options
  const clinicalOptions = [
    { id: 'acute_dyspnea', label: 'Acute Dyspnea / Severe Respiratory Distress', acute: true, category: 'Life-Threatening' },
    { id: 'trauma_shock', label: 'Severe Haemorrhage / Crush Trauma / Hypovolemic Shock', acute: true, category: 'Life-Threatening' },
    { id: 'pediatric_shock', label: 'Lethargic Infant / Acute Severe Dehydration', acute: true, category: 'Life-Threatening' },
    { id: 'moderate_fever', label: 'High Spiking Fever & Continuous Vomiting', acute: false, category: 'Urgent' },
    { id: 'wound_infection', label: 'Open Laceration / Suspected Fracture', acute: false, category: 'Urgent' },
    { id: 'chronic_refill', label: 'Stable Chronic Medication Refill (Asthma/Hypertension)', acute: false, category: 'Routine' },
    { id: 'routine_ration', label: 'Standard Nutrition / Hygiene Kit Request', acute: false, category: 'Routine' },
  ];

  const demographicOptions = [
    { id: 'pregnant', label: 'Third-Trimester Pregnancy', icon: Calendar },
    { id: 'infant', label: 'Infant / Toddler (<2 years)', icon: Baby },
    { id: 'elderly', label: 'Elderly Citizen (65+ years)', icon: UserCheck },
    { id: 'disability', label: 'Physical Disability / Wheelchair User', icon: Accessibility },
  ];

  const toggleDemographic = (id) => {
    setSelectedDemographics(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  // Preview computed triage priority in real-time
  const selectedClinicalObj = clinicalOptions.find(c => c.id === clinicalCondition);
  const isAcuteClinical = selectedClinicalObj?.acute || false;
  const hasDemographic = selectedDemographics.length > 0;

  let previewPriority = 'P3';
  let previewReason = 'Standard routine assistance: Non-urgent clinical status and standard demographic profile.';

  if (isAcuteClinical) {
    previewPriority = 'P1';
    previewReason = 'IMMEDIATE EMERGENCY: Severe clinical vital sign criteria met. Assigned to Trauma Bay regardless of demographics.';
  } else if (hasDemographic) {
    previewPriority = 'P2';
    previewReason = 'HIGH PRIORITY: Demographic vulnerability identified without acute life-threat. Fast-tracked for comfort and specialized care.';
  } else if (selectedClinicalObj?.category === 'Urgent') {
    previewPriority = 'P2';
    previewReason = 'HIGH PRIORITY: Urgent non-life-threatening clinical need. Expedited clinic slot.';
  }

  const handleGenerate = (e) => {
    e.preventDefault();

    const demographicLabels = selectedDemographics.map(d => {
      const opt = demographicOptions.find(o => o.id === d);
      return opt ? opt.label : d;
    });

    const clinicalText = customClinicalNotes.trim()
      ? `${selectedClinicalObj?.label || 'Clinical assessment'} - Notes: ${customClinicalNotes.trim()}`
      : selectedClinicalObj?.label || 'Standard assessment';

    generatePriorityToken({
      citizenName: citizenName.trim() || 'Displaced Citizen',
      campId,
      serviceNeeded,
      clinicalUrgency: clinicalText,
      isAcuteLifeThreat: isAcuteClinical,
      demographicFactors: demographicLabels
    });

    // Reset fields
    setCitizenName('');
    setCustomClinicalNotes('');
    setSelectedDemographics([]);
  };

  // Filter tokens
  const filteredTokens = tokens.filter(t => {
    if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) return false;
    if (statusFilter === 'WAITING' && t.status !== 'waiting') return false;
    if (statusFilter === 'IN_SERVICE' && t.status !== 'in-service') return false;
    if (statusFilter === 'COMPLETED' && t.status !== 'completed') return false;
    return true;
  });

  // Current token in service
  const activeInServiceToken = tokens.find(t => t.status === 'in-service');

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40">
                Non-Discriminatory Clinical Triage Engine
              </span>
              <span className="text-xs font-mono text-[#A89F91]">
                WHO Emergency Triage & Triage Scale Standards
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F0E8] font-mono">
              Priority Token Queue Management
            </h2>
            <p className="text-xs text-[#A89F91] mt-1 max-w-2xl">
              Organizes medical and aid distribution into P1 (Immediate Life Threat), P2 (High Priority / Vulnerable Care), and P3 (Standard Queue). Clinical urgency is never conflated with demographics alone: elderly or pregnant individuals are fast-tracked into P2 without erroneously taking P1 trauma resuscitation slots from acute bleeding or cardiac patients.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#14110E] border border-[#393027] flex items-center gap-3">
              <BellRing className="text-[#D99055] animate-pulse" size={20} />
              <div>
                <span className="text-[10px] font-mono uppercase text-[#A89F91] block">
                  Active in Treatment Bay
                </span>
                <span className="text-xs font-mono font-bold text-[#F5F0E8]">
                  {activeInServiceToken ? `${activeInServiceToken.tokenNumber} (${activeInServiceToken.assignedBay})` : 'Bay Ready for Next'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form (5 cols) & Live Callboard (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Triage Intake Form */}
        <div className="lg:col-span-5 bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#393027]">
            <Ticket className="text-[#D99055]" size={18} />
            <h3 className="text-sm font-bold text-[#F5F0E8] font-mono">
              Citizen Triage Intake & Token Issuer
            </h3>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs font-mono">
            {/* Citizen Name & Camp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[#A89F91] block mb-1">
                  Citizen / Rep Name:
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="e.g. Meena Devi"
                  className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#A89F91] block mb-1">
                  Relief Camp:
                </label>
                <select
                  value={campId}
                  onChange={(e) => setCampId(e.target.value)}
                  className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none cursor-pointer"
                >
                  {camps.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name.split('(')[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Requested */}
            <div>
              <label className="text-[#A89F91] block mb-1">
                Relief Service Area:
              </label>
              <select
                value={serviceNeeded}
                onChange={(e) => setServiceNeeded(e.target.value)}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none cursor-pointer"
              >
                <option value="Emergency Triage & Resuscitation">Emergency Trauma / Resuscitation</option>
                <option value="Pediatric Shock / Oral Rehydration">Pediatric Clinic & Rehydration</option>
                <option value="Maternal & Prenatal Health">Maternal Health & Midwifery</option>
                <option value="Chronic Disease & Pharmacy">Pharmacy & Chronic Medication</option>
                <option value="Wound Care & Dressing">Wound Care / Infection Prevention</option>
                <option value="General Supplies & Nutrition">General Rations & Supplies</option>
              </select>
            </div>

            {/* Clinical Condition (Clinical Criteria) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[#A89F91]">
                  Clinical Condition (Primary Clinical Assessment):
                </label>
                <span className="text-[10px] text-[#35C98A]">Determines P1 Eligibility</span>
              </div>
              <select
                value={clinicalCondition}
                onChange={(e) => setClinicalCondition(e.target.value)}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2.5 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none cursor-pointer font-bold"
              >
                {clinicalOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    [{opt.category.toUpperCase()}] {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Doctor / Field notes */}
            <div>
              <label className="text-[#A89F91] block mb-1">
                Clinical Observation / Vitals Note:
              </label>
              <input
                type="text"
                value={customClinicalNotes}
                onChange={(e) => setCustomClinicalNotes(e.target.value)}
                placeholder="e.g. SpO2 86%, pulse 135 bpm, active wheezing"
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none"
              />
            </div>

            {/* Demographic Vulnerability Checkboxes */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[#A89F91]">
                  Vulnerability & Demographics (Assigns P2 if non-acute):
                </label>
                <span className="text-[10px] text-[#A89F91]">Fast-Tracks Care</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {demographicOptions.map(opt => {
                  const isChecked = selectedDemographics.includes(opt.id);
                  const Icon = opt.icon;

                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => toggleDemographic(opt.id)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                        isChecked
                          ? 'bg-[#221C18] border-[#D99055] text-[#F5F0E8] shadow-copper-sm'
                          : 'bg-[#14110E] border-[#393027] text-[#A89F91] hover:text-[#F5F0E8]'
                      }`}
                    >
                      <Icon size={14} className={isChecked ? 'text-[#D99055]' : ''} />
                      <span className="text-[11px] truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Real-time Triage Logic Explanation Box */}
            <div className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
              previewPriority === 'P1'
                ? 'bg-[#F05252]/10 border-[#F05252]/40 text-[#F05252]'
                : previewPriority === 'P2'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                  : 'bg-[#221C18] border-[#393027] text-[#A89F91]'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <Stethoscope size={14} />
                  Computed Triage Level:
                </span>
                <span className="px-2 py-0.5 rounded text-xs uppercase font-mono font-extrabold bg-[#0B0A09]">
                  {previewPriority}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#F5F0E8]/90">
                {previewReason}
              </p>
            </div>

            {/* Generate Token CTA */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D99055] to-[#B87239] text-[#0B0A09] font-bold font-mono text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] shadow-copper-sm transition-all"
            >
              <Ticket size={16} />
              <span>ISSUE PRIORITY QUEUE TOKEN</span>
            </button>
          </form>
        </div>

        {/* Live Callboard & Queue Management (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#191512] border border-[#393027]">
            {/* Priority filter */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-[#A89F91] mr-1">Priority:</span>
              {[
                { id: 'ALL', label: 'All' },
                { id: 'P1', label: 'P1 Emergency' },
                { id: 'P2', label: 'P2 High' },
                { id: 'P3', label: 'P3 Standard' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPriorityFilter(p.id)}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    priorityFilter === p.id
                      ? p.id === 'P1'
                        ? 'bg-[#F05252] text-white font-bold'
                        : p.id === 'P2'
                          ? 'bg-amber-500 text-[#0B0A09] font-bold'
                          : 'bg-[#D99055] text-[#0B0A09] font-bold'
                      : 'bg-[#14110E] text-[#A89F91] hover:text-[#F5F0E8]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-1 text-xs font-mono">
              {['WAITING', 'IN_SERVICE', 'COMPLETED', 'ALL'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 rounded-lg text-[11px] ${
                    statusFilter === st
                      ? 'bg-[#221C18] text-[#F5F0E8] border border-[#393027] font-bold'
                      : 'text-[#A89F91] hover:text-[#F5F0E8]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Tokens List */}
          <div className="space-y-3">
            {filteredTokens.length === 0 ? (
              <div className="rounded-2xl bg-[#191512] border border-[#393027] p-12 text-center text-xs font-mono text-[#A89F91]">
                No tokens currently match the selected priority and status filters.
              </div>
            ) : (
              filteredTokens.map((tok) => {
                const isP1 = tok.priority === 'P1';
                const isP2 = tok.priority === 'P2';
                const isWaiting = tok.status === 'waiting';
                const inService = tok.status === 'in-service';

                return (
                  <div
                    key={tok.id}
                    className={`rounded-2xl border p-4.5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      inService
                        ? 'bg-[#221C18] border-[#35C98A] shadow-emerald-glow'
                        : isP1
                          ? 'bg-[#191512] border-[#F05252]/60 shadow-critical-glow'
                          : isP2
                            ? 'bg-[#191512] border-amber-500/40'
                            : 'bg-[#191512] border-[#393027]'
                    }`}
                  >
                    {/* Left: Token Identifier & Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Token Badge */}
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold font-mono tracking-wider ${
                          isP1
                            ? 'bg-[#F05252] text-white shadow-critical-glow animate-pulse'
                            : isP2
                              ? 'bg-amber-500 text-[#0B0A09]'
                              : 'bg-[#221C18] text-[#D99055] border border-[#D99055]/30'
                        }`}>
                          {tok.tokenNumber}
                        </span>

                        <span className="text-xs font-bold text-[#F5F0E8] font-mono">
                          {tok.citizenName}
                        </span>

                        <span className="text-[10px] font-mono text-[#A89F91] border-l border-[#393027] pl-2">
                          Issued {tok.createdAt}
                        </span>

                        {inService && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#35C98A] animate-ping" />
                            NOW IN BAY
                          </span>
                        )}
                      </div>

                      {/* Clinical Urgency & Service */}
                      <div>
                        <p className="text-xs text-[#F5F0E8] font-medium">
                          {tok.serviceNeeded}
                        </p>
                        <p className="text-[11px] text-[#A89F91] mt-0.5 font-mono">
                          {tok.clinicalUrgency}
                        </p>
                      </div>

                      {/* Demographic & Bay Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#14110E] text-[#D99055] border border-[#393027]">
                          📍 {tok.assignedBay}
                        </span>

                        {tok.demographicFactors && tok.demographicFactors.map((df, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#221C18] text-[#F5F0E8] border border-[#393027]">
                            {df}
                          </span>
                        ))}
                      </div>

                      <p className="text-[10px] text-[#A89F91]/70 font-mono italic">
                        {tok.triageNotes}
                      </p>
                    </div>

                    {/* Right: Wait Time & Action Controls */}
                    <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-[#393027]">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] font-mono uppercase text-[#A89F91] block">
                          Est. Wait Time
                        </span>
                        <div className="flex items-center gap-1 text-sm font-bold font-mono text-[#F5F0E8]">
                          <Clock size={13} className="text-[#D99055]" />
                          <span>{isWaiting ? `${tok.estimatedWaitMinutes} mins` : inService ? 'In Treatment' : 'Finished'}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        {isWaiting && (
                          <button
                            onClick={() => updateTokenStatus(tok.id, 'in-service')}
                            className="px-3 py-1.5 rounded-lg bg-[#35C98A] text-[#0B0A09] text-xs font-mono font-bold hover:brightness-110 flex items-center gap-1"
                          >
                            <span>Call to Bay</span>
                            <ChevronRight size={13} />
                          </button>
                        )}

                        {inService && (
                          <button
                            onClick={() => updateTokenStatus(tok.id, 'completed')}
                            className="px-3 py-1.5 rounded-lg bg-[#221C18] border border-[#35C98A] text-[#35C98A] text-xs font-mono font-bold hover:bg-[#35C98A] hover:text-[#0B0A09] flex items-center gap-1"
                          >
                            <CheckCircle2 size={13} />
                            <span>Mark Complete</span>
                          </button>
                        )}

                        {tok.status === 'completed' && (
                          <span className="text-xs font-mono text-[#35C98A] flex items-center gap-1">
                            <CheckCircle2 size={13} />
                            Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
