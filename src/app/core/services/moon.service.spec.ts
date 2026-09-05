import { TestBed } from '@angular/core/testing';
import { MoonService } from './moon.service';

describe('MoonService', () => {
  let service: MoonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoonService]
    });
    service = TestBed.inject(MoonService);
  });

  it('should be created and compute initial currentPhase signal', () => {
    expect(service).toBeTruthy();
    expect(service.currentPhase()).toBeTruthy();
    expect(service.currentPhase().name).toBeTruthy();
  });

  it('should calculate New Moon for the known epoch date', () => {
    const epoch = new Date(2000, 0, 6, 18, 14, 0);
    const moonPhase = service.getMoonPhaseForDate(epoch);

    expect(moonPhase.phase).toBe('new');
    expect(moonPhase.name).toBe('New Moon');
    expect(moonPhase.icon).toBe('nightlight');
  });

  it('should calculate Full Moon approximately 14.76 days after New Moon', () => {
    const fullMoonDate = new Date(new Date(2000, 0, 6, 18, 14, 0).getTime() + 14.76 * 24 * 60 * 60 * 1000);
    const moonPhase = service.getMoonPhaseForDate(fullMoonDate);

    expect(moonPhase.phase).toBe('full');
    expect(moonPhase.name).toBe('Full Moon');
    expect(moonPhase.icon).toBe('brightness_1');
    expect(moonPhase.illumination).toBe(100);
  });

  it('should calculate First Quarter phase', () => {
    const firstQuarterDate = new Date(new Date(2000, 0, 6, 18, 14, 0).getTime() + 7.38 * 24 * 60 * 60 * 1000);
    const moonPhase = service.getMoonPhaseForDate(firstQuarterDate);

    expect(moonPhase.phase).toBe('first_quarter');
    expect(moonPhase.name).toBe('First Quarter');
  });

  it('should calculate Third Quarter phase', () => {
    const thirdQuarterDate = new Date(new Date(2000, 0, 6, 18, 14, 0).getTime() + 22.14 * 24 * 60 * 60 * 1000);
    const moonPhase = service.getMoonPhaseForDate(thirdQuarterDate);

    expect(moonPhase.phase).toBe('third_quarter');
    expect(moonPhase.name).toBe('Third Quarter');
  });

  it('should update currentPhase computed signal when currentDate signal changes', () => {
    const targetDate = new Date(2026, 8, 4); // Sept 4, 2026
    service.currentDate.set(targetDate);

    const phase = service.currentPhase();
    expect(phase.date).toBe('2026-09-04');
    expect(phase.name).toBeTruthy();
  });
});
