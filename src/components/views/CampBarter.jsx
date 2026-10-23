import React, { useState, useMemo } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  ArrowLeftRight,
  ShieldCheck,
  ShieldAlert,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Package,
  Droplets,
  Utensils,
  Activity,
  HeartPulse,
  Send,
  Navigation,
  FileText
} from 'lucide-react';

export default function CampBarter() {
  const {
    camps,
    transfers,
    selectedCampId,
    requestBarterTransfer,
    approveBarterTransfer,
    dispatchBarterTransfer,
    receiveBarterTransfer,
    getCampDistance,
    calculateDepletion
  } = useDisaster();

  // Form State
  const [toCampId, setToCampId] = useState(selectedCampId || 'camp-beta');
  const [resourceKey, setResourceKey] = useState('water');
  const [selectedDonorId, setSelectedDonorId] = useState('camp-alpha');
  const [quantity, setQuantity] = useState(2500);
  const [urgency, setUrgency] = useState('HIGH');
  const [notes, setNotes] = useState('Urgent potable water transfer to avert critical dehydration threshold.');

  // Transfer table filter
  const [statusFilter, setStatusFilter] = useState('ALL');

  const recipientCamp = camps.find(c => c.id === toCampId) || camps[0];
  const donorCamp = camps.find(c => c.id === selectedDonorId);

  // Calculate available donors with true surplus (Stock - SafetyStock)
  const candidateDonors = useMemo(() => {
    return camps
      .filter(c => c.id !== toCampId)
      .map(c => {
        const res = c.resources[resourceKey] || { currentStock: 0, safetyStock: 0, unit: 'Units' };
        const availableSurplus = Math.max(0, res.currentStock - res.safetyStock);
        const distance = getCampDistance(c.id, toCampId);
        const dep = calculateDepletion(res.currentStock, c.population, res.dailyRate);

        return {
          camp: c,
          currentStock: res.currentStock,
          safetyStock: res.safetyStock,
          availableSurplus,
          unit: res.unit,
          distanceKm: distance,
          depletionHours: dep.hoursRemaining,
          isEligible: availableSurplus > 0
        };
      })
      .sort((a, b) => {
        // Prefer eligible donors with shortest distance
        if (a.isEligible && !b.isEligible) return -1;
        if (!a.isEligible && b.isEligible) return 1;
        return a.distanceKm - b.distanceKm;
      });
  }, [camps, toCampId, resourceKey]);

  // Selected donor stats
  const selectedDonorStats = candidateDonors.find(d => d.camp.id === selectedDonorId);
  const remainingAfter = selectedDonorStats 
    ? selectedDonorStats.currentStock - Number(quantity || 0)
    : 0;
  const isSafetyViolated = selectedDonorStats 
    ? remainingAfter < selectedDonorStats.safetyStock 
    : false;

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!selectedDonorId || !toCampId) return;

    requestBarterTransfer({
      fromCampId: selectedDonorId,
      toCampId,
      resourceKey,
      quantity: Number(quantity),
      urgency,
      notes
    });
  };

  // Filter transfers
  const filteredTransfers = transfers.filter(t => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'PENDING') return t.status === 'requested' || t.status === 'approved';
    if (statusFilter === 'IN_TRANSIT') return t.status === 'dispatched';
    if (statusFilter === 'DELIVERED') return t.status === 'received';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#D99055]/20 text-[#D99055] border border-[#D99055]/30">
                Safety Stock Locked Logistics
              </span>
              <span className="text-xs font-mono text-[#35C98A] flex items-center gap-1">
                <ShieldCheck size={14} />
                Strict Donor Protection Enabled
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F0E8] font-mono">
              Camp-to-Camp Barter & Transfer Hub
            </h2>
            <p className="text-xs text-[#A89F91] mt-1 max-w-2xl">
              Automated surplus discovery matches camps facing resource deficits with nearby donor camps having verified surpluses above their safety stock. Consistent two-way inventory deduction upon dispatch and verification upon receipt.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-[#221C18] border border-[#393027] text-xs font-mono text-[#F5F0E8]">
              Total Convoys Logged: <strong className="text-[#D99055]">{transfers.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Creation & Surplus Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form: Initiate Barter Transfer (5 Cols) */}
        <div className="lg:col-span-5 bg-[#191512] border border-[#393027] rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#393027]">
            <ArrowLeftRight className="text-[#D99055]" size={18} />
            <h3 className="text-sm font-bold text-[#F5F0E8] font-mono">
              Configure Camp Transfer Order
            </h3>
          </div>

          <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs font-mono">
            {/* 1. Recipient Camp (Camp in need) */}
            <div>
              <label className="text-[#A89F91] block mb-1">
                1. Recipient Camp (In Deficit):
              </label>
              <select
                value={toCampId}
                onChange={(e) => {
                  setToCampId(e.target.value);
                  // Ensure donor is not identical
                  const candidate = camps.find(c => c.id !== e.target.value);
                  if (candidate) setSelectedDonorId(candidate.id);
                }}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2.5 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none cursor-pointer"
              >
                {camps.map(camp => (
                  <option key={camp.id} value={camp.id}>
                    {camp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Commodity Key */}
            <div>
              <label className="text-[#A89F91] block mb-1">
                2. Resource Commodity:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'water', label: 'Potable Water', icon: Droplets },
                  { key: 'food', label: 'Ration Packs', icon: Utensils },
                  { key: 'ors', label: 'ORS Sachets', icon: Activity },
                  { key: 'medicine', label: 'Trauma Kits', icon: HeartPulse }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() => setResourceKey(item.key)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                        resourceKey === item.key
                          ? 'bg-[#221C18] border-[#D99055] text-[#F5F0E8] shadow-copper-sm'
                          : 'bg-[#14110E] border-[#393027] text-[#A89F91] hover:text-[#F5F0E8]'
                      }`}
                    >
                      <Icon size={14} className={resourceKey === item.key ? 'text-[#D99055]' : ''} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Donor Camp Selection */}
            <div>
              <label className="text-[#A89F91] block mb-1">
                3. Donor Camp (Must Hold Surplus &gt; Safety Buffer):
              </label>
              <select
                value={selectedDonorId}
                onChange={(e) => setSelectedDonorId(e.target.value)}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2.5 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none cursor-pointer"
              >
                {candidateDonors.map(donor => (
                  <option key={donor.camp.id} value={donor.camp.id} disabled={!donor.isEligible}>
                    {donor.camp.name.split('(')[0]} — {donor.distanceKm} km away — Surplus: {donor.availableSurplus.toLocaleString()} {donor.unit} {!donor.isEligible ? '(NO SURPLUS)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Transfer Quantity & Safety Stock Guard */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[#A89F91]">
                  4. Transfer Quantity ({selectedDonorStats?.unit || 'Units'}):
                </label>
                {selectedDonorStats && (
                  <span className="text-[11px] text-[#D99055]">
                    Max Safe Surplus: {selectedDonorStats.availableSurplus.toLocaleString()} {selectedDonorStats.unit}
                  </span>
                )}
              </div>
              <input
                type="number"
                min="1"
                max={selectedDonorStats?.availableSurplus || 999999}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={`w-full bg-[#14110E] text-[#F5F0E8] p-2.5 rounded-xl border focus:outline-none font-bold ${
                  isSafetyViolated ? 'border-[#F05252] text-[#F05252]' : 'border-[#393027] focus:border-[#D99055]'
                }`}
                placeholder="Enter quantity..."
              />

              {/* Real-time Safety Stock Warning / Guard */}
              {isSafetyViolated ? (
                <div className="mt-2 p-2.5 rounded-lg bg-[#F05252]/10 border border-[#F05252]/40 text-[#F05252] text-[11px] flex items-start gap-2">
                  <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>BLOCKED BY PROTOCOL:</strong> Transfer of {quantity} would reduce donor below mandatory safety stock ({selectedDonorStats?.safetyStock.toLocaleString()} {selectedDonorStats?.unit}). Donor would retain only {remainingAfter.toLocaleString()} {selectedDonorStats?.unit}.
                  </div>
                </div>
              ) : selectedDonorStats ? (
                <div className="mt-2 text-[11px] text-[#35C98A] flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  <span>
                    Valid: Donor will retain {remainingAfter.toLocaleString()} {selectedDonorStats.unit} (Safety floor: {selectedDonorStats.safetyStock.toLocaleString()} {selectedDonorStats.unit}).
                  </span>
                </div>
              ) : null}
            </div>

            {/* Urgency */}
            <div>
              <label className="text-[#A89F91] block mb-1">5. Urgency Level:</label>
              <div className="grid grid-cols-3 gap-2">
                {['CRITICAL', 'HIGH', 'STANDARD'].map(lvl => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setUrgency(lvl)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${
                      urgency === lvl
                        ? lvl === 'CRITICAL'
                          ? 'bg-[#F05252]/20 border-[#F05252] text-[#F05252] font-bold'
                          : 'bg-[#D99055]/20 border-[#D99055] text-[#D99055] font-bold'
                        : 'bg-[#14110E] border-[#393027] text-[#A89F91]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[#A89F91] block mb-1">Operational Notes / Reason:</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#14110E] text-[#F5F0E8] p-2 rounded-xl border border-[#393027] focus:border-[#D99055] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSafetyViolated || !quantity || quantity <= 0}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isSafetyViolated || !quantity || quantity <= 0
                  ? 'bg-[#221C18] text-[#A89F91]/50 border border-[#393027] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#D99055] to-[#B87239] text-[#0B0A09] hover:brightness-110 active:scale-[0.99] shadow-copper-sm'
              }`}
            >
              <Send size={15} />
              <span>REQUEST BARTER TRANSFER</span>
            </button>
          </form>
        </div>

        {/* Right: Surplus Camps Discovery Radar & Recommendations (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#F5F0E8] font-mono">
                Nearby Donor Camps for {recipientCamp.name.split('(')[0]}
              </h3>
              <p className="text-xs text-[#A89F91]">
                Real-time calculated distances and verified surplus quantities
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#D99055]">
              Target: {resourceKey.toUpperCase()}
            </span>
          </div>

          {/* Cards for each candidate donor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {candidateDonors.map((donor, idx) => {
              const isSelected = selectedDonorId === donor.camp.id;

              return (
                <div
                  key={donor.camp.id}
                  onClick={() => {
                    if (donor.isEligible) {
                      setSelectedDonorId(donor.camp.id);
                    }
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#221C18] border-[#D99055] shadow-copper-sm ring-1 ring-[#D99055]'
                      : donor.isEligible
                        ? 'bg-[#191512] border-[#393027] hover:border-[#D99055]/50'
                        : 'bg-[#14110E]/70 border-[#393027]/40 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {/* Recommended badge for closest eligible */}
                  {idx === 0 && donor.isEligible && (
                    <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#35C98A] text-[#0B0A09]">
                      RECOMMENDED DONOR (CLOSEST)
                    </span>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#F5F0E8] font-mono">
                        {donor.camp.name.split('(')[0]}
                      </h4>
                      <p className="text-[11px] text-[#A89F91]">
                        {donor.camp.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#D99055] font-mono">
                        {donor.distanceKm} km
                      </span>
                      <span className="text-[10px] text-[#A89F91] block">
                        Direct distance
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#393027]/60 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#A89F91]">Current Stock:</span>
                      <span className="text-[#F5F0E8]">{donor.currentStock.toLocaleString()} {donor.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A89F91]">Mandated Safety Floor:</span>
                      <span className="text-[#A89F91]">{donor.safetyStock.toLocaleString()} {donor.unit}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-[#D99055]">Available Surplus:</span>
                      <span className={donor.isEligible ? 'text-[#35C98A]' : 'text-[#F05252]'}>
                        {donor.availableSurplus.toLocaleString()} {donor.unit}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#393027]/60 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#A89F91]">
                      Burnout horizon: {donor.depletionHours}h
                    </span>
                    {donor.isEligible ? (
                      <span className="text-[#D99055] font-bold">
                        {isSelected ? '✓ Selected as Donor' : 'Select Donor'}
                      </span>
                    ) : (
                      <span className="text-[#F05252]">
                        No surplus to give
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Transfer Protocol Summary Card */}
          <div className="p-4 rounded-xl bg-[#14110E] border border-[#26201A] text-xs font-mono text-[#A89F91] space-y-1.5">
            <span className="text-[#F5F0E8] font-bold block">
              DisplaceOS Barter Protocol Verification:
            </span>
            <p>
              • <strong>Approve:</strong> Authorizes security convoy and routes between sectors.
            </p>
            <p>
              • <strong>Dispatch:</strong> Deducts exact requested quantity from donor warehouse immediately. Prevents duplicate convoy dispatches.
            </p>
            <p>
              • <strong>Receive:</strong> Physically adds stock to recipient camp inventory upon driver QR confirmation.
            </p>
          </div>
        </div>

      </div>

      {/* Transfer Convoys Ledger (Table with 4-stage lifecycle buttons) */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#F5F0E8] font-mono flex items-center gap-2">
              <Truck size={17} className="text-[#D99055]" />
              Active & Historic Transfer Convoys Ledger
            </h3>
            <p className="text-xs text-[#A89F91]">
              Live state updates: Request → Approve → Dispatch → Receive
            </p>
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1.5 bg-[#14110E] p-1 rounded-xl border border-[#393027] text-xs font-mono">
            {['ALL', 'PENDING', 'IN_TRANSIT', 'DELIVERED'].map(filter => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === filter
                    ? 'bg-[#D99055] text-[#0B0A09] font-bold'
                    : 'text-[#A89F91] hover:text-[#F5F0E8]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {filteredTransfers.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-[#A89F91]">
            No transfers match the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#393027] text-[#A89F91]">
                  <th className="py-2.5 px-3">Transfer ID</th>
                  <th className="py-2.5 px-3">Donor Camp (From)</th>
                  <th className="py-2.5 px-3">Recipient Camp (To)</th>
                  <th className="py-2.5 px-3">Commodity & Qty</th>
                  <th className="py-2.5 px-3">Distance</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Operational Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#393027]/50">
                {filteredTransfers.map(tr => {
                  const fromCamp = camps.find(c => c.id === tr.fromCampId);
                  const toCamp = camps.find(c => c.id === tr.toCampId);

                  return (
                    <tr key={tr.id} className="hover:bg-[#221C18]/50 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#D99055] block">
                          {tr.id}
                        </span>
                        <span className="text-[10px] text-[#A89F91]">
                          {tr.timestamp}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[#F5F0E8]">
                        <span className="font-semibold">{fromCamp?.name.split('(')[0] || tr.fromCampId}</span>
                        <span className="text-[10px] text-[#A89F91] block">Donor Stock Intact</span>
                      </td>

                      <td className="py-3 px-3 text-[#F5F0E8]">
                        <span className="font-semibold">{toCamp?.name.split('(')[0] || tr.toCampId}</span>
                        <span className="text-[10px] text-[#A89F91] block">Urgency: {tr.urgency}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-[#F5F0E8]">
                          {tr.quantity.toLocaleString()} {tr.unit}
                        </span>
                        <span className="text-[10px] text-[#D99055] block">
                          {tr.resourceName}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[#A89F91]">
                        {tr.distanceKm} km
                      </td>

                      <td className="py-3 px-3">
                        {tr.status === 'requested' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                            PENDING APPROVAL
                          </span>
                        )}
                        {tr.status === 'approved' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/40">
                            APPROVED (QUEUED)
                          </span>
                        )}
                        {tr.status === 'dispatched' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D99055]/20 text-[#D99055] border border-[#D99055]/40 flex items-center gap-1 w-fit animate-pulse">
                            <Truck size={12} />
                            IN TRANSIT
                          </span>
                        )}
                        {tr.status === 'received' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40 flex items-center gap-1 w-fit">
                            <CheckCircle2 size={12} />
                            DELIVERED & VERIFIED
                          </span>
                        )}
                      </td>

                      {/* Action buttons for each lifecycle stage */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {tr.status === 'requested' && (
                            <button
                              onClick={() => approveBarterTransfer(tr.id)}
                              className="px-2.5 py-1 rounded bg-[#D99055] text-[#0B0A09] font-bold hover:brightness-110"
                            >
                              Approve
                            </button>
                          )}

                          {tr.status === 'approved' && (
                            <button
                              onClick={() => dispatchBarterTransfer(tr.id)}
                              className="px-2.5 py-1 rounded bg-sky-500 text-white font-bold hover:brightness-110 flex items-center gap-1"
                            >
                              <Truck size={12} />
                              Dispatch Convoy
                            </button>
                          )}

                          {tr.status === 'dispatched' && (
                            <button
                              onClick={() => receiveBarterTransfer(tr.id)}
                              className="px-2.5 py-1 rounded bg-[#35C98A] text-[#0B0A09] font-bold hover:brightness-110 flex items-center gap-1"
                            >
                              <CheckCircle2 size={12} />
                              Confirm Delivery
                            </button>
                          )}

                          {tr.status === 'received' && (
                            <span className="text-[11px] text-[#A89F91]">
                              Inventory Synced ✓
                            </span>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
