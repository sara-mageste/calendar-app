import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from '../../core/services/calendar.service';
import { vi } from 'vitest';

declare const spyOn: any;

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarService: CalendarService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
      providers: [
        CalendarService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    calendarService = TestBed.inject(CalendarService);
    httpMock = TestBed.inject(HttpTestingController);

    const initialReqs = httpMock.match((r) => r.url.includes('nominatim') || r.url.includes('PublicHolidays'));
    initialReqs.forEach(req => req.flush([]));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component and render calendar weekdays and days grid', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const weekdayHeaders = compiled.querySelectorAll('.weekday-header');
    expect(weekdayHeaders.length).toBe(7);
    expect(weekdayHeaders[0].textContent).toContain('SUN');

    const dayCells = compiled.querySelectorAll('.day-cell');
    expect(dayCells.length).toBe(42);
  });

  it('should toggle month dropdown when toggleMonthDropdown is called', () => {
    expect(component.isMonthDropdownOpen()).toBe(false);

    component.toggleMonthDropdown();
    fixture.detectChanges();

    expect(component.isMonthDropdownOpen()).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.dropdown-menu')).toBeTruthy();

    component.selectMonth(5); // June
    expect(calendarService.selectedMonth()).toBe(5);
  });

  it('should toggle year dropdown and update year when selectYear is called', () => {
    expect(component.isYearDropdownOpen()).toBe(false);

    component.toggleYearDropdown();
    fixture.detectChanges();

    expect(component.isYearDropdownOpen()).toBe(true);

    const setYearSpy = vi.spyOn(calendarService, 'setYear');
    component.selectYear(2028);

    expect(setYearSpy).toHaveBeenCalledWith(2028);
    expect(calendarService.selectedYear()).toBe(2028);

    const reqs = httpMock.match((req) => req.url.includes('/PublicHolidays/2028/'));
    reqs.forEach(r => r.flush([]));
  });

  it('should format single digit day numbers with leading zero', () => {
    expect(component.formatDayNumber(4)).toBe('04');
    expect(component.formatDayNumber(15)).toBe('15');
  });
});
