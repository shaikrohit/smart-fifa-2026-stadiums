import type { SupportedLanguage } from '../types';

/** Tournament Name Constant */
export const TOURNAMENT_NAME = 'FIFA World Cup 2026';

/** FIFA Host Countries */
export const HOST_COUNTRIES = ['USA', 'Canada', 'Mexico'] as const;

/** Supported Languages Map */
export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: 'en', label: 'English (US)' },
  { code: 'es', label: 'Español (MX)' },
  { code: 'fr', label: 'Français (CA)' }
];

/** Accessibility Font Scale Options */
export const FONT_SCALE_STEPS = [1, 1.15, 1.3] as const;

/** Default Security Rate Limit Threshold */
export const MAX_QUERIES_PER_WINDOW = 15;
export const RATE_WINDOW_DURATION_MS = 60000;
