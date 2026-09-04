import { Injectable, signal, computed } from '@angular/core';
import { MoonPhase, MoonPhaseCategory } from '../models/moon.model';

@Injectable({
  providedIn: 'root'
})
export class MoonService {
  readonly currentDate = signal<Date>(new Date());

  readonly currentPhase = computed<MoonPhase>(() => {
    return this.getMoonPhaseForDate(this.currentDate());
  });

  getMoonPhaseForDate(date: Date): MoonPhase {
    const knownNewMoon = new Date(2000, 0, 6, 18, 14, 0).getTime();
    const cycleDays = 29.53058770576;

    const diffDays = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
    const currentPhaseDay = (diffDays % cycleDays + cycleDays) % cycleDays;

    let phase: MoonPhaseCategory = 'new';
    let name = 'Lua Nova';
    let icon = 'nightlight';
    let illumination = 0;

    if (currentPhaseDay < 1.84) {
      phase = 'new';
      name = 'Lua Nova';
      icon = 'nightlight';
      illumination = 5;
    } else if (currentPhaseDay < 5.53) {
      phase = 'waxing_crescent';
      name = 'Crescente Côncava';
      icon = 'dark_mode';
      illumination = 25;
    } else if (currentPhaseDay < 9.22) {
      phase = 'first_quarter';
      name = 'Quarto Crescente';
      icon = 'dark_mode';
      illumination = 50;
    } else if (currentPhaseDay < 12.91) {
      phase = 'waxing_gibbous';
      name = 'Crescente Convexa';
      icon = 'brightness_3';
      illumination = 75;
    } else if (currentPhaseDay < 16.61) {
      phase = 'full';
      name = 'Lua Cheia';
      icon = 'brightness_1';
      illumination = 100;
    } else if (currentPhaseDay < 20.30) {
      phase = 'waning_gibbous';
      name = 'Minguante Convexa';
      icon = 'bedtime';
      illumination = 75;
    } else if (currentPhaseDay < 23.99) {
      phase = 'third_quarter';
      name = 'Quarto Minguante';
      icon = 'bedtime';
      illumination = 50;
    } else {
      phase = 'waning_crescent';
      name = 'Minguante Côncava';
      icon = 'nightlight';
      illumination = 20;
    }

    return {
      date: date.toISOString().split('T')[0],
      phase,
      name,
      illumination,
      icon
    };
  }
}
