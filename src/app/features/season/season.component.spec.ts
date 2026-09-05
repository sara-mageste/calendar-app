import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SeasonComponent } from './season.component';
import { WeatherService } from '../../core/services/weather.service';

describe('SeasonComponent', () => {
  let component: SeasonComponent;
  let fixture: ComponentFixture<SeasonComponent>;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonComponent],
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute Southern Hemisphere season as WINTER on September 4th', () => {
    weatherService.currentLatitude.set(-23.5505); // São Paulo, Brazil
    weatherService.currentLongitude.set(-46.6333);

    // Override currentDate inside component for exact date testing
    (component as any).currentDate.set(new Date(2026, 8, 4)); // Sept 4

    fixture.detectChanges();

    const currentSeason = component.season();
    expect(currentSeason.name).toBe('WINTER');
    expect(currentSeason.icon).toBe('snowflake');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.season-text')?.textContent).toContain('IT IS WINTER.');
  });

  it('should compute Western Northern Hemisphere season as SUMMER on September 4th', () => {
    weatherService.currentLatitude.set(51.5074); // London, UK
    weatherService.currentLongitude.set(-0.1278);

    (component as any).currentDate.set(new Date(2026, 8, 4)); // Sept 4

    fixture.detectChanges();

    const currentSeason = component.season();
    expect(currentSeason.name).toBe('SUMMER');
    expect(currentSeason.icon).toBe('beach_access');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.season-text')?.textContent).toContain('IT IS SUMMER.');
  });

  it('should compute East Asia Meteorological season as AUTUMN on September 4th', () => {
    weatherService.currentLatitude.set(35.6762); // Tokyo, Japan
    weatherService.currentLongitude.set(139.6503);

    (component as any).currentDate.set(new Date(2026, 8, 4)); // Sept 4

    fixture.detectChanges();

    const currentSeason = component.season();
    expect(currentSeason.name).toBe('AUTUMN');
    expect(currentSeason.icon).toBe('spa');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.season-text')?.textContent).toContain('IT IS AUTUMN.');
  });

  it('should compute Southern Hemisphere season as SUMMER on December 25th', () => {
    weatherService.currentLatitude.set(-23.5505);
    weatherService.currentLongitude.set(-46.6333);

    (component as any).currentDate.set(new Date(2026, 11, 25)); // Dec 25

    fixture.detectChanges();

    expect(component.season().name).toBe('SUMMER');
  });

  it('should compute Northern Hemisphere season as SPRING on April 15th', () => {
    weatherService.currentLatitude.set(51.5074);
    weatherService.currentLongitude.set(-0.1278);

    (component as any).currentDate.set(new Date(2026, 3, 15)); // Apr 15

    fixture.detectChanges();

    expect(component.season().name).toBe('SPRING');
  });
});
