import { Injectable, signal, computed } from '@angular/core';
import { CalendarDay } from '../models/calendar.model';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    readonly selectedDate = signal<Date>(new Date());

    readonly months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    readonly years = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);

    private getHolidays(year: number): Map<string, string> {
        const holidays = new Map<string, string>();
        holidays.set(`${year}-0-1`, 'Confraternização Universal');
        holidays.set(`${year}-3-21`, 'Tiradentes');
        holidays.set(`${year}-4-1`, 'Dia do Trabalho');
        holidays.set(`${year}-8-7`, 'Independência do Brasil');
        holidays.set(`${year}-9-12`, 'Nossa Sra. Aparecida');
        holidays.set(`${year}-10-2`, 'Finados');
        holidays.set(`${year}-10-15`, 'Proclamação da República');
        holidays.set(`${year}-10-20`, 'Consciência Negra');
        holidays.set(`${year}-11-25`, 'Natal');
        holidays.set(`${year}-11-23`, 'Feriado Opcional');
        holidays.set(`${year}-11-28`, 'Feriado Opcional');
        return holidays;
    }

    readonly calendarDays = computed<CalendarDay[]>(() => {
        const currentSelected = this.selectedDate();
        const year = currentSelected.getFullYear();
        const month = currentSelected.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        const startingDayOfWeek = firstDayOfMonth.getDay();
        const today = new Date();

        const holidaysMap = this.getHolidays(year);
        const days: CalendarDay[] = [];

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const prevDate = new Date(year, month - 1, prevMonthLastDay - i);
            days.push({
                date: prevDate,
                dayNumber: prevDate.getDate(),
                isCurrentMonth: false,
                isToday: false,
                isHoliday: false
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            const dateKey = `${year}-${month}-${i}`;
            const holidayName = holidaysMap.get(dateKey);

            days.push({
                date,
                dayNumber: i,
                isCurrentMonth: true,
                isToday,
                isHoliday: !!holidayName,
                holidayName: holidayName
            });
        }

        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            const nextDate = new Date(year, month + 1, i);
            days.push({
                date: nextDate,
                dayNumber: i,
                isCurrentMonth: false,
                isToday: false,
                isHoliday: false
            });
        }

        return days;
    });

    setMonth(monthIndex: number): void {
        const current = this.selectedDate();
        this.selectedDate.set(new Date(current.getFullYear(), monthIndex, 1));
    }

    setYear(year: number): void {
        const current = this.selectedDate();
        this.selectedDate.set(new Date(year, current.getMonth(), 1));
    }
}