import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherWidgetComponent } from './weather-widget.component';
import { WeatherService } from '../../core/services/weather.service';


describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;
  let weatherService: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidgetComponent],
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    const initialReqs = httpMock.match((r) => r.url.includes('api.open-meteo.com'));
    initialReqs.forEach(req => req.flush({
      current: { temperature_2m: 20, weather_code: 0 },
      hourly: { time: [], temperature_2m: [], weather_code: [] }
    }));

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create component and handle weather data DOM rendering', () => {
    expect(component).toBeTruthy();

    weatherService.weatherData.set({
      city: 'São Paulo',
      temperature: 25,
      condition: 'Sunny',
      icon: '☀️',
      hourly: [
        { time: '12:00 PM', temp: 25, icon: '☀️' }
      ]
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.weather-temp')?.textContent).toContain('25°');
    expect(compiled.querySelector('.condition')?.textContent).toContain('Sunny');
    expect(compiled.querySelector('.city')?.textContent).toContain('São Paulo');
  });

  it('should toggle forecast panel when toggleForecast is called', () => {
    component.toggleForecast();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.forecast-panel')).toBeTruthy();

    component.toggleForecast();
    expect(component.isClosing()).toBe(true);
  });
});
