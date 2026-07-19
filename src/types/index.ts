export type PersonaMode = 'fan' | 'staff';

export type SupportedLanguage = 'en' | 'es' | 'fr';

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  capacity: number;
  image: string;
  matches: string[];
  accessibilityFeatures: string[];
  gates: GateInfo[];
  concessions: ServicePoint[];
  restrooms: ServicePoint[];
  currentCrowdLevel: 'low' | 'moderate' | 'high' | 'peak';
}

export interface GateInfo {
  id: string;
  name: string;
  wheelchairAccessible: boolean;
  elevatorNearby: boolean;
  currentWaitMinutes: number;
  status: 'open' | 'congested' | 'closed';
  recommendedSections: string[];
}

export interface ServicePoint {
  id: string;
  name: string;
  type: 'concession' | 'restroom' | 'first-aid' | 'merchandise' | 'information';
  location: string;
  wheelchairAccessible: boolean;
  currentWaitMinutes: number;
  sustainabilityRating: 'A' | 'B' | 'C'; // Eco rating
}

export interface IncidentReport {
  id: string;
  timestamp: string;
  location: string;
  type: 'crowd_density' | 'accessibility_request' | 'medical' | 'spill_clean' | 'general_query';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'triaged' | 'dispatching' | 'resolved';
  description: string;
  aiSuggestedAction: string;
  assignedStaff?: string;
}

export interface CrowdTelemetry {
  timestamp: string;
  zone: string;
  densityPercentage: number;
  flowRatePerMin: number;
  anomalyDetected: boolean;
  aiRiskAssessment: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSizeMultiplier: number; // 1, 1.15, 1.3
  reducedMotion: boolean;
  screenReaderVoice: boolean;
  screenReaderRate: number;
  language: SupportedLanguage;
}

export interface GenAISecurityAudit {
  isSafe: boolean;
  flaggedCategories: string[];
  sanitizedPrompt: string;
  timestamp: string;
}

export interface GenAIResponse {
  answer: string;
  suggestedActions?: string[];
  confidence: number;
  sources?: string[];
  securityAudit: GenAISecurityAudit;
}
