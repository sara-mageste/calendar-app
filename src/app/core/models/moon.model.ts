export type MoonPhaseCategory =
  | 'new'
  | 'waxing_crescent'
  | 'first_quarter'
  | 'waxing_gibbous'
  | 'full'
  | 'waning_gibbous'
  | 'third_quarter'
  | 'waning_crescent';

export interface MoonPhase {
  date: string;
  phase: MoonPhaseCategory;
  name: string;
  illumination: number;
  icon: string;
}
