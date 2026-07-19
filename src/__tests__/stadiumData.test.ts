import { describe, it, expect } from 'vitest';
import { FIFA_STADIUMS, INITIAL_INCIDENTS } from '../services/stadiumData';

describe('FIFA Stadium Dataset Integrity', () => {
  it('should contain 16 host venue definitions or primary key venues', () => {
    expect(FIFA_STADIUMS.length).toBeGreaterThan(0);
    const metlife = FIFA_STADIUMS.find(s => s.id === 'metlife');
    expect(metlife).toBeDefined();
    expect(metlife?.name).toContain('MetLife Stadium');
  });

  it('should ensure all stadiums have wheelchair accessible gates', () => {
    FIFA_STADIUMS.forEach(stadium => {
      const accessibleGates = stadium.gates.filter(g => g.wheelchairAccessible);
      expect(accessibleGates.length).toBeGreaterThan(0);
    });
  });

  it('should contain valid incident records with AI suggested actions', () => {
    expect(INITIAL_INCIDENTS.length).toBeGreaterThan(0);
    INITIAL_INCIDENTS.forEach(inc => {
      expect(inc.aiSuggestedAction).toBeTruthy();
      expect(inc.severity).toMatch(/low|medium|high|critical/);
    });
  });
});
