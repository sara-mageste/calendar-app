import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../core/models/weather.model';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.css'
})
export class WeatherWidgetComponent {
  readonly isExpanded = signal<boolean>(false);
  readonly weatherData = signal<WeatherData>({
    city: 'São Paulo',
    temperature: 21,
    condition: 'Ensolarado',
    icon: '☀️',
    hourly: [
      { time: '6:00 AM', temp: 25, icon: '🌩️' },
      { time: '9:00 AM', temp: 28, icon: '⛅' },
      { time: '12:00 PM', temp: 33, icon: '☀️' },
      { time: '3:00 PM', temp: 34, icon: '☀️' },
      { time: '6:00 PM', temp: 32, icon: '☀️' },
      { time: '9:00 PM', temp: 30, icon: '⛅' }
    ]
  });

  toggleForecast(): void {
    this.isExpanded.update(value => !value);
  }
}