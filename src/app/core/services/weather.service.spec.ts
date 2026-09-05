import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { vi } from 'vitest';

declare const spyOn: any;

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);

    // Flush initial constructor HTTP request triggered by initWeatherWithGeolocation()
    const initialReqs = httpMock.match((r) => r.url.includes('api.open-meteo.com'));
    initialReqs.forEach(req => req.flush({
      current: { temperature_2m: 20, weather_code: 0 },
      hourly: { time: [], temperature_2m: [], weather_code: [] }
    }));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and set initial default coordinates', () => {
    expect(service).toBeTruthy();
    expect(service.currentLatitude()).toBe(-23.5505);
    expect(service.currentLongitude()).toBe(-46.6333);
  });

  it('should fetch weather from Open-Meteo API and map weatherData correctly', async () => {
    const lat = 35.6762;
    const lon = 139.6503;
    const cityName = 'Tokyo';

    const fetchPromise = service.fetchWeather(lat, lon, cityName);

    expect(service.isLoading()).toBe(true);
    expect(service.currentLatitude()).toBe(lat);
    expect(service.currentLongitude()).toBe(lon);

    const req = httpMock.expectOne((r) => r.url.includes('api.open-meteo.com/v1/forecast'));
    expect(req.request.method).toBe('GET');

    const mockOpenMeteoResponse = {
      current: {
        temperature_2m: 24.6,
        weather_code: 0
      },
      hourly: {
        time: Array.from({ length: 24 }, (_, i) => `2026-09-05T${String(i).padStart(2, '0')}:00`),
        temperature_2m: Array.from({ length: 24 }, () => 22),
        weather_code: Array.from({ length: 24 }, () => 0)
      }
    };

    req.flush(mockOpenMeteoResponse);
    await fetchPromise;

    expect(service.isLoading()).toBe(false);
    const data = service.weatherData();
    expect(data).toBeTruthy();
    expect(data?.city).toBe('Tokyo');
    expect(data?.temperature).toBe(25);
    expect(data?.condition).toBe('Sunny');
    expect(data?.icon).toBe('☀️');
    expect(data?.hourly.length).toBe(24);
  });

  it('should map rainy weather codes properly', async () => {
    const fetchPromise = service.fetchWeather(-23.5505, -46.6333, 'São Paulo');
    const req = httpMock.expectOne((r) => r.url.includes('api.open-meteo.com/v1/forecast'));

    req.flush({
      current: { temperature_2m: 18.2, weather_code: 61 },
      hourly: {
        time: ['2026-09-05T12:00'],
        temperature_2m: [18],
        weather_code: [61]
      }
    });

    await fetchPromise;
    const data = service.weatherData();
    expect(data?.condition).toBe('Rainy');
    expect(data?.icon).toBe('🌧️');
  });

  it('should handle HTTP error gracefully when fetching weather', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    const fetchPromise = service.fetchWeather();

    const req = httpMock.expectOne((r) => r.url.includes('api.open-meteo.com/v1/forecast'));
    req.flush('Network Error', { status: 500, statusText: 'Server Error' });

    await fetchPromise;
    expect(service.isLoading()).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
