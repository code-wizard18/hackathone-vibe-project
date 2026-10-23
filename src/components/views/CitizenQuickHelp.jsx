import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  Utensils,
  Home,
  HeartPulse,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  AlertTriangle,
  ArrowLeft,
  Shield,
  LifeBuoy,
  Sparkles,
  Users
} from 'lucide-react';

export default function CitizenQuickHelp() {
  const { camps, submitCitizenQuickHelp, citizenRequests, selectedCampId } = useDisaster();

  // Wizard state: 'SELECT' | 'FORM' | 'CONFIRMATION'
  const [step, setStep] = useState('SELECT');
  const [selectedType, setSelectedType] = useState('FOOD'); // 'FOOD' | 'SHELTER' | 'MEDICAL'

  // Form fields (simple & low literacy friendly)
  const [campId, setCampId] = useState(selectedCampId || 'camp-beta');
  const [locationNote, setLocationNote] = useState('');
  const [urgency, setUrgency] = useState('HIGH');
  const [details, setDetails] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  // Result of submission
  const [submittedData, setSubmittedData] = useState(null);

  const handleSelectHelp = (type) => {
    setSelectedType(type);
    if (type === 'MEDICAL') {
      setUrgency('CRITICAL');
    } else {
      setUrgency('HIGH');
    }
    setStep('FORM');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = submitCitizenQuickHelp({
      type: selectedType,
      campId,
      locationNote: locationNote.trim() || 'Near main camp entrance / flag pole',
      urgency,
      details: details.trim() || `Citizen requested ${selectedType.toLowerCase()} assistance urgently.`,
      contactInfo: contactInfo.trim() || 'No phone / Waiting at reported location'
    });

    setSubmittedData(result);
    setStep('CONFIRMATION');
  };

  const handleReset = () => {
    setStep('SELECT');
    setLocationNote('');
    setDetails('');
    setContactInfo('');
    setSubmittedData(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      
      {/* Top Friendly Header */}
      <div className="text-center space-y-2 bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99055]/15 border border-[#D99055]/30 text-[#D99055] text-xs font-mono font-bold">
          <LifeBuoy size={14} />
          <span>CITIZEN RAPID ASSISTANCE PORTAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F0E8] tracking-tight">
          What Emergency Help Do You Need?
        </h1>
        <p className="text-sm text-[#A89F91] max-w-xl mx-auto">
          Tap one large button below. Designed for immediate response during flood, landslide, and evacuation events. No complex passwords or forms.
        </p>
      </div>

      {/* STEP 1: THREE HUGE ACCESSIBLE BUTTONS */}
      {step === 'SELECT' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. FOOD & CLEAN WATER BUTTON */}
          <button
            onClick={() => handleSelectHelp('FOOD')}
            className="group relative bg-[#191512] hover:bg-[#221C18] border-2 border-[#D99055] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-200 hover:scale-[1.02] shadow-copper-glow focus:outline-none focus:ring-4 focus:ring-[#D99055]/50 active:scale-95 min-h-[240px] justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D99055] to-[#B87239] flex items-center justify-center text-[#0B0A09] shadow-lg group-hover:rotate-6 transition-transform mb-4">
              <Utensils size={40} strokeWidth={2.4} />
            </div>

            <span className="text-2xl font-black text-[#F5F0E8] font-mono tracking-wider">
              1. FOOD & WATER
            </span>
            <span className="text-xs text-[#D99055] font-mono mt-1 font-bold">
              खाना और पीने का पानी
            </span>
            <p className="text-xs text-[#A89F91] mt-2 leading-relaxed">
              Clean bottled water, baby food, dry ration kits, oral rehydration.
            </p>

            <div className="mt-4 px-4 py-1.5 rounded-full bg-[#D99055]/20 text-[#D99055] text-xs font-mono font-bold border border-[#D99055]/40">
              TAP FOR FOOD →
            </div>
          </button>

          {/* 2. SHELTER & BEDDING BUTTON */}
          <button
            onClick={() => handleSelectHelp('SHELTER')}
            className="group relative bg-[#191512] hover:bg-[#221C18] border-2 border-[#393027] hover:border-[#F5F0E8] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-200 hover:scale-[1.02] shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#F5F0E8]/30 active:scale-95 min-h-[240px] justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#393027] to-[#221C18] border border-[#54463A] flex items-center justify-center text-[#F5F0E8] shadow-lg group-hover:rotate-6 transition-transform mb-4">
              <Home size={40} strokeWidth={2.4} />
            </div>

            <span className="text-2xl font-black text-[#F5F0E8] font-mono tracking-wider">
              2. SHELTER
            </span>
            <span className="text-xs text-[#A89F91] font-mono mt-1 font-bold">
              आश्रय और सूखा बिस्तर
            </span>
            <p className="text-xs text-[#A89F91] mt-2 leading-relaxed">
              Family tents, dry blankets, tarpaulins, evacuation accommodation.
            </p>

            <div className="mt-4 px-4 py-1.5 rounded-full bg-[#221C18] text-[#F5F0E8] text-xs font-mono font-bold border border-[#393027]">
              TAP FOR SHELTER →
            </div>
          </button>

          {/* 3. MEDICAL HELP (CRITICAL RED BUTTON) */}
          <button
            onClick={() => handleSelectHelp('MEDICAL')}
            className="group relative bg-[#191512] hover:bg-[#221C18] border-2 border-[#F05252] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-200 hover:scale-[1.02] shadow-critical-glow focus:outline-none focus:ring-4 focus:ring-[#F05252]/50 active:scale-95 min-h-[240px] justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F05252] to-[#B83232] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform mb-4 animate-pulse">
              <HeartPulse size={42} strokeWidth={2.4} />
            </div>

            <span className="text-2xl font-black text-[#F05252] font-mono tracking-wider">
              3. MEDICAL HELP
            </span>
            <span className="text-xs text-[#F05252] font-mono mt-1 font-bold">
              आपातकालीन चिकित्सा सहायता
            </span>
            <p className="text-xs text-[#A89F91] mt-2 leading-relaxed">
              Severe injuries, sick child, chest pain, labor/delivery, urgent doctor.
            </p>

            <div className="mt-4 px-4 py-1.5 rounded-full bg-[#F05252]/20 text-[#F05252] text-xs font-mono font-bold border border-[#F05252]/40">
              TAP FOR MEDICAL →
            </div>
          </button>

        </div>
      )}

      {/* STEP 2: SIMPLE SHORT REQUEST FORM */}
      {step === 'FORM' && (
        <div className="bg-[#191512] border border-[#393027] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          <button
            onClick={() => setStep('SELECT')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A89F91] hover:text-[#F5F0E8] mb-4 p-1"
          >
            <ArrowLeft size={15} />
            <span>Change Assistance Type</span>
          </button>

          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#393027]">
            <div className={`p-3 rounded-2xl ${
              selectedType === 'MEDICAL' 
                ? 'bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/40' 
                : 'bg-[#D99055]/20 text-[#D99055] border border-[#D99055]/40'
            }`}>
              {selectedType === 'FOOD' && <Utensils size={26} />}
              {selectedType === 'SHELTER' && <Home size={26} />}
              {selectedType === 'MEDICAL' && <HeartPulse size={26} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F5F0E8] font-mono">
                Requesting: {selectedType === 'FOOD' ? 'Food & Drinking Water' : selectedType === 'SHELTER' ? 'Emergency Shelter & Bedding' : 'Urgent Medical Attention'}
              </h2>
              <p className="text-xs text-[#A89F91]">
                Complete these 3 simple questions so field responders can reach you rapidly.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-sm font-sans">
            
            {/* Camp Selection */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#A89F91] mb-1 font-bold">
                1. Which Relief Camp / Area Are You At?
              </label>
              <select
                value={campId}
                onChange={(e) => setCampId(e.target.value)}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-3 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none text-sm font-medium cursor-pointer"
              >
                {camps.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Note (Optional but very helpful) */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#A89F91] mb-1 font-bold">
                2. Where Exactly Are You Located in the Camp?
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3.5 top-3.5 text-[#D99055]" />
                <input
                  type="text"
                  value={locationNote}
                  onChange={(e) => setLocationNote(e.target.value)}
                  placeholder="e.g. Near blue water tank, Tent 45, or Gate 2"
                  className="w-full bg-[#14110E] text-[#F5F0E8] pl-10 pr-4 py-3 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none text-sm"
                />
              </div>
              <span className="text-[11px] text-[#A89F91] mt-1 block">
                Describe nearby landmarks or flags if you do not know the tent number.
              </span>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#A89F91] mb-1 font-bold">
                3. How Urgent Is This Request?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency('CRITICAL')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    urgency === 'CRITICAL'
                      ? 'bg-[#F05252]/20 border-[#F05252] text-[#F05252] font-bold shadow-critical-glow'
                      : 'bg-[#14110E] border-[#393027] text-[#A89F91]'
                  }`}
                >
                  <span className="block font-bold">🚨 IMMEDIATE DANGER</span>
                  <span className="text-xs opacity-80">Life-threat / Needs help right now</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('HIGH')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    urgency === 'HIGH'
                      ? 'bg-[#D99055]/20 border-[#D99055] text-[#D99055] font-bold shadow-copper-sm'
                      : 'bg-[#14110E] border-[#393027] text-[#A89F91]'
                  }`}
                >
                  <span className="block font-bold">URGENT</span>
                  <span className="text-xs opacity-80">Needed within 1 to 2 hours</span>
                </button>
              </div>
            </div>

            {/* Optional Details */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#A89F91] mb-1 font-bold">
                Additional Details (Number of people, infants, symptoms):
              </label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. Family of 4, baby needs milk, grandfather has fever"
                className="w-full bg-[#14110E] text-[#F5F0E8] p-3 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none text-sm"
              />
            </div>

            {/* Contact / Phone */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#A89F91] mb-1 font-bold">
                Mobile Number or Neighbor's Contact (Optional):
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-3.5 text-[#A89F91]" />
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. +91 98450 00000 or 'No phone'"
                  className="w-full bg-[#14110E] text-[#F5F0E8] pl-10 pr-4 py-3 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Big Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 rounded-2xl font-black font-mono text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xl active:scale-[0.99] ${
                selectedType === 'MEDICAL'
                  ? 'bg-gradient-to-r from-[#F05252] to-[#B83232] text-white shadow-critical-glow hover:brightness-110'
                  : 'bg-gradient-to-r from-[#D99055] to-[#B87239] text-[#0B0A09] shadow-copper-glow hover:brightness-110'
              }`}
            >
              <LifeBuoy size={20} />
              <span>SEND RESCUE REQUEST NOW</span>
            </button>
          </form>
        </div>
      )}

      {/* STEP 3: CONFIRMATION / EMERGENCY TOKEN SCREEN */}
      {step === 'CONFIRMATION' && submittedData && (
        <div className="bg-[#191512] border-2 border-[#35C98A] rounded-3xl p-6 sm:p-10 shadow-emerald-glow text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-[#35C98A]/20 border-2 border-[#35C98A] flex items-center justify-center text-[#35C98A] mx-auto animate-bounce">
            <CheckCircle2 size={46} strokeWidth={2.4} />
          </div>

          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40 uppercase tracking-widest">
              Request Received by Control Room
            </span>
            <h2 className="text-3xl font-extrabold text-[#F5F0E8] font-mono mt-2">
              HELP IS BEING DISPATCHED
            </h2>
            <p className="text-sm text-[#A89F91]">
              Your emergency signal was registered into the DisplaceOS coordination dispatch grid.
            </p>
          </div>

          {/* Emergency Pass Ticket */}
          <div className="max-w-md mx-auto bg-[#14110E] border border-[#393027] rounded-2xl p-5 text-left space-y-3 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#393027]">
              <div>
                <span className="text-[10px] text-[#A89F91] uppercase block">
                  Reference ID
                </span>
                <span className="text-lg font-bold text-[#D99055]">
                  {submittedData.request.id}
                </span>
              </div>
              {submittedData.token && (
                <div className="text-right">
                  <span className="text-[10px] text-[#A89F91] uppercase block">
                    Queue Token
                  </span>
                  <span className="text-lg font-bold text-[#F05252]">
                    {submittedData.token.tokenNumber}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A89F91]">Service Type:</span>
                <span className="text-[#F5F0E8] font-semibold">{submittedData.request.categoryLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A89F91]">Relief Camp:</span>
                <span className="text-[#F5F0E8]">{submittedData.request.campName.split('(')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A89F91]">Location:</span>
                <span className="text-[#F5F0E8]">{submittedData.request.locationNote}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A89F91]">Urgency Level:</span>
                <span className={`font-bold ${submittedData.request.urgency === 'CRITICAL' ? 'text-[#F05252]' : 'text-[#D99055]'}`}>
                  {submittedData.request.urgency}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#393027] flex items-center gap-2 text-[11px] text-[#35C98A]">
              <span className="w-2 h-2 rounded-full bg-[#35C98A] animate-ping" />
              <span>Broadcast to camp responders and nearby verified volunteers.</span>
            </div>
          </div>

          {/* Calming Instructions */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-[#221C18] border border-[#393027] text-xs text-[#A89F91] text-left space-y-1.5">
            <strong className="text-[#F5F0E8] block font-mono">What to do right now:</strong>
            <p>1. Stay at or near your specified location so aid workers can find you.</p>
            <p>2. Look for emergency volunteers wearing orange DisplaceOS badges.</p>
            <p>3. If your condition worsens, show this token reference on your screen.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D99055] text-[#0B0A09] font-bold font-mono text-xs hover:brightness-110 transition-all"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}

      {/* Recent Citizen Requests Feed */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 shadow-2xl space-y-3">
        <h3 className="text-sm font-bold text-[#F5F0E8] font-mono flex items-center gap-2">
          <Clock size={16} className="text-[#D99055]" />
          Recent Citizen Requests Log
        </h3>
        
        <div className="space-y-2">
          {citizenRequests.slice(0, 4).map(req => (
            <div
              key={req.id}
              className="p-3 rounded-xl bg-[#14110E] border border-[#26201A] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
            >
              <div className="flex items-center gap-2.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  req.type === 'MEDICAL' 
                    ? 'bg-[#F05252]/20 text-[#F05252]' 
                    : req.type === 'FOOD'
                      ? 'bg-[#D99055]/20 text-[#D99055]'
                      : 'bg-[#38BDF8]/20 text-sky-400'
                }`}>
                  {req.type}
                </span>
                <span className="text-[#F5F0E8] font-bold">
                  {req.id}
                </span>
                <span className="text-[#A89F91] truncate max-w-xs">
                  {req.campName.split('(')[0]} — {req.locationNote}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#A89F91]">
                  {req.submittedAt}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#221C18] text-[#35C98A] border border-[#393027] text-[10px] font-bold">
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
