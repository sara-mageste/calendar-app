import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoonPhaseComponent } from './moon-phase.component';
import { MoonService } from '../../core/services/moon.service';

describe('MoonPhaseComponent', () => {
  let component: MoonPhaseComponent;
  let fixture: ComponentFixture<MoonPhaseComponent>;
  let moonService: MoonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonPhaseComponent],
      providers: [MoonService]
    }).compileComponents();

    fixture = TestBed.createComponent(MoonPhaseComponent);
    component = fixture.componentInstance;
    moonService = TestBed.inject(MoonService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render moon phase icon, label, and phase name from MoonService', () => {
    moonService.currentDate.set(new Date(2000, 0, 6, 18, 14, 0)); // Epoch -> New Moon
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const label = compiled.querySelector('.moon-label')?.textContent;
    expect(label).toContain('MOON');

    const phaseName = compiled.querySelector('.moon-phase-name')?.textContent;
    expect(phaseName).toBe('New Moon');

    const icon = compiled.querySelector('.moon-icon')?.textContent;
    expect(icon).toContain('nightlight');
  });
});
