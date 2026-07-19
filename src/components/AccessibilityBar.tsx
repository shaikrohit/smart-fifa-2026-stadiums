import React from 'react';
import { AccessibilitySettings } from '../types';
import { Eye, Type, Volume2, VolumeX, Globe } from 'lucide-react';
import { speechService } from '../services/speechService';

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  onChange: (newSettings: AccessibilitySettings) => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({ settings, onChange }) => {
  const toggleContrast = () => {
    const newContrast = !settings.highContrast;
    onChange({ ...settings, highContrast: newContrast });
    document.documentElement.classList.toggle('high-contrast', newContrast);
    speechService.announceToScreenReader(newContrast ? 'High contrast mode enabled' : 'Normal contrast mode enabled');
  };

  const cycleFontSize = () => {
    const scales = [1, 1.15, 1.3];
    const currentIndex = scales.indexOf(settings.fontSizeMultiplier);
    const nextIndex = (currentIndex + 1) % scales.length;
    const newScale = scales[nextIndex];
    
    onChange({ ...settings, fontSizeMultiplier: newScale });
    document.documentElement.style.setProperty('--font-scale', newScale.toString());
    speechService.announceToScreenReader(`Font size set to ${Math.round(newScale * 100)} percent`);
  };

  const toggleVoice = () => {
    const newVoice = !settings.screenReaderVoice;
    onChange({ ...settings, screenReaderVoice: newVoice });
    if (!newVoice) speechService.stopSpeaking();
    speechService.announceToScreenReader(newVoice ? 'Audio speech enabled' : 'Audio speech muted');
  };

  return (
    <aside 
      aria-label="Accessibility & Preferences Controls"
      style={{
        background: '#0a0e1a',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.5rem 1.5rem',
        fontSize: '0.85rem'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Skip Link for WCAG */}
        <a 
          href="#main-content" 
          className="sr-only" 
          style={{ position: 'absolute', focus: { position: 'static', background: 'var(--accent-gold)', color: '#000', padding: '0.5rem' } }}
        >
          Skip to main content
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--accent-gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Eye size={16} aria-hidden="true" /> Accessibility Suite (WCAG AA):
          </span>

          {/* High Contrast Button */}
          <button
            onClick={toggleContrast}
            aria-pressed={settings.highContrast}
            style={{
              background: settings.highContrast ? 'var(--accent-gold)' : 'rgba(255,255,255,0.08)',
              color: settings.highContrast ? '#000' : 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.25rem 0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 500
            }}
          >
            <Eye size={14} aria-hidden="true" />
            {settings.highContrast ? 'Contrast: High' : 'Contrast: Normal'}
          </button>

          {/* Font Size Scaling */}
          <button
            onClick={cycleFontSize}
            aria-label={`Current font scale ${Math.round(settings.fontSizeMultiplier * 100)}%. Click to change.`}
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.25rem 0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 500
            }}
          >
            <Type size={14} aria-hidden="true" />
            Text: {Math.round(settings.fontSizeMultiplier * 100)}%
          </button>

          {/* Audio Synthesizer */}
          <button
            onClick={toggleVoice}
            aria-pressed={settings.screenReaderVoice}
            style={{
              background: settings.screenReaderVoice ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.08)',
              color: settings.screenReaderVoice ? 'var(--accent-green)' : 'var(--text-primary)',
              border: `1px solid ${settings.screenReaderVoice ? 'var(--accent-green)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '0.25rem 0.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 500
            }}
          >
            {settings.screenReaderVoice ? <Volume2 size={14} aria-hidden="true" /> : <VolumeX size={14} aria-hidden="true" />}
            {settings.screenReaderVoice ? 'Voice: Active' : 'Voice: Muted'}
          </button>
        </div>

        {/* Multilingual Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={16} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
          <label htmlFor="language-select" className="sr-only">Select Language</label>
          <select
            id="language-select"
            value={settings.language}
            onChange={(e) => {
              const lang = e.target.value as any;
              onChange({ ...settings, language: lang });
              speechService.announceToScreenReader(`Language changed to ${lang === 'es' ? 'Spanish' : lang === 'fr' ? 'French' : 'English'}`);
            }}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.2rem 0.5rem',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <option value="en">English (US)</option>
            <option value="es">Español (MX)</option>
            <option value="fr">Français (CA)</option>
          </select>
        </div>

      </div>
    </aside>
  );
};
