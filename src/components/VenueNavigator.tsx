import React, { useState } from 'react';
import { Stadium, SupportedLanguage } from '../types';
import { Wheelchair, MapPin, Clock, ArrowRight, Volume2, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { speechService } from '../services/speechService';

interface VenueNavigatorProps {
  stadium: Stadium;
  language: SupportedLanguage;
}

export const VenueNavigator: React.FC<VenueNavigatorProps> = ({ stadium, language }) => {
  const [wheelchairOnly, setWheelchairOnly] = useState(true);
  const [selectedSection, setSelectedSection] = useState('118');

  const filteredGates = wheelchairOnly 
    ? stadium.gates.filter(g => g.wheelchairAccessible)
    : stadium.gates;

  const handleAnnounceRoute = (gateName: string, waitTime: number) => {
    const text = language === 'es'
      ? `Navegación accesible a la sección ${selectedSection} por ${gateName}. Tiempo de espera estimado en portón: ${waitTime} minutos. Ruta 100% libre de escalones con elevadores cercanos.`
      : language === 'fr'
      ? `Itinéraire accessible vers la section ${selectedSection} via ${gateName}. Temps d'attente estimé à la porte: ${waitTime} minutes. Remplacement des marches par rampes.`
      : `Step-free wheelchair route to section ${selectedSection} via ${gateName}. Estimated gate wait time is ${waitTime} minutes. Elevator access available nearby.`;
    
    speechService.speak(text, language);
    speechService.announceToScreenReader(text);
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Wheelchair size={22} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>
              {language === 'es' ? 'Navegación Accesible Estadio' : language === 'fr' ? 'Navigation PMR & Stade' : 'Step-Free Stadium Gate & Route Navigator'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Smart step-free routes for wheelchair users & fans with reduced mobility
            </p>
          </div>
        </div>

        {/* Wheelchair Accessible Filter Toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'var(--bg-secondary)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <input
            type="checkbox"
            checked={wheelchairOnly}
            onChange={(e) => setWheelchairOnly(e.target.checked)}
            style={{ accentColor: 'var(--accent-cyan)', width: '16px', height: '16px' }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
            Step-Free & Wheelchair Priority Only
          </span>
        </label>
      </div>

      {/* Section Quick Selector */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label htmlFor="section-select" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
          Select Ticketed Stadium Section:
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['101-120', '121-135', '201-228', '301-340', 'Accessibility Box'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              style={{
                background: selectedSection === sec ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                color: selectedSection === sec ? '#000' : 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sec {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Gates List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {filteredGates.map((gate) => (
          <div
            key={gate.id}
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${gate.status === 'congested' ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                  {gate.name}
                </h4>
                <span className={gate.status === 'congested' ? 'badge badge-red' : 'badge badge-green'}>
                  {gate.status === 'congested' ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                  {gate.status}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Recommended for: {gate.recommendedSections.join(', ')}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-cyan)' }}>
                  <Clock size={14} /> Queue: <strong>{gate.currentWaitMinutes} mins</strong>
                </span>

                {gate.elevatorNearby && (
                  <span style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <ShieldCheck size={14} /> Elevator Adjacent
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => handleAnnounceRoute(gate.name, gate.currentWaitMinutes)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Volume2 size={14} style={{ color: 'var(--accent-cyan)' }} />
              Audio Route Narration
            </button>

          </div>
        ))}
      </div>

      {/* Accessibility Amenities Summary */}
      <div style={{ marginTop: '1.25rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem' }}>
        <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-green)', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <CheckCircle2 size={14} /> Venue Accessibility Standards ({stadium.name}):
        </h4>
        <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '1.25rem', margin: 0 }}>
          {stadium.accessibilityFeatures.map((feat, idx) => (
            <li key={idx} style={{ marginBottom: '0.2rem' }}>{feat}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};
