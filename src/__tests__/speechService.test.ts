import { describe, it, expect } from 'vitest';
import { speechService } from '../services/speechService';

describe('SpeechService & Accessibility Announcer', () => {
  it('should announce messages to ARIA live region element', () => {
    speechService.announceToScreenReader('Test accessibility announcement');
    const announcer = document.getElementById('fifa-sr-announcer');
    expect(announcer).not.toBeNull();
    expect(announcer?.getAttribute('aria-live')).toBe('assertive');
    expect(announcer?.textContent).toBe('Test accessibility announcement');
  });

  it('should handle text-to-speech fallback gracefully in non-supported environment', () => {
    const speakResult = speechService.speak('Testing speech output', 'en');
    expect(typeof speakResult).toBe('boolean');
  });

  it('should allow stopping speech synthesis', () => {
    expect(() => speechService.stopSpeaking()).not.toThrow();
  });
});
