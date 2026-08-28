export type HolidayType = 'national' | 'state' | 'municipal' | 'observance' | 'optional';

export interface Holiday {
  date: string;
  name: string;
  type: HolidayType;
  description?: string;
  icon?: string;
}
