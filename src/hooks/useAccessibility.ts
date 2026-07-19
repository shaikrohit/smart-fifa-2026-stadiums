import { useState, useCallback, useEffect } from 'react';
import type { AccessibilitySettings } from '../types';
import { speechService } from '../services/speechService';

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSizeMultiplier: 1,
    reducedMotion: false,
    screenReaderVoice: true,
    screenReaderRate: 1,
    language: 'en'
  });

  // WCAG AAA: Dynamic document lang attribute update
  useEffect(() => {
    document.documentElement.lang = settings.language;
  }, [settings.language]);

  const toggleHighContrast = useCallback(() => {
    setSettings(prev => {
      const nextContrast = !prev.highContrast;
      document.documentElement.classList.toggle('high-contrast', nextContrast);
      speechService.announceToScreenReader(nextContrast ? 'High contrast mode enabled' : 'Normal contrast mode enabled');
      return { ...prev, highContrast: nextContrast };
    });
  }, []);

  const cycleFontSize = useCallback(() => {
    const scales = [1, 1.15, 1.3];
    setSettings(prev => {
      const currentIndex = scales.indexOf(prev.fontSizeMultiplier);
      const nextScale = scales[(currentIndex + 1) % scales.length];
      document.documentElement.style.setProperty('--font-scale', nextScale.toString());
      speechService.announceToScreenReader(`Font size set to ${Math.round(nextScale * 100)} percent`);
      return { ...prev, fontSizeMultiplier: nextScale };
    });
  }, []);

  const toggleVoice = useCallback(() => {
    setSettings(prev => {
      const nextVoice = !prev.screenReaderVoice;
      if (!nextVoice) speechService.stopSpeaking();
      speechService.announceToScreenReader(nextVoice ? 'Audio speech enabled' : 'Audio speech muted');
      return { ...prev, screenReaderVoice: nextVoice };
    });
  }, []);

  return {
    settings,
    setSettings,
    toggleHighContrast,
    cycleFontSize,
    toggleVoice
  };
}
