import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarDay, PublicHoliday } from '../models/calendar.model';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    private http = inject(HttpClient);

    readonly months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    readonly years = Array.from({ length: 11 }, (_, i) => 2020 + i);

    readonly selectedMonth = signal<number>(new Date().getMonth());
    readonly selectedYear = signal<number>(new Date().getFullYear());

    readonly countryCode = signal<string>('BR');
    private holidaysMap = signal<Map<string, string>>(new Map());

    constructor() {
        this.detectUserCountry();
    }

    readonly calendarDays = computed<CalendarDay[]>(() => {
        const month = this.selectedMonth();
        const year = this.selectedYear();
        const holidays = this.holidaysMap();
        const today = new Date();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const daysInMonth = lastDayOfMonth.getDate();
        const startingDayOfWeek = firstDayOfMonth.getDay();

        const days: CalendarDay[] = [];

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, prevMonthLastDay - i);
            days.push({
                date,
                dayNumber: prevMonthLastDay - i,
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

            const formattedDate = this.formatDateKey(year, month, i);
            const holidayName = holidays.get(formattedDate);

            days.push({
                date,
                dayNumber: i,
                isCurrentMonth: true,
                isToday,
                isHoliday: !!holidayName,
                holidayName
            });
        }

        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            days.push({
                date,
                dayNumber: i,
                isCurrentMonth: false,
                isToday: false,
                isHoliday: false
            });
        }

        return days;
    });

    private detectUserCountry(): void {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                        .subscribe({
                            next: (data) => {
                                const code = data?.address?.country_code?.toUpperCase() || 'BR';
                                this.countryCode.set(code);
                                this.fetchHolidays(this.selectedYear(), code);
                            },
                            error: () => this.fallbackCountry()
                        });
                },
                () => this.fallbackCountry()
            );
        } else {
            this.fallbackCountry();
        }
    }

    private fallbackCountry(): void {
        const locale = navigator.language || 'pt-BR';
        const code = locale.includes('-') ? locale.split('-')[1].toUpperCase() : 'BR';
        this.countryCode.set(code);
        this.fetchHolidays(this.selectedYear(), code);
    }

    fetchHolidays(year: number, country: string): void {
        const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`;

        this.http.get<PublicHoliday[]>(url).subscribe({
            next: (holidays) => {
                const map = new Map<string, string>();
                holidays.forEach(h => {
                    map.set(h.date, h.localName || h.name);
                });
                this.holidaysMap.set(map);
            },
            error: (err) => console.error('Error retrieving holidays:', err)
        });
    }

    setMonth(month: number): void {
        this.selectedMonth.set(month);
    }

    setYear(year: number): void {
        const oldYear = this.selectedYear();
        this.selectedYear.set(year);

        if (oldYear !== year) {
            this.fetchHolidays(year, this.countryCode());
        }
    }

    private formatDateKey(year: number, month: number, day: number): string {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    }
}