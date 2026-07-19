import React, { useState, useCallback } from 'react';
import type { Stadium, IncidentReport, CrowdTelemetry, SupportedLanguage } from '../types';
import { INITIAL_INCIDENTS, INITIAL_CROWD_TELEMETRY } from '../services/stadiumData';
import { Radio, AlertTriangle, Users, Send, CheckCircle2, Volume2, Sparkles } from 'lucide-react';
import { speechService } from '../services/speechService';

interface StaffDashboardProps {
  stadium: Stadium;
  language: SupportedLanguage;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = React.memo(({ stadium, language }) => {
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [telemetry] = useState<CrowdTelemetry[]>(INITIAL_CROWD_TELEMETRY);
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcasting, setBroadcasting] = useState(false);

  const handleDispatch = useCallback((id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { ...inc, status: 'dispatching' };
      }
      return inc;
    }));
    speechService.announceToScreenReader(`Staff dispatched for incident ${id}`);
  }, []);

  const handleResolve = useCallback((id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return { ...inc, status: 'resolved' };
      }
      return inc;
    }));
    speechService.announceToScreenReader(`Incident ${id} marked as resolved`);
  }, []);

  const handleBroadcast = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setBroadcasting(true);

    const announcement = `ATTENTION VOLUNTEER & STADIUM STAFF AT ${stadium.name.toUpperCase()}: ${broadcastText}`;
    speechService.speak(announcement, language, 1.0, () => {
      setBroadcasting(false);
    });
    speechService.announceToScreenReader(`Broadcast sent to volunteer channel: ${broadcastText}`);
  }, [broadcastText, stadium.name, language]);

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(10,14,26,0.95))', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(251, 191, 36, 0.2)', color: 'var(--accent-gold)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Radio size={24} className="animate-pulse-glow" aria-hidden="true" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--accent-gold)' }}>
                  FIFA 2026 Operational Control Center
                </h2>
                <span className="badge badge-gold">Live Telemetry Active</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                GenAI Decision Support & Incident Triage for {stadium.name}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>Stadium Capacity</span>
              <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{stadium.capacity.toLocaleString()}</strong>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>Active Incidents</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--accent-red)' }}>
                {incidents.filter(i => i.status !== 'resolved').length}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} style={{ color: 'var(--accent-cyan)' }} />
            Zone Crowd Density & AI Telemetry
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {telemetry.map((t, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>{t.zone}</span>
                  <span style={{ color: t.densityPercentage > 85 ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 700 }}>
                    {t.densityPercentage}% Density
                  </span>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: `${t.densityPercentage}%`,
                    height: '100%',
                    background: t.densityPercentage > 85 ? 'var(--accent-red)' : t.densityPercentage > 60 ? 'var(--accent-gold)' : 'var(--accent-green)',
                    transition: 'width 0.5s ease'
                  }} />
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <Sparkles size={12} style={{ color: 'var(--accent-gold)', display: 'inline', marginRight: '4px' }} />
                  {t.aiRiskAssessment}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radio size={18} style={{ color: 'var(--accent-gold)' }} />
            Multilingual Staff & Volunteer Broadcast
          </h3>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Generate instant synthesized audio announcements to volunteer headsets across English, Spanish, & French channels.
          </p>

          <form onSubmit={handleBroadcast}>
            <label htmlFor="staff-broadcast-input" className="sr-only">Enter volunteer broadcast announcement</label>
            <textarea
              id="staff-broadcast-input"
              rows={3}
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              placeholder="e.g. Volunteer Team 3, please guide incoming wheelchair spectators at Gate E to Section 118..."
              style={{
                width: '100%',
                background: 'var(--bg-secondary)',
                color: '#fff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none',
                marginBottom: '0.75rem'
              }}
            />

            <button
              type="submit"
              disabled={broadcasting || !broadcastText.trim()}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--accent-gold), #d97706)',
                color: '#000',
                fontWeight: 700,
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem',
                fontSize: '0.85rem',
                cursor: broadcasting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Volume2 size={16} />
              {broadcasting ? 'Broadcasting Audio...' : 'Broadcast to Staff Headsets'}
            </button>
          </form>
        </div>

      </div>

      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} style={{ color: 'var(--accent-red)' }} />
            Real-Time GenAI Incident Triage & Dispatch
          </h3>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-updating telemetry feed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {incidents.map((inc) => (
            <div
              key={inc.id}
              style={{
                background: 'var(--bg-secondary)',
                border: `1px solid ${inc.severity === 'high' ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{inc.id}</span>
                    <span className={inc.severity === 'high' ? 'badge badge-red' : 'badge badge-gold'} style={{ fontSize: '0.65rem' }}>
                      {inc.severity} severity
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inc.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#e5e7eb', marginTop: '0.2rem' }}>
                    📍 <strong>{inc.location}</strong> — {inc.description}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {inc.status !== 'resolved' ? (
                    <>
                      <button
                        onClick={() => handleDispatch(inc.id)}
                        disabled={inc.status === 'dispatching'}
                        style={{
                          background: inc.status === 'dispatching' ? 'rgba(251, 191, 36, 0.2)' : 'var(--accent-blue)',
                          color: inc.status === 'dispatching' ? 'var(--accent-gold)' : '#fff',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Send size={12} />
                        {inc.status === 'dispatching' ? 'Dispatching...' : 'Dispatch AI Strategy'}
                      </button>

                      <button
                        onClick={() => handleResolve(inc.id)}
                        style={{
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: 'var(--accent-green)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <CheckCircle2 size={12} /> Resolve
                      </button>
                    </>
                  ) : (
                    <span className="badge badge-green">Resolved</span>
                  )}
                </div>
              </div>

              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px dashed rgba(6, 182, 212, 0.3)', borderRadius: 'var(--radius-sm)', padding: '0.65rem', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {inc.aiSuggestedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
});
