// DisplaceOS - Initial Mock Data (Realistic Disaster Relief Intelligence)
// All data marked as SIMULATED ADVISORY DATA

export const INITIAL_CAMPS = [
  {
    id: 'camp-alpha',
    name: 'Camp Alpha (Highland Safe Haven)',
    code: 'CP-ALPHA',
    population: 1420,
    maxCapacity: 1800,
    location: 'Sector 1 - Northern Plateau',
    elevation: '185m',
    terrain: 'flat',
    floodRisk: 'low',
    roadAccess: 'paved',
    areaSqMeters: 45000,
    coordinates: { lat: 14.582, lng: 78.431 },
    lastContact: '12 mins ago',
    lastContactMinutesAgo: 12,
    telemetryStatus: 'active',
    commander: 'Capt. R. Deshmukh',
    resources: {
      water: { currentStock: 28500, safetyStock: 8000, dailyRate: 3.5, unit: 'Liters' },
      food: { currentStock: 8200, safetyStock: 2500, dailyRate: 2.0, unit: 'Ration Packs' },
      ors: { currentStock: 3400, safetyStock: 800, dailyRate: 0.35, unit: 'Sachets' },
      medicine: { currentStock: 480, safetyStock: 120, dailyRate: 0.04, unit: 'Trauma Kits' },
      blankets: { currentStock: 1650, safetyStock: 500, dailyRate: 0, unit: 'Units' },
      sanitation: { currentStock: 920, safetyStock: 300, dailyRate: 0.08, unit: 'Hygiene Kits' },
    }
  },
  {
    id: 'camp-beta',
    name: 'Camp Beta (River Valley Relief)',
    code: 'CP-BETA',
    population: 890,
    maxCapacity: 1000,
    location: 'Sector 3 - Eastern Basin',
    elevation: '32m',
    terrain: 'slope',
    floodRisk: 'high',
    roadAccess: 'gravel',
    areaSqMeters: 28000,
    coordinates: { lat: 14.491, lng: 78.512 },
    lastContact: '28 mins ago',
    lastContactMinutesAgo: 28,
    telemetryStatus: 'active',
    commander: 'Lt. S. Nair',
    resources: {
      water: { currentStock: 3900, safetyStock: 5000, dailyRate: 3.8, unit: 'Liters' }, // CRITICAL LOW
      food: { currentStock: 2100, safetyStock: 1600, dailyRate: 2.1, unit: 'Ration Packs' },
      ors: { currentStock: 290, safetyStock: 550, dailyRate: 0.42, unit: 'Sachets' }, // CRITICAL LOW
      medicine: { currentStock: 65, safetyStock: 90, dailyRate: 0.05, unit: 'Trauma Kits' }, // LOW
      blankets: { currentStock: 850, safetyStock: 300, dailyRate: 0, unit: 'Units' },
      sanitation: { currentStock: 340, safetyStock: 200, dailyRate: 0.09, unit: 'Hygiene Kits' },
    }
  },
  {
    id: 'camp-delta',
    name: 'Camp Delta (Coastal Sector 4)',
    code: 'CP-DELTA',
    population: 2150,
    maxCapacity: 2200,
    location: 'Sector 4 - South Coastline',
    elevation: '8m',
    terrain: 'marsh',
    floodRisk: 'high',
    roadAccess: 'obstructed',
    areaSqMeters: 52000,
    coordinates: { lat: 14.398, lng: 78.601 },
    lastContact: '7h 48m ago',
    lastContactMinutesAgo: 468,
    telemetryStatus: 'silent',
    commander: 'Maj. K. Sen (Unverified)',
    resources: {
      water: { currentStock: 5200, safetyStock: 12000, dailyRate: 3.6, unit: 'Liters' }, // ACUTE SHORTAGE
      food: { currentStock: 3800, safetyStock: 4500, dailyRate: 2.0, unit: 'Ration Packs' },
      ors: { currentStock: 410, safetyStock: 1200, dailyRate: 0.38, unit: 'Sachets' },
      medicine: { currentStock: 82, safetyStock: 180, dailyRate: 0.045, unit: 'Trauma Kits' },
      blankets: { currentStock: 1100, safetyStock: 800, dailyRate: 0, unit: 'Units' },
      sanitation: { currentStock: 450, safetyStock: 500, dailyRate: 0.08, unit: 'Hygiene Kits' },
    }
  },
  {
    id: 'camp-echo',
    name: 'Camp Echo (Pine Ridge Outpost)',
    code: 'CP-ECHO',
    population: 620,
    maxCapacity: 750,
    location: 'Sector 5 - Foothills Reserve',
    elevation: '315m',
    terrain: 'rocky',
    floodRisk: 'low',
    roadAccess: 'dirt',
    areaSqMeters: 22000,
    coordinates: { lat: 14.652, lng: 78.368 },
    lastContact: '3h 22m ago',
    lastContactMinutesAgo: 202,
    telemetryStatus: 'stale',
    commander: 'Officer V. Thomas',
    resources: {
      water: { currentStock: 14500, safetyStock: 3500, dailyRate: 3.2, unit: 'Liters' }, // SURPLUS
      food: { currentStock: 4800, safetyStock: 1200, dailyRate: 1.9, unit: 'Ration Packs' }, // SURPLUS
      ors: { currentStock: 1950, safetyStock: 400, dailyRate: 0.30, unit: 'Sachets' }, // SURPLUS
      medicine: { currentStock: 190, safetyStock: 55, dailyRate: 0.035, unit: 'Trauma Kits' }, // SURPLUS
      blankets: { currentStock: 980, safetyStock: 250, dailyRate: 0, unit: 'Units' },
      sanitation: { currentStock: 610, safetyStock: 150, dailyRate: 0.07, unit: 'Hygiene Kits' },
    }
  },
  {
    id: 'camp-zeta',
    name: 'Camp Zeta (Central Stadium Refuge)',
    code: 'CP-ZETA',
    population: 3400,
    maxCapacity: 4000,
    location: 'Sector 2 - Metropolitan Hub',
    elevation: '94m',
    terrain: 'flat',
    floodRisk: 'medium',
    roadAccess: 'paved',
    areaSqMeters: 90000,
    coordinates: { lat: 14.515, lng: 78.445 },
    lastContact: '5 mins ago',
    lastContactMinutesAgo: 5,
    telemetryStatus: 'active',
    commander: 'Col. A. Mukherjee',
    resources: {
      water: { currentStock: 68000, safetyStock: 20000, dailyRate: 3.5, unit: 'Liters' }, // LARGE SURPLUS
      food: { currentStock: 24500, safetyStock: 7000, dailyRate: 2.0, unit: 'Ration Packs' }, // LARGE SURPLUS
      ors: { currentStock: 8200, safetyStock: 2000, dailyRate: 0.35, unit: 'Sachets' }, // SURPLUS
      medicine: { currentStock: 890, safetyStock: 280, dailyRate: 0.04, unit: 'Trauma Kits' }, // SURPLUS
      blankets: { currentStock: 3900, safetyStock: 1200, dailyRate: 0, unit: 'Units' },
      sanitation: { currentStock: 2400, safetyStock: 800, dailyRate: 0.08, unit: 'Hygiene Kits' },
    }
  }
];

// Distance matrix in Kilometers between camps
export const DISTANCE_MATRIX = {
  'camp-alpha': { 'camp-beta': 14.2, 'camp-delta': 26.5, 'camp-echo': 11.8, 'camp-zeta': 8.4 },
  'camp-beta': { 'camp-alpha': 14.2, 'camp-delta': 16.0, 'camp-echo': 23.4, 'camp-zeta': 9.8 },
  'camp-delta': { 'camp-alpha': 26.5, 'camp-beta': 16.0, 'camp-echo': 37.1, 'camp-zeta': 20.3 },
  'camp-echo': { 'camp-alpha': 11.8, 'camp-beta': 23.4, 'camp-delta': 37.1, 'camp-zeta': 17.6 },
  'camp-zeta': { 'camp-alpha': 8.4, 'camp-beta': 9.8, 'camp-delta': 20.3, 'camp-echo': 17.6 },
};

// Initial Camp-to-Camp Barter & Transfer Transactions
export const INITIAL_TRANSFERS = [
  {
    id: 'TR-1081',
    fromCampId: 'camp-alpha',
    toCampId: 'camp-beta',
    resourceKey: 'water',
    resourceName: 'Potable Water',
    quantity: 3500,
    unit: 'Liters',
    distanceKm: 14.2,
    status: 'dispatched', // 'requested' | 'approved' | 'dispatched' | 'received' | 'declined'
    urgency: 'HIGH',
    timestamp: '2026-10-23 13:40',
    dispatchedAt: '2026-10-23 14:10',
    convoy: 'Tanker Unit 4 - Escort B',
    donorRemainingAfterTransfer: 25000,
    notes: 'Emergency water dispatch to prevent Camp Beta critical dehydration threshold.'
  },
  {
    id: 'TR-1082',
    fromCampId: 'camp-zeta',
    toCampId: 'camp-delta',
    resourceKey: 'ors',
    resourceName: 'ORS Sachets',
    quantity: 1200,
    unit: 'Sachets',
    distanceKm: 20.3,
    status: 'approved',
    urgency: 'CRITICAL',
    timestamp: '2026-10-23 14:05',
    dispatchedAt: null,
    convoy: 'Rapid Van 02',
    donorRemainingAfterTransfer: 7000,
    notes: 'Camp Delta reported acute diarrhea cluster before radio silence.'
  },
  {
    id: 'TR-1083',
    fromCampId: 'camp-echo',
    toCampId: 'camp-beta',
    resourceKey: 'medicine',
    resourceName: 'Trauma Kits',
    quantity: 40,
    unit: 'Trauma Kits',
    distanceKm: 23.4,
    status: 'received',
    urgency: 'HIGH',
    timestamp: '2026-10-23 11:15',
    dispatchedAt: '2026-10-23 11:50',
    receivedAt: '2026-10-23 13:20',
    convoy: 'Medic Courier Delta-9',
    donorRemainingAfterTransfer: 150,
    notes: 'Delivered and verified into Camp Beta clinic stock.'
  }
];

// Initial Priority Queue Tokens
// Separates clinical urgency (acute distress) from demographic flags (elderly, infants, pregnancy)
export const INITIAL_TOKENS = [
  {
    id: 'TK-P1-104',
    tokenNumber: 'P1-104',
    priority: 'P1',
    category: 'Immediate Emergency',
    citizenName: 'Devika Sharma (Family Rep)',
    campId: 'camp-zeta',
    serviceNeeded: 'Emergency Triage & Resuscitation',
    clinicalUrgency: 'High acute distress - Severe dyspnea & suspected pulmonary edema',
    demographicFactors: ['Elderly (68)', 'Cardiac History'],
    assignedBay: 'Trauma Bay 1',
    status: 'in-service', // 'waiting' | 'in-service' | 'completed' | 'deferred'
    createdAt: '14:22',
    estimatedWaitMinutes: 0,
    triageNotes: 'Immediate oxygen therapy initiated. Non-demographic clinical assignment.'
  },
  {
    id: 'TK-P1-105',
    tokenNumber: 'P1-105',
    priority: 'P1',
    category: 'Immediate Emergency',
    citizenName: 'Manoj Verma',
    campId: 'camp-beta',
    serviceNeeded: 'Severe Dehydration / Pediatric Shock',
    clinicalUrgency: 'Lethargic infant, skin turgor loss, >10% fluid deficit',
    demographicFactors: ['Infant (9 mos)'],
    assignedBay: 'Pediatric Stabilization Bay',
    status: 'waiting',
    createdAt: '14:38',
    estimatedWaitMinutes: 3,
    triageNotes: 'Immediate IV access prepared. Clinical vital threshold met.'
  },
  {
    id: 'TK-P2-221',
    tokenNumber: 'P2-221',
    priority: 'P2',
    category: 'High Priority',
    citizenName: 'Fatima Begum',
    campId: 'camp-alpha',
    serviceNeeded: 'Maternal Assessment',
    clinicalUrgency: 'Mild abdominal cramping, no active hemorrhage or fetal distress',
    demographicFactors: ['Third Trimester Pregnancy (34 wks)'],
    assignedBay: 'Maternal Health Clinic',
    status: 'waiting',
    createdAt: '14:15',
    estimatedWaitMinutes: 14,
    triageNotes: 'Demographic vulnerability prioritized as P2. Stable vitals.'
  },
  {
    id: 'TK-P2-222',
    tokenNumber: 'P2-222',
    priority: 'P2',
    category: 'High Priority',
    citizenName: 'Hari Prasad',
    campId: 'camp-zeta',
    serviceNeeded: 'Mobility Assist & Wound Dressing',
    clinicalUrgency: 'Clean post-op incision with wet dressing, no sepsis signs',
    demographicFactors: ['Physical Disability (Wheelchair user)', 'Elderly (72)'],
    assignedBay: 'Wound Care Desk 2',
    status: 'waiting',
    createdAt: '14:25',
    estimatedWaitMinutes: 22,
    triageNotes: 'Assisted queue positioning. Prioritized for mobility accommodation.'
  },
  {
    id: 'TK-P3-340',
    tokenNumber: 'P3-340',
    priority: 'P3',
    category: 'Standard Priority',
    citizenName: 'Anand Kumar',
    campId: 'camp-alpha',
    serviceNeeded: 'Dry Ration Replenishment',
    clinicalUrgency: 'Routine food replenishment for family of 3, no medical issues',
    demographicFactors: [],
    assignedBay: 'Distribution Point 4',
    status: 'waiting',
    createdAt: '14:10',
    estimatedWaitMinutes: 45,
    triageNotes: 'Standard queue processing.'
  },
  {
    id: 'TK-P3-341',
    tokenNumber: 'P3-341',
    priority: 'P3',
    category: 'Standard Priority',
    citizenName: 'Sunita Rawat',
    campId: 'camp-beta',
    serviceNeeded: 'Sanitation Kit & Mosquito Netting',
    clinicalUrgency: 'Shelter hygiene supplies request, preventative only',
    demographicFactors: [],
    assignedBay: 'Sanitation Counter B',
    status: 'waiting',
    createdAt: '14:30',
    estimatedWaitMinutes: 52,
    triageNotes: 'Queue allocation based on inventory arrival batch.'
  }
];

// Initial Citizen Quick-Help Requests
export const INITIAL_CITIZEN_REQUESTS = [
  {
    id: 'CR-9041',
    type: 'MEDICAL',
    categoryLabel: 'Medical Emergency',
    campId: 'camp-beta',
    campName: 'Camp Beta (River Valley Relief)',
    locationNote: 'Sector B, Tent 47 near East drainage ditch',
    urgency: 'HIGH',
    details: 'Elderly grandfather experiencing chest tightness and dizzy spells. Cannot walk to clinic.',
    contactInfo: 'Tent Neighbor / Radio Ch. 4',
    status: 'DISPATCHED',
    submittedAt: '14:28',
    responder: 'Medic Unit 2'
  },
  {
    id: 'CR-9042',
    type: 'FOOD',
    categoryLabel: 'Emergency Food / Water',
    campId: 'camp-delta',
    campName: 'Camp Delta (Coastal Sector 4)',
    locationNote: 'North Perimeter Gate, under blue canvas shade',
    urgency: 'URGENT',
    details: 'Arrived 2 hours ago from flood zone. 2 young children have not eaten since morning, need clean water.',
    contactInfo: 'Camp Welfare Volunteer Tag #41',
    status: 'PROCESSING',
    submittedAt: '14:12',
    responder: 'Kitchen Logistics Team'
  },
  {
    id: 'CR-9043',
    type: 'SHELTER',
    categoryLabel: 'Shelter & Bedding',
    campId: 'camp-alpha',
    campName: 'Camp Alpha (Highland Safe Haven)',
    locationNote: 'Arrival Staging Bay 3',
    urgency: 'STANDARD',
    details: 'Family of 5 displaced from landslide area. Heavy rain expected tonight, need waterproof family tent.',
    contactInfo: 'Registration Desk B',
    status: 'ALLOCATED',
    submittedAt: '13:55',
    responder: 'Tenting Quartermaster'
  }
];

// Initial Silent Camp Telemetry & Verification Logs
export const INITIAL_SILENT_INCIDENTS = [
  {
    campId: 'camp-delta',
    campName: 'Camp Delta (Coastal Sector 4)',
    lastCheckIn: '7h 48m ago',
    missedCheckins: 3,
    status: 'CRITICAL_SILENCE',
    telemetryPacketLoss: '94%',
    lastKnownStatus: 'Generator diesel fuel critical (8%), rising perimeter water level',
    verificationTriggered: true,
    verificationMethod: 'HAM Radio Relay + Drone Recon Dispatch',
    verificationStatus: 'Drone En Route (ETA 18m)',
    operatorNotes: 'WARNING: Missing data triggers urgent field verification. NOT declaring camp empty.',
    logs: [
      { time: '07:00', text: 'Scheduled automated ping successful. Stock telemetry received.' },
      { time: '09:30', text: 'Missed scheduled heartbeat 1. Retrying backup telemetry relay.' },
      { time: '12:00', text: 'Missed scheduled heartbeat 2. VHF radio beacon unresponsive.' },
      { time: '14:15', text: 'Protocol Delta-9: Control Room operator dispatched emergency UAV recon.' }
    ]
  },
  {
    campId: 'camp-echo',
    campName: 'Camp Echo (Pine Ridge Outpost)',
    lastCheckIn: '3h 22m ago',
    missedCheckins: 1,
    status: 'STALE_TELEMETRY',
    telemetryPacketLoss: '45%',
    lastKnownStatus: 'Solar battery array overcast depletion, manual logging engaged',
    verificationTriggered: false,
    verificationMethod: 'Local Volunteer Relay Check',
    verificationStatus: 'Pending Operator Call',
    operatorNotes: 'Telemetry stale due to cloud cover. Radio channel 8 intermittently active.',
    logs: [
      { time: '11:20', text: 'Routine telemetry sync completed.' },
      { time: '13:00', text: 'Telemetry packet latency spike (12,400ms).' },
      { time: '14:00', text: 'Stale flag activated (>3h without inventory update).' }
    ]
  }
];

// Initial Volunteers & Tasks
export const INITIAL_VOLUNTEERS = [
  {
    id: 'vol-1',
    name: 'Dr. Priya Sundaram',
    role: 'Emergency Medical Specialist',
    skills: ['Triage', 'Pediatrics', 'IV Therapy', 'Trauma'],
    phone: '+91 98450 11234',
    baseLocation: 'Sector 2 (Near Camp Zeta)',
    currentCampId: 'camp-zeta',
    status: 'available', // 'available' | 'assigned' | 'resting'
    experienceYears: 7,
    verifiedBadge: true,
    distanceKmToNearestTask: 2.1
  },
  {
    id: 'vol-2',
    name: 'Vikramjit Singh',
    role: 'Heavy Logistics & Transport',
    skills: ['Heavy Truck Driving', 'Mechanical Repair', 'Forklift', 'Night Navigation'],
    phone: '+91 98112 55431',
    baseLocation: 'Sector 1 (Near Camp Alpha)',
    currentCampId: 'camp-alpha',
    status: 'assigned',
    experienceYears: 5,
    verifiedBadge: true,
    distanceKmToNearestTask: 0.8
  },
  {
    id: 'vol-3',
    name: 'Meera Chacko',
    role: 'Water & Sanitation Engineer',
    skills: ['Water Purification', 'Drainage Sanitation', 'Chlorination', 'EHS'],
    phone: '+91 94471 88921',
    baseLocation: 'Sector 3 (Near Camp Beta)',
    currentCampId: 'camp-beta',
    status: 'available',
    experienceYears: 4,
    verifiedBadge: true,
    distanceKmToNearestTask: 4.3
  },
  {
    id: 'vol-4',
    name: 'Arjun Rathore',
    role: 'Search, Rescue & HAM Radio',
    skills: ['VHF/HAM Radio', 'First Aid', 'Drone Pilot', 'Swiftwater Rescue'],
    phone: '+91 97233 44109',
    baseLocation: 'Sector 4 (Near Camp Delta)',
    currentCampId: 'camp-delta',
    status: 'available',
    experienceYears: 6,
    verifiedBadge: true,
    distanceKmToNearestTask: 6.2
  },
  {
    id: 'vol-5',
    name: 'Ananya Guha',
    role: 'Community Kitchen & Rations Lead',
    skills: ['Bulk Cooking', 'Food Safety', 'Inventory Auditing', 'Crisis Counseling'],
    phone: '+91 98302 77812',
    baseLocation: 'Sector 2 (Near Camp Zeta)',
    currentCampId: 'camp-zeta',
    status: 'available',
    experienceYears: 3,
    verifiedBadge: true,
    distanceKmToNearestTask: 1.5
  }
];

export const INITIAL_TASKS = [
  {
    id: 'TSK-301',
    title: 'Operate Reverse-Osmosis Water Purification Rig',
    campId: 'camp-beta',
    campName: 'Camp Beta (River Valley Relief)',
    requiredSkills: ['Water Purification', 'Chlorination'],
    urgency: 'CRITICAL',
    volunteersNeeded: 2,
    volunteersAssigned: ['vol-3'],
    status: 'in-progress', // 'open' | 'in-progress' | 'completed'
    description: 'Camp Beta water stocks critical. Need skilled technicians to commission 2,000L/hr RO unit by riverbank.',
    distanceFromBase: '3.2 km',
    matchScore: 96
  },
  {
    id: 'TSK-302',
    title: 'Emergency Pediatric Dehydration Stabilization',
    campId: 'camp-zeta',
    campName: 'Camp Zeta (Central Stadium Refuge)',
    requiredSkills: ['Triage', 'Pediatrics', 'IV Therapy'],
    urgency: 'CRITICAL',
    volunteersNeeded: 2,
    volunteersAssigned: [],
    status: 'open',
    description: 'Surge of 30+ pediatric gastro cases reported. Assist medical officers in Bay 2 with rehydration protocols.',
    distanceFromBase: '1.4 km',
    matchScore: 98
  },
  {
    id: 'TSK-303',
    title: 'Night Escort: High-Capacity Potable Water Tanker',
    campId: 'camp-alpha',
    campName: 'Camp Alpha -> Camp Beta Transfer',
    requiredSkills: ['Heavy Truck Driving', 'Night Navigation'],
    urgency: 'HIGH',
    volunteersNeeded: 1,
    volunteersAssigned: ['vol-2'],
    status: 'in-progress',
    description: 'Drive 8,000L water bowser through gravel mountain pass safely. Radio check-in every 15 minutes.',
    distanceFromBase: '0.8 km',
    matchScore: 95
  },
  {
    id: 'TSK-304',
    title: 'HAM Radio Emergency Relay Deployment',
    campId: 'camp-delta',
    campName: 'Camp Delta Perimeter',
    requiredSkills: ['VHF/HAM Radio', 'Drone Pilot'],
    urgency: 'CRITICAL',
    volunteersNeeded: 1,
    volunteersAssigned: [],
    status: 'open',
    description: 'Ascend high ground at Point Bravo (elevation 45m) and establish directional repeater to re-connect Camp Delta.',
    distanceFromBase: '5.8 km',
    matchScore: 92
  }
];

// Disaster-Safe Routes (Simulated Mock Routing)
export const INITIAL_ROUTES = [
  {
    id: 'RT-1',
    from: 'Camp Alpha',
    to: 'Camp Beta',
    distance: '14.2 km',
    standardDuration: '22 mins',
    simulatedDuration: '38 mins',
    safetyRating: 'CAUTION',
    hazardSummary: 'Gravel washouts at km 8; 1 lane obstructed',
    status: 'PASSABLE_WITH_ESCORT',
    waypoints: [
      { name: 'Northern Plateau Gate', status: 'CLEAR', km: 0 },
      { name: 'Pine Creek Crossing', status: 'SLOW_FLOW', km: 5.4 },
      { name: 'Rockfall Washout Section', status: 'DEBRIS_PARTIAL', km: 8.2 },
      { name: 'River Valley Checkpoint', status: 'CLEAR', km: 14.2 },
    ],
    recommendedVehicle: '4x4 High-Clearance / Heavy Bowsers',
    advisory: 'Advisory simulated route. Ground team confirmed mud clearance in progress.'
  },
  {
    id: 'RT-2',
    from: 'Camp Zeta',
    to: 'Camp Delta',
    distance: '20.3 km',
    standardDuration: '28 mins',
    simulatedDuration: 'BLOCKED',
    safetyRating: 'IMPASSABLE',
    hazardSummary: 'Bridge 4 approach submerged under 1.4m tidal flood surge',
    status: 'ROAD_CLOSED',
    waypoints: [
      { name: 'Metropolitan Terminal', status: 'CLEAR', km: 0 },
      { name: 'Outer Ring Bypass', status: 'CLEAR', km: 7.1 },
      { name: 'Saltmarsh Bridge 4', status: 'SUBMERGED_CRITICAL', km: 15.6 },
      { name: 'Coastal Sector 4 Gate', status: 'FLOOD_WATCH', km: 20.3 },
    ],
    recommendedVehicle: 'AMPHIBIOUS / AIRBOAT ONLY',
    advisory: 'DO NOT DISPATCH STANDARD ROAD CONVOYS. Bridge submerged.'
  },
  {
    id: 'RT-3',
    from: 'Camp Alpha',
    to: 'Camp Zeta',
    distance: '8.4 km',
    standardDuration: '14 mins',
    simulatedDuration: '16 mins',
    safetyRating: 'OPTIMAL',
    hazardSummary: 'Clear expressway corridor; military patrol active',
    status: 'SAFE_CORRIDOR',
    waypoints: [
      { name: 'Plateau Gate', status: 'CLEAR', km: 0 },
      { name: 'Expressway Flyover', status: 'CLEAR', km: 4.2 },
      { name: 'Stadium Logistics Gate', status: 'CLEAR', km: 8.4 },
    ],
    recommendedVehicle: 'All Vehicles & Light Ambulances',
    advisory: 'Primary logistics lifeline. Dedicated emergency lanes open.'
  },
  {
    id: 'RT-4',
    from: 'Camp Echo',
    to: 'Camp Beta',
    distance: '23.4 km',
    standardDuration: '35 mins',
    simulatedDuration: '52 mins',
    safetyRating: 'CAUTION',
    hazardSummary: 'Narrow mountain hairpins, intermittent fog, fallen timber',
    status: 'PASSABLE_SLOW',
    waypoints: [
      { name: 'Ridge Outpost', status: 'CLEAR', km: 0 },
      { name: 'Switchback 7', status: 'FOG_LOW_VISIBILITY', km: 9.3 },
      { name: 'Timberland Bend', status: 'TIMBER_CLEARED', km: 16.0 },
      { name: 'Valley Influx Road', status: 'CLEAR', km: 23.4 },
    ],
    recommendedVehicle: 'Experienced Drivers, High-Traction Tires',
    advisory: 'Caution required during dusk and rainfall.'
  }
];

// Layout Planner Default Templates & Zones
export const LAYOUT_ZONES_CONFIG = [
  {
    id: 'triage',
    name: 'Medical & Triage Zone',
    icon: 'Activity',
    color: '#F05252',
    bg: 'bg-critical/20 border-critical',
    defaultMinDistanceToToiletsMeters: 40,
    requiresWaterAccess: true,
    description: 'Immediate trauma bays, isolation tent, pharmacy and decontamination'
  },
  {
    id: 'water',
    name: 'Water & Purification Station',
    icon: 'Droplets',
    color: '#38BDF8',
    bg: 'bg-sky-500/20 border-sky-500',
    defaultMinDistanceToToiletsMeters: 50,
    requiresWaterAccess: true,
    description: 'Bladder tanks, chlorine dosing, rapid jerrycan dispensing taps'
  },
  {
    id: 'kitchen',
    name: 'Community Kitchen & Rations',
    icon: 'Utensils',
    color: '#D99055',
    bg: 'bg-copper/20 border-copper',
    defaultMinDistanceToToiletsMeters: 35,
    requiresWaterAccess: true,
    description: 'Bulk cookers, dry ration storage, hygiene washing stations'
  },
  {
    id: 'sleeping',
    name: 'Family Sleeping Tents Block',
    icon: 'Home',
    color: '#A89F91',
    bg: 'bg-cream-muted/20 border-cream-muted',
    defaultMinDistanceToToiletsMeters: 20,
    requiresWaterAccess: false,
    description: 'Ventilated weather-proof family modules with privacy partitions'
  },
  {
    id: 'toilets',
    name: 'Latrines & Hygiene Block',
    icon: 'ShieldAlert',
    color: '#EAB308',
    bg: 'bg-amber-500/20 border-amber-500',
    defaultMinDistanceToToiletsMeters: 0,
    requiresWaterAccess: false,
    mustBeDownwindAndDownhill: true,
    description: 'Trench latrines, greywater soak pits, handwashing stations'
  },
  {
    id: 'storage',
    name: 'Logistics Warehouse & Depot',
    icon: 'Box',
    color: '#A855F7',
    bg: 'bg-purple-500/20 border-purple-500',
    defaultMinDistanceToToiletsMeters: 15,
    requiresWaterAccess: false,
    description: 'Secured shelter for medicines, blankets, power generation fuel'
  },
  {
    id: 'exit',
    name: 'Primary Evacuation & Emergency Exits',
    icon: 'LogOut',
    color: '#35C98A',
    bg: 'bg-emerald/20 border-emerald',
    defaultMinDistanceToToiletsMeters: 10,
    requiresWaterAccess: false,
    description: 'Unobstructed 12m perimeter corridors with helipad/ambulance access'
  }
];
