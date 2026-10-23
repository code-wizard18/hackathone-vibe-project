import React, { createContext, useContext, useState, useMemo, useRef } from 'react';
import {
  INITIAL_CAMPS,
  INITIAL_TRANSFERS,
  INITIAL_TOKENS,
  INITIAL_CITIZEN_REQUESTS,
  INITIAL_SILENT_INCIDENTS,
  INITIAL_VOLUNTEERS,
  INITIAL_TASKS,
  INITIAL_ROUTES,
  DISTANCE_MATRIX
} from '../data/initialData';

const DisasterContext = createContext(null);

export function DisasterProvider({ children }) {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('overview'); // overview, planner, depletion, barter, tokens, citizen, silent, volunteers, routes
  const [selectedCampId, setSelectedCampId] = useState('camp-beta'); // Default to Camp Beta which has acute water/ORS shortages for demonstration

  // Core Entity States
  const [camps, setCamps] = useState(INITIAL_CAMPS);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [citizenRequests, setCitizenRequests] = useState(INITIAL_CITIZEN_REQUESTS);
  const [silentIncidents, setSilentIncidents] = useState(INITIAL_SILENT_INCIDENTS);
  const [volunteers, setVolunteers] = useState(INITIAL_VOLUNTEERS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  // Synchronous guards stop a fast double-click from applying inventory changes twice
  // before React has committed the updated transfer status.
  const dispatchingTransfers = useRef(new Set());
  const receivingTransfers = useRef(new Set());

  // Layout Planner State
  const [plannerState, setPlannerState] = useState({
    campId: 'camp-beta',
    terrain: 'slope',
    floodRisk: 'high',
    areaSqMeters: 28000,
    roadAccess: 'gravel',
    approvedByOfficer: false,
    officerSignOffName: '',
    approvedAt: null,
    hazardsFlagged: [
      { id: 'h1', severity: 'HIGH', message: 'Latrines must remain at least 45m downhill and downwind from river potable extraction tap.' },
      { id: 'h2', severity: 'CRITICAL', message: 'High flood risk zone: Family tents must be elevated on gravel berms above 35m contour.' },
      { id: 'h3', severity: 'MODERATE', message: 'Single gravel access corridor: Logistics depot must be positioned at northern perimeter to prevent congestion.' }
    ]
  });

  // Toast System
  const [toasts, setToasts] = useState([
    {
      id: 1,
      title: 'DisplaceOS Mission Advisory Active',
      message: 'Operating with Live Simulated Telemetry. All safety stock locks engaged.',
      type: 'info',
      timestamp: 'Just now'
    }
  ]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [
      { id, title, message, type, timestamp: 'Just now' },
      ...prev.slice(0, 4) // keep max 5 toasts
    ]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 1. RESOURCE DEPLETION CALCULATIONS (Transparent, Formula-Based)
  // Formula: Remaining Hours = Current Stock / (Population * Daily Rate / 24)
  const calculateDepletion = (currentStock, population, dailyRate) => {
    if (!population || population <= 0) return { hoursRemaining: 999, daysRemaining: 41, status: 'SAFE' };
    if (!dailyRate || dailyRate <= 0) return { hoursRemaining: 999, daysRemaining: 41, status: 'SAFE' };
    
    const hourlyConsumption = (population * dailyRate) / 24;
    const hoursRemaining = currentStock / hourlyConsumption;
    const daysRemaining = hoursRemaining / 24;

    let status = 'SAFE';
    if (hoursRemaining <= 8) {
      status = 'CRITICAL';
    } else if (hoursRemaining <= 24) {
      status = 'HIGH_RISK';
    } else if (hoursRemaining <= 48) {
      status = 'MODERATE';
    }

    return {
      hoursRemaining: parseFloat(hoursRemaining.toFixed(1)),
      daysRemaining: parseFloat(daysRemaining.toFixed(1)),
      hourlyConsumption: parseFloat(hourlyConsumption.toFixed(2)),
      status
    };
  };

  // 2. CAMP BARTER & TRANSFER ACTIONS (With safety stock lock & two-way inventory mutations)
  const getCampDistance = (fromId, toId) => {
    if (fromId === toId) return 0;
    if (DISTANCE_MATRIX[fromId] && DISTANCE_MATRIX[fromId][toId]) {
      return DISTANCE_MATRIX[fromId][toId];
    }
    if (DISTANCE_MATRIX[toId] && DISTANCE_MATRIX[toId][fromId]) {
      return DISTANCE_MATRIX[toId][fromId];
    }
    return 15.0; // fallback standard
  };

  const requestBarterTransfer = ({ fromCampId, toCampId, resourceKey, quantity, urgency = 'HIGH', notes = '' }) => {
    const donorCamp = camps.find(c => c.id === fromCampId);
    const recipientCamp = camps.find(c => c.id === toCampId);

    if (!donorCamp || !recipientCamp) {
      addToast('Transfer Error', 'Invalid donor or recipient camp selected.', 'error');
      return { success: false, reason: 'Invalid camps' };
    }

    if (fromCampId === toCampId) {
      addToast('Transfer Error', 'Donor and recipient camps must be different.', 'error');
      return { success: false, reason: 'Identical camps' };
    }

    const numQuantity = Number(quantity);
    if (!numQuantity || numQuantity <= 0) {
      addToast('Transfer Error', 'Quantity must be a positive number greater than zero.', 'error');
      return { success: false, reason: 'Invalid quantity' };
    }

    const donorRes = donorCamp.resources[resourceKey];
    if (!donorRes) {
      addToast('Transfer Error', `Resource ${resourceKey} not found in donor camp.`, 'error');
      return { success: false, reason: 'Resource not found' };
    }

    // CRITICAL REQUIREMENT: Prevent transfers below donor safety stock!
    const remainingAfterTransfer = donorRes.currentStock - numQuantity;
    if (remainingAfterTransfer < donorRes.safetyStock) {
      const allowedMax = Math.max(0, donorRes.currentStock - donorRes.safetyStock);
      addToast(
        'Donor Safety Stock Violation',
        `Blocked: Transfer of ${numQuantity} ${donorRes.unit} drops ${donorCamp.name} to ${remainingAfterTransfer} (Safety minimum is ${donorRes.safetyStock} ${donorRes.unit}). Maximum available surplus: ${allowedMax} ${donorRes.unit}.`,
        'error'
      );
      return {
        success: false,
        reason: 'SAFETY_STOCK_VIOLATION',
        maxAllowed: allowedMax,
        safetyStock: donorRes.safetyStock
      };
    }

    const dist = getCampDistance(fromCampId, toCampId);
    const newTransferId = `TR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTransfer = {
      id: newTransferId,
      fromCampId,
      toCampId,
      resourceKey,
      resourceName: donorRes.unit === 'Liters' ? 'Potable Water' : resourceKey.toUpperCase(),
      quantity: numQuantity,
      unit: donorRes.unit,
      distanceKm: dist,
      status: 'requested',
      urgency,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dispatchedAt: null,
      receivedAt: null,
      convoy: 'Logistics Queue',
      donorRemainingAfterTransfer: remainingAfterTransfer,
      notes: notes || `Direct camp-to-camp barter request to replenish ${recipientCamp.name}.`
    };

    setTransfers(prev => [newTransfer, ...prev]);
    addToast(
      'Transfer Requested',
      `Barter request ${newTransferId} queued for review. Donor retains safe surplus of ${remainingAfterTransfer} ${donorRes.unit}.`,
      'success'
    );

    return { success: true, transfer: newTransfer };
  };

  const approveBarterTransfer = (transferId) => {
    setTransfers(prev => prev.map(t => {
      if (t.id === transferId && t.status === 'requested') {
        return { ...t, status: 'approved' };
      }
      return t;
    }));
    addToast('Transfer Approved', `Transfer ${transferId} approved by control room. Convoy assigned.`, 'success');
  };

  const dispatchBarterTransfer = (transferId) => {
    if (dispatchingTransfers.current.has(transferId)) return;
    const targetTransfer = transfers.find(t => t.id === transferId);
    if (!targetTransfer) return;
    if (targetTransfer.status !== 'approved') {
      addToast('Dispatch Error', 'Only approved transfers can be dispatched.', 'error');
      return;
    }

    // Check donor stock again to prevent negative inventory
    const donorCamp = camps.find(c => c.id === targetTransfer.fromCampId);
    if (!donorCamp) return;
    const currentDonorStock = donorCamp.resources[targetTransfer.resourceKey]?.currentStock || 0;
    if (currentDonorStock < targetTransfer.quantity) {
      addToast('Inventory Deficit', `Insufficient stock in ${donorCamp.name} to complete dispatch!`, 'error');
      return;
    }

    dispatchingTransfers.current.add(transferId);

    // DEDUCT from donor camp stock!
    setCamps(prevCamps => prevCamps.map(camp => {
      if (camp.id === targetTransfer.fromCampId) {
        const res = camp.resources[targetTransfer.resourceKey];
        return {
          ...camp,
          resources: {
            ...camp.resources,
            [targetTransfer.resourceKey]: {
              ...res,
              currentStock: res.currentStock - targetTransfer.quantity
            }
          }
        };
      }
      return camp;
    }));

    // Update transfer status
    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        return {
          ...t,
          status: 'dispatched',
          dispatchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          convoy: 'Convoy Alpha-Relief'
        };
      }
      return t;
    }));

    addToast(
      'Convoy Dispatched',
      `${targetTransfer.quantity} ${targetTransfer.unit} deducted from ${donorCamp.name} and en route.`,
      'info'
    );
  };

  const receiveBarterTransfer = (transferId) => {
    if (receivingTransfers.current.has(transferId)) return;
    const targetTransfer = transfers.find(t => t.id === transferId);
    if (!targetTransfer) return;
    if (targetTransfer.status !== 'dispatched') {
      addToast('Receive Error', 'Only dispatched transfers can be marked as received.', 'error');
      return;
    }

    receivingTransfers.current.add(transferId);

    // ADD to recipient camp stock!
    setCamps(prevCamps => prevCamps.map(camp => {
      if (camp.id === targetTransfer.toCampId) {
        const res = camp.resources[targetTransfer.resourceKey];
        return {
          ...camp,
          resources: {
            ...camp.resources,
            [targetTransfer.resourceKey]: {
              ...res,
              currentStock: res.currentStock + targetTransfer.quantity
            }
          }
        };
      }
      return camp;
    }));

    // Update transfer status
    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        return {
          ...t,
          status: 'received',
          receivedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return t;
    }));

    const recipientCamp = camps.find(c => c.id === targetTransfer.toCampId);
    addToast(
      'Inventory Delivered & Verified',
      `${targetTransfer.quantity} ${targetTransfer.unit} successfully added to ${recipientCamp?.name || 'recipient'}.`,
      'success'
    );
  };

  // 3. PRIORITY TOKEN SYSTEM (Non-discriminatory Clinical Triage)
  const generatePriorityToken = ({
    citizenName,
    campId,
    serviceNeeded,
    clinicalUrgency,
    isAcuteLifeThreat,
    demographicFactors = []
  }) => {
    // Clinical Urgency is primary:
    // P1 = Acute Life Threat / Severe trauma / Respiratory / Hemorrhage / Unconscious
    // P2 = High priority (Vulnerable demographics: pregnant, infant, frail elderly, disability WITHOUT acute life threat, or moderate acute distress)
    // P3 = Standard priority (Routine medicine refills, mild cough, general supplies, food ration pickup)
    let priority = 'P3';
    let category = 'Standard Priority';
    let assignedBay = 'General Clinic / Desk 3';
    let estimatedWaitMinutes = 35;

    if (isAcuteLifeThreat || clinicalUrgency.toLowerCase().includes('severe') || clinicalUrgency.toLowerCase().includes('trauma') || clinicalUrgency.toLowerCase().includes('chest') || clinicalUrgency.toLowerCase().includes('shock')) {
      priority = 'P1';
      category = 'Immediate Emergency';
      assignedBay = 'Trauma Resuscitation Bay';
      estimatedWaitMinutes = 2;
    } else if (demographicFactors.length > 0 || clinicalUrgency.toLowerCase().includes('moderate') || clinicalUrgency.toLowerCase().includes('fracture') || clinicalUrgency.toLowerCase().includes('fever')) {
      priority = 'P2';
      category = 'High Priority';
      assignedBay = demographicFactors.some(d => d.includes('Pregnancy')) ? 'Maternal Care Unit' : 'Priority Care Desk 1';
      estimatedWaitMinutes = 15;
    }

    const tokenNum = `${priority}-${Math.floor(100 + Math.random() * 900)}`;
    const newToken = {
      id: `TK-${tokenNum}`,
      tokenNumber: tokenNum,
      priority,
      category,
      citizenName: citizenName || 'Anonymous Citizen',
      campId,
      serviceNeeded,
      clinicalUrgency,
      demographicFactors,
      assignedBay,
      status: 'waiting',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedWaitMinutes,
      triageNotes: isAcuteLifeThreat 
        ? 'Assigned P1 based on acute clinical vital threat. Demographics recorded for medical records only.'
        : demographicFactors.length > 0
          ? `Assigned P2: Demographics prioritized with non-acute clinical profile.`
          : 'Standard queue assignment.'
    };

    setTokens(prev => [newToken, ...prev]);
    addToast(
      `Token Generated: ${tokenNum}`,
      `Priority ${priority} (${category}) assigned. Estimated wait: ${estimatedWaitMinutes} mins.`,
      priority === 'P1' ? 'error' : priority === 'P2' ? 'warning' : 'info'
    );

    return newToken;
  };

  const updateTokenStatus = (tokenId, newStatus) => {
    setTokens(prev => prev.map(t => {
      if (t.id === tokenId) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  // 4. CITIZEN QUICK-HELP UI SUBMISSION
  const submitCitizenQuickHelp = ({ type, campId, locationNote, urgency = 'STANDARD', details, contactInfo }) => {
    const targetCamp = camps.find(c => c.id === campId) || camps[0];
    const requestId = `CR-${Math.floor(9000 + Math.random() * 999)}`;

    const newRequest = {
      id: requestId,
      type, // 'FOOD' | 'SHELTER' | 'MEDICAL'
      categoryLabel: type === 'FOOD' ? 'Emergency Food & Water' : type === 'SHELTER' ? 'Emergency Shelter & Bedding' : 'Urgent Medical Attention',
      campId: targetCamp.id,
      campName: targetCamp.name,
      locationNote: locationNote || 'Immediate vicinity of relief flag',
      urgency,
      details: details || `Urgent citizen request for ${type.toLowerCase()} assistance.`,
      contactInfo: contactInfo || 'On-site flag beacon',
      status: 'PENDING_DISPATCH',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      responder: 'Unassigned Queue'
    };

    setCitizenRequests(prev => [newRequest, ...prev]);

    // Also link with a priority token if it is medical or urgent
    let createdToken = null;
    if (type === 'MEDICAL' || urgency === 'CRITICAL' || urgency === 'HIGH') {
      createdToken = generatePriorityToken({
        citizenName: `Citizen Quick-Help (${requestId})`,
        campId: targetCamp.id,
        serviceNeeded: type === 'MEDICAL' ? 'Rapid Field Medical Response' : `${type} Critical Relief`,
        clinicalUrgency: urgency === 'CRITICAL' ? 'Acute distress reported via citizen button' : 'Urgent citizen assistance request',
        isAcuteLifeThreat: urgency === 'CRITICAL' && type === 'MEDICAL',
        demographicFactors: []
      });
    }

    addToast(
      'Citizen Request Logged',
      `Request #${requestId} broadcast to ${targetCamp.name} rapid response dispatchers.`,
      'success'
    );

    return { request: newRequest, token: createdToken };
  };

  // 5. SILENT CAMP DETECTOR (Audit & Verification Protocol)
  const triggerCampVerification = (campId, method) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetCamp = camps.find(c => c.id === campId);

    setSilentIncidents(prev => prev.map(inc => {
      if (inc.campId === campId) {
        return {
          ...inc,
          verificationTriggered: true,
          verificationMethod: method,
          verificationStatus: 'Dispatched & Live Recon Active',
          logs: [
            ...inc.logs,
            { time: timeNow, text: `Command Protocol Initiated: ${method} deployed by Control Room.` }
          ]
        };
      }
      return inc;
    }));

    addToast(
      'Verification Dispatched',
      `${method} ordered for ${targetCamp?.name || campId}. Verifying ground situation (NOT declared empty).`,
      'warning'
    );
  };

  const restoreCampTelemetry = (campId) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Mark incident resolved / restored
    setSilentIncidents(prev => prev.map(inc => {
      if (inc.campId === campId) {
        return {
          ...inc,
          status: 'COMMUNICATION_RESTORED',
          verificationStatus: 'Telemetry Confirmed Online',
          logs: [
            ...inc.logs,
            { time: timeNow, text: 'Telemetry re-established. VHF beacon operational. Inventory synced.' }
          ]
        };
      }
      return inc;
    }));

    // Update camp status
    setCamps(prev => prev.map(c => {
      if (c.id === campId) {
        return {
          ...c,
          telemetryStatus: 'active',
          lastContact: 'Just now (Verified)',
          lastContactMinutesAgo: 0
        };
      }
      return c;
    }));

    addToast('Telemetry Restored', `Camp ${campId} communication restored. All field telemetry live.`, 'success');
  };

  // 6. VOLUNTEER MATCHING
  const assignVolunteerToTask = (taskId, volunteerId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const already = t.volunteersAssigned.includes(volunteerId);
        const updatedAssigned = already ? t.volunteersAssigned : [...t.volunteersAssigned, volunteerId];
        return {
          ...t,
          volunteersAssigned: updatedAssigned,
          status: updatedAssigned.length >= t.volunteersNeeded ? 'in-progress' : t.status
        };
      }
      return t;
    }));

    setVolunteers(prev => prev.map(v => {
      if (v.id === volunteerId) {
        return { ...v, status: 'assigned' };
      }
      return v;
    }));

    addToast('Volunteer Matched', 'Volunteer assigned and task deployment order issued.', 'success');
  };

  const removeVolunteerFromTask = (taskId, volunteerId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updated = t.volunteersAssigned.filter(v => v !== volunteerId);
        return {
          ...t,
          volunteersAssigned: updated,
          status: updated.length === 0 ? 'open' : t.status
        };
      }
      return t;
    }));

    setVolunteers(prev => prev.map(v => {
      if (v.id === volunteerId) {
        return { ...v, status: 'available' };
      }
      return v;
    }));

    addToast('Assignment Released', 'Volunteer returned to available pool.', 'info');
  };

  // 7. AI CAMP LAYOUT PLANNER APPROVAL
  const updatePlannerState = (updates) => {
    setPlannerState(prev => ({ ...prev, ...updates }));
  };

  const approveCampLayoutPlan = (officerName) => {
    if (!officerName || officerName.trim().length === 0) {
      addToast('Sign-Off Required', 'Please enter Field Officer name to sign off on the layout.', 'error');
      return;
    }

    setPlannerState(prev => ({
      ...prev,
      approvedByOfficer: true,
      officerSignOffName: officerName.trim(),
      approvedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    addToast(
      'Site Plan Approved',
      `Layout plan certified by Officer ${officerName}. Simulated safety constraints verified.`,
      'success'
    );
  };

  // DERIVED GLOBAL STATISTICS (Never hardcoded!)
  const stats = useMemo(() => {
    const totalPopulation = camps.reduce((sum, c) => sum + (c.population || 0), 0);
    const totalMaxCapacity = camps.reduce((sum, c) => sum + (c.maxCapacity || 0), 0);
    
    // Critical camps: any camp with < 12h of water or food, or silent > 4 hours
    const criticalCamps = camps.filter(camp => {
      const waterDep = calculateDepletion(camp.resources.water.currentStock, camp.population, camp.resources.water.dailyRate);
      const foodDep = calculateDepletion(camp.resources.food.currentStock, camp.population, camp.resources.food.dailyRate);
      return waterDep.hoursRemaining <= 12 || foodDep.hoursRemaining <= 12 || camp.lastContactMinutesAgo > 240;
    });

    const totalWaterStock = camps.reduce((sum, c) => sum + (c.resources.water?.currentStock || 0), 0);
    const totalFoodPacks = camps.reduce((sum, c) => sum + (c.resources.food?.currentStock || 0), 0);
    const totalTraumaKits = camps.reduce((sum, c) => sum + (c.resources.medicine?.currentStock || 0), 0);

    const pendingTransfers = transfers.filter(t => t.status === 'requested' || t.status === 'approved' || t.status === 'dispatched');
    const waitingTokens = tokens.filter(t => t.status === 'waiting');
    const p1Tokens = waitingTokens.filter(t => t.priority === 'P1');
    const p2Tokens = waitingTokens.filter(t => t.priority === 'P2');
    const p3Tokens = waitingTokens.filter(t => t.priority === 'P3');

    const silentCamps = camps.filter(c => c.telemetryStatus === 'silent' || c.telemetryStatus === 'stale');

    return {
      totalPopulation,
      totalMaxCapacity,
      criticalCampsCount: criticalCamps.length,
      totalWaterStock,
      totalFoodPacks,
      totalTraumaKits,
      activeTransfersCount: pendingTransfers.length,
      waitingTokensCount: waitingTokens.length,
      p1Count: p1Tokens.length,
      p2Count: p2Tokens.length,
      p3Count: p3Tokens.length,
      silentCampsCount: silentCamps.length,
      capacityPercentage: Math.round((totalPopulation / (totalMaxCapacity || 1)) * 100)
    };
  }, [camps, transfers, tokens]);

  const value = {
    activeTab,
    setActiveTab,
    selectedCampId,
    setSelectedCampId,
    camps,
    setCamps,
    transfers,
    tokens,
    citizenRequests,
    silentIncidents,
    volunteers,
    tasks,
    routes,
    plannerState,
    updatePlannerState,
    approveCampLayoutPlan,
    toasts,
    addToast,
    removeToast,
    calculateDepletion,
    requestBarterTransfer,
    approveBarterTransfer,
    dispatchBarterTransfer,
    receiveBarterTransfer,
    generatePriorityToken,
    updateTokenStatus,
    submitCitizenQuickHelp,
    triggerCampVerification,
    restoreCampTelemetry,
    assignVolunteerToTask,
    removeVolunteerFromTask,
    stats,
    getCampDistance
  };

  return (
    <DisasterContext.Provider value={value}>
      {children}
    </DisasterContext.Provider>
  );
}

export function useDisaster() {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error('useDisaster must be used within a DisasterProvider');
  }
  return context;
}
