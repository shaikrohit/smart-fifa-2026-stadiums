# Security Policy & Responsible GenAI Implementation

## Overview
**Smart FIFA Stadiums** is built according to strict enterprise security standards and the **FIFA World Cup 2026 Responsible AI Framework**.

## 🛡️ Security Architecture & Guardrails

1. **Input Sanitization & DOMPurify**:
   - All user query inputs pass through multi-stage sanitization (regex filters + `DOMPurify`) to prevent Cross-Site Scripting (XSS), SQL Injection, Command Injection, and Path Traversal.
2. **Prompt Injection Shielding**:
   - Regex scanners detect and sanitize prompt override attempts (`ignore previous instructions`, `DAN persona`, `system prompt extraction`).
3. **Data Privacy & Zero PII Retained**:
   - Zero Personally Identifiable Information (PII) or user location tracking is stored or transferred to sub-processors.
4. **Rate Limiting & Rate-Cap Telemetry**:
   - Session-level rate limiting prevents Denial of Service (DoS) and API abuse (max 15 queries per minute window).
5. **Content Security Policy (CSP) & HSTS**:
   - Configured with `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options: DENY`, and `X-Content-Type-Options: nosniff`.

## Reporting a Vulnerability
To report a potential security issue, please contact the maintainers via GitHub Security Advisories.
