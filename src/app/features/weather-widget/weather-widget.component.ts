import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.css'
})
export class WeatherWidgetComponent {
  private readonly weatherService = inject(WeatherService);

  readonly currentWeather = this.weatherService.currentWeather;
  readonly hourlyForecast = this.weatherService.hourlyForecast;
}
