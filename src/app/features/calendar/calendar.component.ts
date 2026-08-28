import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayService } from '../../core/services/holiday.service';
import { MoonService } from '../../core/services/moon.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  private readonly holidayService = inject(HolidayService);
  private readonly moonService = inject(MoonService);

  readonly currentDate = signal<Date>(new Date());
  readonly selectedMonth = signal<number>(new Date().getMonth());
  readonly selectedYear = signal<number>(new Date().getFullYear());

  readonly weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  readonly months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  prevMonth(): void {
    if (this.selectedMonth() === 0) {
      this.selectedMonth.set(11);
      this.selectedYear.update(y => y - 1);
    } else {
      this.selectedMonth.update(m => m - 1);
    }
  }

  nextMonth(): void {
    if (this.selectedMonth() === 11) {
      this.selectedMonth.set(0);
      this.selectedYear.update(y => y + 1);
    } else {
      this.selectedMonth.update(m => m + 1);
    }
  }

  goToToday(): void {
    const today = new Date();
    this.selectedMonth.set(today.getMonth());
    this.selectedYear.set(today.getFullYear());
  }
}
