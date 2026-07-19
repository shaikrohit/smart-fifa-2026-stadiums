import DOMPurify from 'dompurify';
import type { GenAISecurityAudit } from '../types';

/**
 * Sanitizes input string against XSS, Prompt Injection, and Code Injection vectors.
 *
 * @param rawInput - User raw query string.
 * @returns Cleaned string and audit metadata.
 */
export function sanitizePromptString(rawInput: string): { cleaned: string; isSafe: boolean; flagged: string[] } {
  if (!rawInput || typeof rawInput !== 'string') {
    return { cleaned: '', isSafe: false, flagged: ['Empty or invalid input'] };
  }

  const flagged: string[] = [];
  let cleaned = rawInput.trim().slice(0, 1000);

  const patterns = [
    { name: 'Prompt Injection', regex: /ignore\s+(all\s+)?previous\s+instructions/i },
    { name: 'System Override', regex: /system\s+prompt\s+override/i },
    { name: 'XSS Script', regex: /<script.*?>.*?<\/script>/gi },
    { name: 'SQL Injection', regex: /(UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO)/i }
  ];

  for (const p of patterns) {
    if (p.regex.test(cleaned)) {
      flagged.push(p.name);
      cleaned = cleaned.replace(p.regex, '[REDACTED]');
    }
  }

  if (typeof window !== 'undefined' && DOMPurify.sanitize) {
    cleaned = DOMPurify.sanitize(cleaned);
  }

  cleaned = cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  return {
    cleaned,
    isSafe: flagged.length === 0,
    flagged
  };
}

/**
 * Creates a structured GenAISecurityAudit object for logging and UI transparency.
 */
export function createSecurityAuditRecord(prompt: string, isSafe: boolean, flagged: string[]): GenAISecurityAudit {
  return {
    isSafe,
    flaggedCategories: flagged,
    sanitizedPrompt: prompt,
    timestamp: new Date().toLocaleTimeString()
  };
}
