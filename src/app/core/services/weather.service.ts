import { Injectable, signal } from '@angular/core';
import { CurrentWeather, HourlyForecast, WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly currentWeather = signal<CurrentWeather | null>({
    city: 'São Paulo',
    temperature: 24,
    condition: 'Ensolarado',
    description: 'Céu limpo com poucas nuvens',
    icon: '☀️',
    high: 28,
    low: 18,
    humidity: 60,
    windSpeed: 12,
    uvIndex: 5
  });

  readonly hourlyForecast = signal<HourlyForecast[]>([
    { time: '00:00', temp: 19, condition: 'Limpo', icon: '🌙', precipitationProbability: 0, humidity: 75, windSpeed: 8 },
    { time: '03:00', temp: 18, condition: 'Limpo', icon: '🌙', precipitationProbability: 0, humidity: 80, windSpeed: 6 },
    { time: '06:00', temp: 18, condition: 'Parcialmente Nublado', icon: '⛅', precipitationProbability: 10, humidity: 82, windSpeed: 7 },
    { time: '09:00', temp: 21, condition: 'Ensolarado', icon: '☀️', precipitationProbability: 5, humidity: 70, windSpeed: 10 },
    { time: '12:00', temp: 26, condition: 'Ensolarado', icon: '☀️', precipitationProbability: 0, humidity: 55, windSpeed: 14 },
    { time: '15:00', temp: 28, condition: 'Ensolarado', icon: '☀️', precipitationProbability: 0, humidity: 50, windSpeed: 15 },
    { time: '18:00', temp: 24, condition: 'Poucas Nuvens', icon: '🌤️', precipitationProbability: 5, humidity: 62, windSpeed: 11 },
    { time: '21:00', temp: 21, condition: 'Limpo', icon: '🌙', precipitationProbability: 0, humidity: 70, windSpeed: 9 }
  ]);

  getWeatherForCity(city: string): WeatherResponse {
    return {
      current: this.currentWeather()!,
      hourly: this.hourlyForecast()
    };
  }
}
