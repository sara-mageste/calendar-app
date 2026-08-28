import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate angles and digital time format correctly', () => {
    expect(component.formattedDigitalTime()).toMatch(/^\d{1,2}:\d{2}\s\|\s(AM|PM)$/);
    expect(component.hourHandDeg()).toBeGreaterThanOrEqual(0);
    expect(component.minuteHandDeg()).toBeGreaterThanOrEqual(0);
    expect(component.secondHandDeg()).toBeGreaterThanOrEqual(0);
  });
});
