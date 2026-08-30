import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../core/services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  readonly calendarService = inject(CalendarService);

  readonly isMonthDropdownOpen = signal(false);
  readonly isMonthDropdownClosing = signal(false);

  readonly isYearDropdownOpen = signal(false);
  readonly isYearDropdownClosing = signal(false);

  readonly weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  toggleMonthDropdown(): void {
    if (this.isMonthDropdownOpen()) {
      this.closeMonthDropdown();
    } else {
      this.closeYearDropdownImmediately();
      this.isMonthDropdownOpen.set(true);
    }
  }

  closeMonthDropdown(): void {
    if (this.isMonthDropdownOpen() && !this.isMonthDropdownClosing()) {
      this.isMonthDropdownClosing.set(true);
      setTimeout(() => {
        this.isMonthDropdownOpen.set(false);
        this.isMonthDropdownClosing.set(false);
      }, 200);
    }
  }

  private closeMonthDropdownImmediately(): void {
    this.isMonthDropdownOpen.set(false);
    this.isMonthDropdownClosing.set(false);
  }

  toggleYearDropdown(): void {
    if (this.isYearDropdownOpen()) {
      this.closeYearDropdown();
    } else {
      this.closeMonthDropdownImmediately();
      this.isYearDropdownOpen.set(true);
    }
  }

  closeYearDropdown(): void {
    if (this.isYearDropdownOpen() && !this.isYearDropdownClosing()) {
      this.isYearDropdownClosing.set(true);
      setTimeout(() => {
        this.isYearDropdownOpen.set(false);
        this.isYearDropdownClosing.set(false);
      }, 200);
    }
  }

  private closeYearDropdownImmediately(): void {
    this.isYearDropdownOpen.set(false);
    this.isYearDropdownClosing.set(false);
  }

  selectMonth(index: number): void {
    this.calendarService.setMonth(index);
    this.closeMonthDropdown();
  }

  selectYear(year: number): void {
    this.calendarService.setYear(year);
    this.closeYearDropdown();
  }

  formatDayNumber(day: number): string {
    return day < 10 ? `0${day}` : `${day}`;
  }
}