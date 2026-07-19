import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityBar } from '../components/AccessibilityBar';
import { Navbar } from '../components/Navbar';
import { QueuePredictor } from '../components/QueuePredictor';
import { SecurityNotice } from '../components/SecurityNotice';
import { FIFA_STADIUMS } from '../services/stadiumData';

describe('React UI Components Unit & Integration Tests', () => {
  it('should render AccessibilityBar and trigger contrast toggle', () => {
    const handleChange = vi.fn();
    render(
      <AccessibilityBar
        settings={{
          highContrast: false,
          fontSizeMultiplier: 1,
          reducedMotion: false,
          screenReaderVoice: true,
          screenReaderRate: 1,
          language: 'en'
        }}
        onChange={handleChange}
      />
    );

    const contrastBtn = screen.getByText(/Contrast: Normal/i);
    expect(contrastBtn).toBeDefined();

    fireEvent.click(contrastBtn);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ highContrast: true }));
  });

  it('should render Navbar with stadium options', () => {
    const handleSelectStadium = vi.fn();
    const handleTogglePersona = vi.fn();
    const handleOpenSecurity = vi.fn();

    render(
      <Navbar
        stadiums={FIFA_STADIUMS}
        selectedStadium={FIFA_STADIUMS[0]}
        onSelectStadium={handleSelectStadium}
        persona="fan"
        onTogglePersona={handleTogglePersona}
        onOpenSecurityNotice={handleOpenSecurity}
      />
    );

    expect(screen.getByText(/FIFA 2026 Smart Stadiums/i)).toBeDefined();
    const securityBtn = screen.getByLabelText(/View GenAI Security & Guardrails Audit/i);
    fireEvent.click(securityBtn);
    expect(handleOpenSecurity).toHaveBeenCalled();
  });

  it('should render QueuePredictor with concession telemetry', () => {
    render(
      <QueuePredictor
        stadium={FIFA_STADIUMS[0]}
        language="en"
      />
    );

    expect(screen.getByText(/Concession Queues & Eco-Sustainability/i)).toBeDefined();
    expect(screen.getByText(/Global FIFA Flavors & Tacos/i)).toBeDefined();
  });

  it('should render SecurityNotice modal when open and handle close', () => {
    const handleClose = vi.fn();
    render(
      <SecurityNotice
        isOpen={true}
        onClose={handleClose}
      />
    );

    expect(screen.getByText(/GenAI Security & Safe Implementation Audit/i)).toBeDefined();
    const closeBtn = screen.getByLabelText(/Close Security Modal/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
