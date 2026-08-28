import { Injectable, signal } from '@angular/core';
import { Holiday } from '../models/holiday.model';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  readonly holidays = signal<Holiday[]>([
    { date: '2026-01-01', name: 'Confraternização Universal', type: 'national', icon: '🎆' },
    { date: '2026-02-17', name: 'Carnaval', type: 'optional', icon: '🎭' },
    { date: '2026-04-03', name: 'Sexta-feira Santa', type: 'national', icon: '✝️' },
    { date: '2026-04-21', name: 'Tiradentes', type: 'national', icon: '🇧🇷' },
    { date: '2026-05-01', name: 'Dia do Trabalho', type: 'national', icon: '🛠️' },
    { date: '2026-06-04', name: 'Corpus Christi', type: 'optional', icon: '🍷' },
    { date: '2026-09-07', name: 'Independência do Brasil', type: 'national', icon: '🇧🇷' },
    { date: '2026-10-12', name: 'Nossa Senhora Aparecida', type: 'national', icon: '👑' },
    { date: '2026-11-02', name: 'Finados', type: 'national', icon: '🕯️' },
    { date: '2026-11-15', name: 'Proclamação da República', type: 'national', icon: '🇧🇷' },
    { date: '2026-11-20', name: 'Dia da Consciência Negra', type: 'national', icon: '✊🏿' },
    { date: '2026-12-25', name: 'Natal', type: 'national', icon: '🎄' }
  ]);

  getHolidaysForYear(year: number): Holiday[] {
    return this.holidays().filter(h => h.date.startsWith(`${year}-`));
  }

  getHolidayByDate(dateStr: string): Holiday | undefined {
    return this.holidays().find(h => h.date === dateStr);
  }
}
