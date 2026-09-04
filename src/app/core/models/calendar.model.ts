export interface CalendarDay {
    date: Date;
    dayNumber: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isHoliday: boolean;
    holidayName?: string;
}

export interface PublicHoliday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
}