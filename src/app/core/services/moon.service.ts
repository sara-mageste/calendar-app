import { Injectable, signal } from '@angular/core';
import { MoonPhase, MoonPhaseCategory } from '../models/moon.model';

@Injectable({
  providedIn: 'root'
})
export class MoonService {
  readonly currentPhase = signal<MoonPhase>({
    date: new Date().toISOString().split('T')[0],
    phase: 'full',
    name: 'Lua Cheia',
    illumination: 98,
    icon: '🌕'
  });

  getMoonPhaseForDate(date: Date): MoonPhase {
    // Simple phase calculation algorithm for demonstration
    const day = date.getDate();
    const cycle = day % 30;

    let phase: MoonPhaseCategory = 'new';
    let name = 'Lua Nova';
    let icon = '🌑';
    let illumination = 0;

    if (cycle < 4) {
      phase = 'new';
      name = 'Lua Nova';
      icon = '🌑';
      illumination = 5;
    } else if (cycle < 9) {
      phase = 'waxing_crescent';
      name = 'Crescente Côncava';
      icon = '🌒';
      illumination = 25;
    } else if (cycle < 13) {
      phase = 'first_quarter';
      name = 'Quarto Crescente';
      icon = '🌓';
      illumination = 50;
    } else if (cycle < 17) {
      phase = 'waxing_gibbous';
      name = 'Crescente Convexa';
      icon = '🌔';
      illumination = 75;
    } else if (cycle < 21) {
      phase = 'full';
      name = 'Lua Cheia';
      icon = '🌕';
      illumination = 100;
    } else if (cycle < 25) {
      phase = 'waning_gibbous';
      name = 'Minguante Convexa';
      icon = '🌖';
      illumination = 75;
    } else if (cycle < 28) {
      phase = 'third_quarter';
      name = 'Quarto Minguante';
      icon = '🌗';
      illumination = 50;
    } else {
      phase = 'waning_crescent';
      name = 'Minguante Côncava';
      icon = '🌘';
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
