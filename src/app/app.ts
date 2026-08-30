import { Component, signal } from '@angular/core';
import { ClockComponent } from './features/clock/clock.component';
import { WeatherWidgetComponent } from './features/weather-widget/weather-widget.component';
import { CommonModule } from '@angular/common';
import { SeasonComponent } from "./features/season/season.component";
import { ColorPickerComponent } from "./shared/components/color-picker/color-picker.component";
import { CalendarComponent } from './features/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ClockComponent,
    WeatherWidgetComponent,
    SeasonComponent,
    ColorPickerComponent,
    CalendarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calendar-app');
}
