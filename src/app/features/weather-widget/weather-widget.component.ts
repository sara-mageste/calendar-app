import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.css'
})
export class WeatherWidgetComponent implements OnInit {
  protected readonly weatherService = inject(WeatherService);

  readonly isOpen = signal<boolean>(false);
  readonly isClosing = signal<boolean>(false);

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => this.weatherService.fetchWeather(pos.coords.latitude, pos.coords.longitude, 'Your Location'),
        () => this.weatherService.fetchWeather()
      );
    } else {
      this.weatherService.fetchWeather();
    }
  }

  toggleForecast(): void {
    if (this.isOpen()) {
      this.isClosing.set(true);
      setTimeout(() => {
        this.isOpen.set(false);
        this.isClosing.set(false);
      }, 250);
    } else {
      this.isOpen.set(true);
    }
  }
}