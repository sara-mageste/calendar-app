import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './features/calendar/calendar.component';
import { ClockComponent } from './features/clock/clock.component';
import { WeatherWidgetComponent } from './features/weather-widget/weather-widget.component';
import { ColorPickerComponent } from './shared/components/color-picker/color-picker.component';
import { MascotComponent } from './shared/components/mascot/mascot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CalendarComponent,
    ClockComponent,
    WeatherWidgetComponent,
    ColorPickerComponent,
    MascotComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calendar-app');
}
