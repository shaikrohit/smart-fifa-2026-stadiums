import { SupportedLanguage } from '../types';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
      }
    }
  }

  public speak(text: string, language: SupportedLanguage = 'en', rate: number = 1.0, onEnd?: () => void): boolean {
    if (!this.synth) {
      console.warn('Text-to-Speech not supported in this browser environment.');
      return false;
    }

    // Strip Markdown symbols for clean speech output
    const cleanText = text
      .replace(/[*#_`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/⚠️|♿|🍔|📊|🤖|💡|⚽/g, '');

    this.synth.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Set voice according to language
    const langMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      es: 'es-MX',
      fr: 'fr-FR'
    };
    utterance.lang = langMap[language] || 'en-US';

    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(langMap[language]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synth.speak(utterance);
    return true;
  }

  public stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public listen(
    language: SupportedLanguage = 'en',
    onResult: (text: string) => void,
    onError?: (err: string) => void
  ): boolean {
    if (!this.recognition) {
      if (onError) onError('Speech Recognition is not supported on this browser.');
      return false;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return false;
    }

    const langMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      es: 'es-MX',
      fr: 'fr-FR'
    };
    this.recognition.lang = langMap[language] || 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      this.isListening = false;
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      if (onError) onError(`Voice error: ${event.error}`);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.start();
    return true;
  }

  public announceToScreenReader(message: string): void {
    if (typeof document === 'undefined') return;
    let announcer = document.getElementById('fifa-sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'fifa-sr-announcer';
      announcer.setAttribute('aria-live', 'assertive');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
  }
}

export const speechService = new SpeechService();
