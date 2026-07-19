import { Stadium, IncidentReport, CrowdTelemetry } from '../types';

export const FIFA_STADIUMS: Stadium[] = [
  {
    id: 'metlife',
    name: 'MetLife Stadium (FIFA Final Venue)',
    city: 'East Rutherford, NJ / New York',
    country: 'USA',
    capacity: 82500,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    matches: ['Group Stage', 'Round of 32', 'Round of 16', 'Final (July 19, 2026)'],
    accessibilityFeatures: [
      'ADAG-compliant Ramps & Elevators at Gates A, E, F',
      'Assistive Listening Devices (ALD) available at Guest Services Gate E',
      'Sensory Inclusive Quiet Rooms (Sec 201 & Sec 315)',
      'Tactile Paving & Braille Signage throughout Concourse',
      'Wheelchair Seating with Companion Seats in all sections'
    ],
    currentCrowdLevel: 'high',
    gates: [
      {
        id: 'gate-a',
        name: 'Gate A (MetLife Central - North)',
        wheelchairAccessible: true,
        elevatorNearby: true,
        currentWaitMinutes: 12,
        status: 'open',
        recommendedSections: ['101-120', '201-215', '301-325']
      },
      {
        id: 'gate-b',
        name: 'Gate B (Verizon West)',
        wheelchairAccessible: true,
        elevatorNearby: true,
        currentWaitMinutes: 24,
        status: 'congested',
        recommendedSections: ['121-135', '216-228', '326-340']
      },
      {
        id: 'gate-c',
        name: 'Gate C (Pepsi South)',
        wheelchairAccessible: false,
        elevatorNearby: false,
        currentWaitMinutes: 8,
        status: 'open',
        recommendedSections: ['136-150', '229-240', '341-350']
      },
      {
        id: 'gate-e',
        name: 'Gate E (Accessibility Priority & VIP)',
        wheelchairAccessible: true,
        elevatorNearby: true,
        currentWaitMinutes: 4,
        status: 'open',
        recommendedSections: ['All Sections (Express Accessibility)']
      }
    ],
    concessions: [
      {
        id: 'conc-1',
        name: 'Global FIFA Flavors & Tacos',
        type: 'concession',
        location: 'Concourse Level 1, Sec 118',
        wheelchairAccessible: true,
        currentWaitMinutes: 7,
        sustainabilityRating: 'A'
      },
      {
        id: 'conc-2',
        name: 'Eco-Hydration & Vegan Express',
        type: 'concession',
        location: 'Concourse Level 2, Sec 220',
        wheelchairAccessible: true,
        currentWaitMinutes: 3,
        sustainabilityRating: 'A'
      },
      {
        id: 'rest-1',
        name: 'Family & Gender-Neutral Restroom (Accessible)',
        type: 'restroom',
        location: 'Concourse Level 1, Near Sec 112',
        wheelchairAccessible: true,
        currentWaitMinutes: 4,
        sustainabilityRating: 'A'
      },
      {
        id: 'aid-1',
        name: 'Stadium Main First Aid & Medical',
        type: 'first-aid',
        location: 'West Plaza, Sec 133',
        wheelchairAccessible: true,
        currentWaitMinutes: 0,
        sustainabilityRating: 'A'
      }
    ]
  },
  {
    id: 'azteca',
    name: 'Estadio Azteca (Opening Match Venue)',
    city: 'Mexico City',
    country: 'Mexico',
    capacity: 87523,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
    matches: ['Opening Match (June 11, 2026)', 'Group Stage', 'Round of 32'],
    accessibilityFeatures: [
      'Express Access Corridor Gate 1 & Gate 8',
      'Audio Description Headsets in Spanish & English',
      'Dedicated Companion Seating Rows 10-15',
      'Accessible Shuttle Service from Tren Ligero Station'
    ],
    currentCrowdLevel: 'moderate',
    gates: [
      {
        id: 'az-gate-1',
        name: 'Acceso Principal 1 (North Access)',
        wheelchairAccessible: true,
        elevatorNearby: true,
        currentWaitMinutes: 15,
        status: 'open',
        recommendedSections: ['Zonas 100-200']
      },
      {
        id: 'az-gate-8',
        name: 'Acceso Preferencial (Accessibility Express)',
        wheelchairAccessible: true,
        elevatorNearby: true,
        currentWaitMinutes: 5,
        status: 'open',
        recommendedSections: ['Todas las Zonas Accesibles']
      }
    ],
    concessions: [
      {
        id: 'az-conc-1',
        name: 'Tacos de Canasta & Zero-Waste Drinks',
        type: 'concession',
        location: 'Plaza Alta Norte',
        wheelchairAccessible: true,
        currentWaitMinutes: 5,
        sustainabilityRating: 'A'
      }
    ],
    restrooms: [
      {
        id: 'az-rest-1',
        name: 'Baños Adaptados Silla de Ruedas',
        type: 'restroom',
        location: 'Zona 100 Norte',
        wheelchairAccessible: true,
        currentWaitMinutes: 6,
        sustainabilityRating: 'B'
      }
    ]
  },
  {
    id: 'bc-place',
    name: 'BC Place',
    city: 'Vancouver',
    country: 'Canada',
    capacity: 54500,
    image: 'https://images.unsplash.com/photo-1459865264668-3ac5001da395?auto=format&fit=crop&w=800&q=80',
    matches: ['Group Stage', 'Round of 32', 'Round of 16'],
    accessibilityFeatures: [
      'All 4 Main Entry Gates are Fully Accessible',
      'Universal Accessible Restrooms on every level',
      'Sensory Kits available at Customer Service Gate A',
      'Direct SkyTrain Transit Elevator Link'
    ],
    currentCrowdLevel: 'low',
    gates: [
      {
        id: 'bc-gate-a',
        name: 'Gate A (Terry Fox Plaza)',
        wheelchairAccessible: true,
        elevatorNearby: true,
        currentWaitMinutes: 4,
        status: 'open',
        recommendedSections: ['201-224', '401-424']
      }
    ],
    concessions: [
      {
        id: 'bc-conc-1',
        name: 'Pacific Sustainable Salmon & Vegan Bowls',
        type: 'concession',
        location: 'Level 2 Concourse, Sec 214',
        wheelchairAccessible: true,
        currentWaitMinutes: 2,
        sustainabilityRating: 'A'
      }
    ],
    restrooms: [
      {
        id: 'bc-rest-1',
        name: 'Universal Accessible Restroom',
        type: 'restroom',
        location: 'Level 2, Sec 208',
        wheelchairAccessible: true,
        currentWaitMinutes: 2,
        sustainabilityRating: 'A'
      }
    ]
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-2026-001',
    timestamp: '21:15',
    location: 'Gate B Concourse (MetLife Stadium)',
    type: 'crowd_density',
    severity: 'high',
    status: 'triaged',
    description: 'High crowd density detected near turnstiles 12-18 following shuttle bus arrival.',
    aiSuggestedAction: 'GenAI Recommendation: Redirect 35% of incoming flow to Gate E Express entrance via LED stadium signage and broadcast audio prompt.'
  },
  {
    id: 'INC-2026-002',
    timestamp: '21:05',
    location: 'Section 114 Accessible Seating',
    type: 'accessibility_request',
    severity: 'medium',
    status: 'dispatching',
    description: 'Fan requested ALD headset replacement and wheelchair companion assistance.',
    aiSuggestedAction: 'GenAI Recommendation: Volunteer Team #4 dispatched with backup ALD kit (ETA 2 mins).'
  },
  {
    id: 'INC-2026-003',
    timestamp: '20:50',
    location: 'Level 2 Eco-Concession Sec 220',
    type: 'spill_clean',
    severity: 'low',
    status: 'resolved',
    description: 'Liquid spill reported near counter.',
    aiSuggestedAction: 'Sanitization team deployed and completed clean-up in 3 minutes.'
  }
];

export const INITIAL_CROWD_TELEMETRY: CrowdTelemetry[] = [
  {
    timestamp: '21:24:00',
    zone: 'Gate A Entrance Plaza',
    densityPercentage: 42,
    flowRatePerMin: 180,
    anomalyDetected: false,
    aiRiskAssessment: 'Optimal flow rate. Normal queue waiting time (~6 mins).'
  },
  {
    timestamp: '21:24:00',
    zone: 'Gate B Turnstiles',
    densityPercentage: 88,
    flowRatePerMin: 410,
    anomalyDetected: true,
    aiRiskAssessment: 'High Bottleneck Risk: 88% capacity reached. Recommend activating secondary scanning lanes.'
  },
  {
    timestamp: '21:24:00',
    zone: 'South Concourse Food Court',
    densityPercentage: 65,
    flowRatePerMin: 220,
    anomalyDetected: false,
    aiRiskAssessment: 'Moderate density. Average wait time 5 mins.'
  },
  {
    timestamp: '21:24:00',
    zone: 'Gate E Accessibility Corridor',
    densityPercentage: 25,
    flowRatePerMin: 45,
    anomalyDetected: false,
    aiRiskAssessment: 'Smooth priority flow. Zero delay for wheelchair access.'
  }
];
