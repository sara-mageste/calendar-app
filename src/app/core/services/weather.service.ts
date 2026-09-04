import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WeatherData, HourlyForecast } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  readonly weatherData = signal<WeatherData | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly currentLatitude = signal<number>(-23.5505);
  readonly currentLongitude = signal<number>(-46.6333);

  constructor() {
    this.initWeatherWithGeolocation();
  }

  initWeatherWithGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.currentLatitude.set(lat);
          this.currentLongitude.set(lon);

          let cityName = 'Your Location';
          try {
            const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
            const addressRes: any = await firstValueFrom(this.http.get(nominatimUrl));
            const addr = addressRes?.address;

            if (addr) {
              cityName = addr.city || addr.town || addr.village || addr.city_district || addr.state || 'Your Location';
            }
          } catch (err) {
            console.error('Error fetching city name:', err);
          }

          this.fetchWeather(lat, lon, cityName);
        },
        () => {
          // Fallback if geolocation is denied or unavailable
          this.fetchWeather();
        }
      );
    } else {
      this.fetchWeather();
    }
  }

  async fetchWeather(lat = -23.5505, lon = -46.6333, cityName = 'São Paulo'): Promise<void> {
    this.isLoading.set(true);
    this.currentLatitude.set(lat);
    this.currentLongitude.set(lon);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&timezone=auto`;
      const res: any = await firstValueFrom(this.http.get(url));

      const currentTemp = Math.round(res.current.temperature_2m);
      const currentCode = res.current.weather_code;

      const hourlyList: HourlyForecast[] = res.hourly.time.slice(0, 24).map((timeStr: string, index: number) => {
        const date = new Date(timeStr);
        const hours = date.getHours();
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours % 12 === 0 ? 12 : hours % 12;

        return {
          time: `${displayHour}:00 ${period}`,
          temp: Math.round(res.hourly.temperature_2m[index]),
          icon: this.getWeatherIcon(res.hourly.weather_code[index])
        };
      });

      this.weatherData.set({
        city: cityName,
        temperature: currentTemp,
        condition: this.getWeatherCondition(currentCode),
        icon: this.getWeatherIcon(currentCode),
        hourly: hourlyList
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  private getWeatherIcon(code: number): string {
    if (code === 0) return '☀️';
    if (code >= 1 && code <= 48) return '⛅';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 95) return '🌩️';
    return '☀️';
  }

  private getWeatherCondition(code: number): string {
    if (code === 0) return 'Sunny';
    if (code >= 1 && code <= 48) return 'Partly Cloudy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 80 && code <= 82) return 'Rain Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Sunny';
  }
}