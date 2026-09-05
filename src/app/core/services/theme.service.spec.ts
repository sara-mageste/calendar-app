import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created with available colors and initial selected theme', () => {
    expect(service).toBeTruthy();
    expect(service.availableColors().length).toBeGreaterThan(0);
    expect(service.currentTheme().selectedColor).toEqual(service.availableColors()[0]);
  });

  it('should update currentTheme and set CSS variables when setColor is called', () => {
    const nextColor = service.availableColors()[1];
    service.setColor(nextColor);

    TestBed.flushEffects();

    expect(service.currentTheme().selectedColor).toEqual(nextColor);
    expect(document.documentElement.style.getPropertyValue('--primary-color')).toBe(nextColor.primaryColor);
    expect(document.documentElement.style.getPropertyValue('--secondary-color')).toBe(nextColor.secondaryColor);
  });
});
