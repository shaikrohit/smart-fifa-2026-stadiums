import React, { useState } from 'react';
import { Stadium, SupportedLanguage, GenAIResponse } from '../types';
import { queryStadiumGenAI } from '../services/geminiService';
import { speechService } from '../services/speechService';
import { Sparkles, Mic, MicOff, Send, Volume2, ShieldCheck, Wheelchair, Coffee, HelpCircle, ArrowRight } from 'lucide-react';

interface FanConciergeProps {
  stadium: Stadium;
  language: SupportedLanguage;
  autoVoiceEnabled: boolean;
}

export const FanConcierge: React.FC<FanConciergeProps> = ({ stadium, language, autoVoiceEnabled }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<GenAIResponse | null>(null);
  const [isListening, setIsListening] = useState(false);

  const quickPrompts = [
    {
      icon: <Wheelchair size={16} />,
      label: language === 'es' ? 'Ruta en Silla de Ruedas' : language === 'fr' ? 'Accès PMR / Fauteuil' : 'Wheelchair Step-Free Route',
      text: 'What is the fastest step-free wheelchair accessible gate and ramp to my section?'
    },
    {
      icon: <Coffee size={16} />,
      label: language === 'es' ? 'Filas de Comida y Baños' : language === 'fr' ? 'Temps d\'attente Snacks' : 'Concession & Restroom Queues',
      text: 'Which eco concession stand and accessible restroom currently has the shortest line?'
    },
    {
      icon: <HelpCircle size={16} />,
      label: language === 'es' ? 'Salas Sensoriales y Ayuda' : language === 'fr' ? 'Salons Sensoriels & ALD' : 'Sensory Rooms & ALD',
      text: 'Where are the sensory quiet rooms and Assistive Listening Devices (ALD) located?'
    }
  ];

  const handleSearch = async (textToQuery: string) => {
    if (!textToQuery.trim()) return;
    setLoading(true);
    setPrompt(textToQuery);

    try {
      const res = await queryStadiumGenAI(textToQuery, stadium.name, 'fan', language);
      setResponse(res);

      if (autoVoiceEnabled && res.answer) {
        speechService.speak(res.answer, language);
      }
      speechService.announceToScreenReader('GenAI response generated.');
    } catch (err) {
      console.error('Error querying GenAI:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    speechService.listen(
      language,
      (text) => {
        setIsListening(false);
        setPrompt(text);
        handleSearch(text);
      },
      (err) => {
        setIsListening(false);
        alert(err);
      }
    );
  };

  return (
    <section 
      aria-labelledby="fan-concierge-heading"
      className="glass-card" 
      style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Decorative Glow */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, var(--accent-gold-glow) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(251, 191, 36, 0.15)', color: 'var(--accent-gold)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Sparkles size={22} aria-hidden="true" />
          </div>
          <div>
            <h2 id="fan-concierge-heading" style={{ fontSize: '1.35rem', margin: 0 }}>
              {language === 'es' ? 'Asistente Multilingüe GenAI' : language === 'fr' ? 'Assistant Multilingue GenAI' : 'Multilingual GenAI Stadium Concierge'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Real-time accessible navigation, queue advice, & matchday guidance at {stadium.name}
            </p>
          </div>
        </div>

        <span className="badge badge-blue">
          <ShieldCheck size={14} aria-hidden="true" /> Security Guardrail Active
        </span>
      </div>

      {/* Quick Action Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }} role="group" aria-label="Suggested quick questions">
        {quickPrompts.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSearch(chip.text)}
            disabled={loading}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 0.9rem',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            {chip.icon}
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Box with Voice Mic */}
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(prompt); }} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="fan-search-input" className="sr-only">Ask GenAI Stadium Concierge</label>
          <input
            id="fan-search-input"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              language === 'es'
                ? "Pregunta sobre accesibilidad, filas, o portones en el estadio..."
                : language === 'fr'
                ? "Posez une question sur l'accès PMR, les files d'attente..."
                : "Ask about wheelchair routes, concession lines, quiet rooms..."
            }
            style={{
              width: '100%',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 3rem 0.85rem 1rem',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleMic}
            aria-label={isListening ? "Stop voice recognition" : "Start voice input"}
            style={{
              position: 'absolute',
              right: '0.75rem',
              background: isListening ? 'var(--accent-red)' : 'transparent',
              color: isListening ? '#fff' : 'var(--accent-cyan)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          style={{
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            padding: '0 1.5rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? 'Thinking...' : <><Send size={16} /> Ask AI</>}
        </button>
      </form>

      {/* Response Box */}
      {response && (
        <div 
          aria-live="polite"
          style={{
            background: 'rgba(9, 13, 22, 0.9)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-gold">AI Response</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confidence: {Math.round(response.confidence * 100)}%</span>
            </div>

            <button
              onClick={() => speechService.speak(response.answer, language)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--accent-cyan)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.25rem 0.6rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Volume2 size={14} /> Listen Audio
            </button>
          </div>

          <div 
            style={{ fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line', marginBottom: '1rem', color: '#e5e7eb' }}
          >
            {response.answer}
          </div>

          {/* Suggested GenAI Next Steps */}
          {response.suggestedActions && response.suggestedActions.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border-subtle)', pt: '0.75rem', marginTop: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                Suggested Next Actions:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {response.suggestedActions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(act)}
                    style={{
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.25rem 0.65rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <ArrowRight size={12} /> {act}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security Audit Trail Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={12} style={{ color: 'var(--accent-green)' }} />
            Sanitized Prompt: "{response.securityAudit.sanitizedPrompt}" | Safety Verified
          </div>
        </div>
      )}

    </section>
  );
};
