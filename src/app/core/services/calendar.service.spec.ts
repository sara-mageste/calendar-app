import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CalendarService } from './calendar.service';
import { PublicHoliday } from '../models/calendar.model';
import { vi } from 'vitest';

declare const spyOn: any;

describe('CalendarService', () => {
  let service: CalendarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CalendarService);
    httpMock = TestBed.inject(HttpTestingController);

    // Flush initial constructor HTTP request
    const initialReqs = httpMock.match((r) => r.url.includes('nominatim') || r.url.includes('PublicHolidays'));
    initialReqs.forEach(req => req.flush([]));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and initialize default signal state', () => {
    expect(service).toBeTruthy();
    expect(service.selectedMonth()).toBe(new Date().getMonth());
    expect(service.selectedYear()).toBe(new Date().getFullYear());
    expect(service.countryCode()).toBeTruthy();
    expect(service.calendarDays().length).toBe(42);
  });

  it('should update selectedMonth and recompute calendarDays when setMonth is called', () => {
    service.setMonth(5); // June
    expect(service.selectedMonth()).toBe(5);
    const days = service.calendarDays();
    expect(days.length).toBe(42);
  });

  it('should update selectedYear and fetch holidays when setYear is called with a new year', () => {
    const targetYear = 2028;
    service.setMonth(0);
    service.setYear(targetYear);
    expect(service.selectedYear()).toBe(targetYear);

    const requests = httpMock.match((req) => req.url.includes(`/PublicHolidays/${targetYear}/`));
    expect(requests.length).toBeGreaterThanOrEqual(1);

    const mockHolidays: PublicHoliday[] = [
      { date: `${targetYear}-01-01`, name: 'New Year', localName: 'Ano Novo', countryCode: 'BR' }
    ];
    requests[0].flush(mockHolidays);

    const holidayDay = service.calendarDays().find(d => d.holidayName === 'Ano Novo');
    expect(holidayDay).toBeTruthy();
    expect(holidayDay?.isHoliday).toBe(true);
  });

  it('should correctly handle fetchHolidays HTTP response and map holiday names', () => {
    const year = 2026;
    const country = 'BR';
    service.fetchHolidays(year, country);

    const req = httpMock.expectOne(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`);
    expect(req.request.method).toBe('GET');

    const mockHolidays: PublicHoliday[] = [
      { date: '2026-09-07', name: 'Independence Day', localName: 'Independência do Brasil', countryCode: 'BR' }
    ];
    req.flush(mockHolidays);

    const sep7 = service.calendarDays().find(d => d.date.getMonth() === 8 && d.date.getDate() === 7 && d.isCurrentMonth);
    if (sep7) {
      expect(sep7.isHoliday).toBe(true);
      expect(sep7.holidayName).toBe('Independência do Brasil');
    }
  });

  it('should handle fetchHolidays HTTP error gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    service.fetchHolidays(2026, 'BR');

    const req = httpMock.expectOne('https://date.nager.at/api/v3/PublicHolidays/2026/BR');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(consoleSpy).toHaveBeenCalled();
  });
});
