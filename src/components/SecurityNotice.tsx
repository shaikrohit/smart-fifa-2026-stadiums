import React from 'react';
import { ShieldCheck, Lock, AlertOctagon, CheckCircle2, X } from 'lucide-react';

interface SecurityNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityNotice: React.FC<SecurityNoticeProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '650px',
          padding: '2rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--accent-cyan)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close Security Modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
            <ShieldCheck size={26} aria-hidden="true" />
          </div>
          <div>
            <h2 id="security-modal-title" style={{ fontSize: '1.35rem', margin: 0, color: 'var(--accent-cyan)' }}>
              GenAI Security & Safe Implementation Audit
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Mandatory Security & Responsible AI Framework (FIFA World Cup 2026)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#e5e7eb', marginBottom: '1.5rem' }}>
          
          <div style={{ background: 'rgba(9, 13, 22, 0.8)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lock size={16} /> 1. Prompt Injection Shielding & Input Sanitization
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
              All incoming user queries are sanitized via <code>sanitizeUserInput()</code> regex scanners to neutralize prompt injection attacks (e.g. system prompt overrides, DAN personas, code injections) before reaching the GenAI model.
            </p>
          </div>

          <div style={{ background: 'rgba(9, 13, 22, 0.8)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--accent-green)', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={16} /> 2. Safe Fallback Engine & High Availability
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
              If network connectivity drops or API keys are unconfigured, the platform seamlessly switches to a local deterministic telemetry engine with zero disruption to stadium operations or accessibility guides.
            </p>
          </div>

          <div style={{ background: 'rgba(9, 13, 22, 0.8)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <AlertOctagon size={16} /> 3. Data Privacy & Zero Personal Data Retained
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
              No Personally Identifiable Information (PII) or user location history is saved or passed to third-party sub-processors. All accessibility preferences are stored locally in session memory.
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: 'var(--accent-cyan)',
            color: '#000',
            fontWeight: 700,
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem',
            cursor: 'pointer'
          }}
        >
          Acknowledge Security Policy
        </button>

      </div>
    </div>
  );
};
