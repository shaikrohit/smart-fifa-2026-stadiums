# ⚽ Smart FIFA Stadiums — GenAI 2026 Tournament Operations & Accessible Fan Experience Platform

> **Official FIFA World Cup 2026 GenAI Challenge Solution**
> 
> A state-of-the-art Generative AI platform engineered to enhance stadium operations, crowd navigation, accessibility, and real-time decision support for fans, organizers, volunteers, and venue staff across the 16 FIFA World Cup 2026 host venues in the USA, Canada, and Mexico.

---

## 🌟 Key Features & Dual-Persona Architecture

### 1. 🏟️ Multilingual Fan Concierge (Fan Mode)
- **GenAI Multilingual Voice & Text Assistant**: Supports English, Spanish, and French for global fans.
- **Accessible Step-Free Navigation**: Real-time wheelchair ramp & elevator guidance to ticketed sections.
- **Concession & Restroom Queue Predictor**: Real-time queue telemetry and eco-friendly zero-waste ratings.
- **Voice Commands & Audio Narration**: Built-in Text-to-Speech synthesis & Speech-to-Text recognition for screen reader & visually impaired users.

### 2. 📡 Operational Control Center (Staff Mode)
- **GenAI Incident Response & Triage Copilot**: Intelligent dispatch recommendations for crowd density spikes, accessibility requests, or medical assistance.
- **Live Zone Crowd Risk Telemetry**: Real-time density % monitoring and anomaly detection.
- **Multilingual Staff Broadcast Generator**: Synthesize instant audio announcements to volunteer headsets.

---

## 🛡️ Mandatory Engineering Parameters Benchmark

| Parameter | Technical Implementation |
| :--- | :--- |
| **Code Quality** | Modular React 18 + TypeScript + Vite architecture with strict typing, clean separation of services (`geminiService`, `speechService`, `stadiumData`), and clean visual design system. |
| **Security** | Safe & responsible GenAI guardrails via `sanitizeUserInput()` regex scanners preventing prompt injection (DAN personas, system overrides, XSS). Zero PII stored. Includes Security Audit drawer. |
| **Efficiency** | Lightweight Vite build, local contextual fallback simulation engine (zero downtime if offline or keyless), debounced voice inputs, minimal memory footprint. |
| **Testing** | Comprehensive **Vitest** test suite validating prompt injection shielding, HTML escaping, venue routing, and crowd telemetry logic. |
| **Accessibility (WCAG AA)** | High-contrast contrast mode, adjustable text scaling (100%-130%), screen reader ARIA live region announcer (`aria-live="assertive"`), full keyboard tabbing, and Web Speech API audio narration. |
| **Problem Alignment** | Direct alignment with FIFA World Cup 2026 stadium operations, fan navigation, volunteer coordination, and multi-venue support across USA, Canada, and Mexico. |

---

## 🧪 Running Automated Tests

```bash
# Run Vitest test suite
npm test
```

## 🚀 Building & Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

---

## ☁️ Deployment

Configured for **Firebase Hosting** (`firebase.json`, `.firebaserc`) and **GitHub Actions** (`.github/workflows/deploy.yml`) for automated CI/CD deployment.
