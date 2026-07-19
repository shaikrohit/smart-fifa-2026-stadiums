import React from 'react';
import { Stadium, SupportedLanguage } from '../types';
import { Clock, Coffee, ShieldCheck, Leaf, Sparkles, AlertCircle } from 'lucide-react';

interface QueuePredictorProps {
  stadium: Stadium;
  language: SupportedLanguage;
}

export const QueuePredictor: React.FC<QueuePredictorProps> = ({ stadium, language }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Clock size={22} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>
              {language === 'es' ? 'Predicción de Filas y Sostenibilidad' : language === 'fr' ? 'Files d\'attente & Éco-Stade' : 'Concession Queues & Eco-Sustainability'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Live wait time telemetry and zero-waste concession points
            </p>
          </div>
        </div>

        <span className="badge badge-green">
          <Leaf size={14} /> FIFA Eco Green Rating: A+
        </span>
      </div>

      {/* Concessions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {stadium.concessions.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Coffee size={16} style={{ color: 'var(--accent-gold)' }} />
                {item.name}
              </h4>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                Eco Grade {item.sustainabilityRating}
              </span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0' }}>
              {item.location}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: item.currentWaitMinutes > 8 ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} /> Wait: {item.currentWaitMinutes} mins
              </span>

              {item.wheelchairAccessible && (
                <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <ShieldCheck size={12} /> Low-Counter
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Sustainability & Queue Tip Banner */}
      <div style={{ marginTop: '1.25rem', background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Sparkles size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>
          <strong>GenAI Queue Recommendation:</strong> Concourse Level 2 (Sec 220 Eco Express) has a <strong>60% shorter wait time</strong> right now compared to Main Plaza. Water hydration stations are free for reusable FIFA cups.
        </div>
      </div>

    </div>
  );
};
