import React from 'react';
import { PersonaMode, Stadium } from '../types';
import { ShieldCheck, Sparkles, Users, Radio, MapPin } from 'lucide-react';

interface NavbarProps {
  stadiums: Stadium[];
  selectedStadium: Stadium;
  onSelectStadium: (stadium: Stadium) => void;
  persona: PersonaMode;
  onTogglePersona: (persona: PersonaMode) => void;
  onOpenSecurityNotice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stadiums,
  selectedStadium,
  onSelectStadium,
  persona,
  onTogglePersona,
  onOpenSecurityNotice
}) => {
  return (
    <header 
      style={{
        background: 'rgba(11, 16, 28, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-cyan))',
            padding: '0.6rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000'
          }}>
            <Sparkles size={22} aria-hidden="true" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, background: 'linear-gradient(90deg, #fff, var(--accent-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                FIFA 2026 Smart Stadiums
              </h1>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>GenAI Powered</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Official Tournament Operations & Accessible Fan Concierge
            </p>
          </div>
        </div>

        {/* Stadium Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <MapPin size={16} style={{ color: 'var(--accent-gold)' }} aria-hidden="true" />
          <label htmlFor="stadium-selector" className="sr-only">Select World Cup Stadium</label>
          <select
            id="stadium-selector"
            value={selectedStadium.id}
            onChange={(e) => {
              const found = stadiums.find(s => s.id === e.target.value);
              if (found) onSelectStadium(found);
            }}
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {stadiums.map(stadium => (
              <option key={stadium.id} value={stadium.id} style={{ background: 'var(--bg-secondary)', color: '#fff' }}>
                {stadium.name} ({stadium.city})
              </option>
            ))}
          </select>
        </div>

        {/* Controls & Persona Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Security Guardrail Modal Button */}
          <button
            onClick={onOpenSecurityNotice}
            style={{
              background: 'rgba(6, 182, 212, 0.1)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.85rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            aria-label="View GenAI Security & Guardrails Audit"
          >
            <ShieldCheck size={16} aria-hidden="true" />
            Security & Safety Audit
          </button>

          {/* Dual Persona Switcher */}
          <div role="radiogroup" aria-label="Mode Selection" style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <button
              role="radio"
              aria-checked={persona === 'fan'}
              onClick={() => onTogglePersona('fan')}
              style={{
                background: persona === 'fan' ? 'var(--accent-blue)' : 'transparent',
                color: persona === 'fan' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Users size={15} aria-hidden="true" />
              Fan Assistant
            </button>

            <button
              role="radio"
              aria-checked={persona === 'staff'}
              onClick={() => onTogglePersona('staff')}
              style={{
                background: persona === 'staff' ? 'var(--accent-gold)' : 'transparent',
                color: persona === 'staff' ? '#000' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
            >
              <Radio size={15} aria-hidden="true" />
              Staff Control Center
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
