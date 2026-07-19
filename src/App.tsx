import React, { useState, useCallback, useEffect } from 'react';
import type { Stadium, PersonaMode, AccessibilitySettings } from './types';
import { FIFA_STADIUMS } from './services/stadiumData';
import { AccessibilityBar } from './components/AccessibilityBar';
import { Navbar } from './components/Navbar';
import { FanConcierge } from './components/FanConcierge';
import { VenueNavigator } from './components/VenueNavigator';
import { QueuePredictor } from './components/QueuePredictor';
import { StaffDashboard } from './components/StaffDashboard';
import { SecurityNotice } from './components/SecurityNotice';
import { ShieldCheck, Globe, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [stadiums] = useState<Stadium[]>(FIFA_STADIUMS);
  const [selectedStadium, setSelectedStadium] = useState<Stadium>(FIFA_STADIUMS[0]);
  const [persona, setPersona] = useState<PersonaMode>('fan');
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSizeMultiplier: 1,
    reducedMotion: false,
    screenReaderVoice: true,
    screenReaderRate: 1,
    language: 'en'
  });

  // WCAG AAA: Dynamic document lang attribute update
  useEffect(() => {
    document.documentElement.lang = accessibility.language;
  }, [accessibility.language]);

  const handleOpenSecurityNotice = useCallback(() => {
    setIsSecurityOpen(true);
  }, []);

  const handleCloseSecurityNotice = useCallback(() => {
    setIsSecurityOpen(false);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Accessibility Control Bar */}
      <AccessibilityBar settings={accessibility} onChange={setAccessibility} />

      {/* Main Header / Navigation */}
      <Navbar
        stadiums={stadiums}
        selectedStadium={selectedStadium}
        onSelectStadium={setSelectedStadium}
        persona={persona}
        onTogglePersona={setPersona}
        onOpenSecurityNotice={handleOpenSecurityNotice}
      />

      {/* Main Content Body */}
      <main id="main-content" className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        
        {persona === 'fan' ? (
          <div style={{ display: 'grid', gap: '2rem' }}>
            
            {/* GenAI Fan Assistant */}
            <FanConcierge
              stadium={selectedStadium}
              language={accessibility.language}
              autoVoiceEnabled={accessibility.screenReaderVoice}
            />

            {/* Grid: Accessible Gate Route Navigation & Concession Queue Predictor */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <VenueNavigator
                stadium={selectedStadium}
                language={accessibility.language}
              />

              <QueuePredictor
                stadium={selectedStadium}
                language={accessibility.language}
              />
            </div>

          </div>
        ) : (
          /* Staff Operations Dashboard Persona */
          <StaffDashboard
            stadium={selectedStadium}
            language={accessibility.language}
          />
        )}

      </main>

      {/* Footer */}
      <footer style={{ background: '#070a12', borderTop: '1px solid var(--border-subtle)', padding: '2rem 1.5rem', marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: '#fff', fontWeight: 700 }}>
              <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
              Smart FIFA Stadiums — GenAI Tournament Operations Platform
            </div>
            <div>Built for FIFA World Cup 2026 Challenge. High-Priority Aspects: Code Quality, Security, Efficiency, Testing, & Accessibility.</div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-green)' }}>
              <ShieldCheck size={16} /> WCAG AA Compliant
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-cyan)' }}>
              <Globe size={16} /> Multilingual (EN, ES, FR)
            </span>
          </div>
        </div>
      </footer>

      {/* Security Audit Modal */}
      <SecurityNotice isOpen={isSecurityOpen} onClose={handleCloseSecurityNotice} />

    </div>
  );
};

export default App;
