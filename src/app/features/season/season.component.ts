import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../core/services/weather.service';

interface SeasonInfo {
  name: string;
  icon: string;
}

type SeasonKey = 'SUMMER' | 'AUTUMN' | 'WINTER' | 'SPRING';

@Component({
  selector: 'app-season',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="season-container">
      <span class="material-symbols-outlined season-icon">
        {{ season().icon }}
      </span>
      <span class="season-text">IT IS {{ season().name }}.</span>
    </div>
  `,
  styles: [`
    .season-container {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-left: 12px;
      color: #4a4a4a;
    }

    .season-icon {
      font-size: 28px;
      color: inherit;
    }

    .season-text {
      font-weight: 700;
      font-size: 0.8rem;
      letter-spacing: 1.5px;
      color: inherit;
    }
  `]
})
export class SeasonComponent {
  private readonly weatherService = inject(WeatherService);
  private readonly currentDate = signal(new Date());

  readonly season = computed<SeasonInfo>(() => {
    const date = this.currentDate();
    const lat = this.weatherService.currentLatitude();
    const lon = this.weatherService.currentLongitude();
    const seasonKey = this.calculateSeason(date, lat, lon);

    const seasonDetails: Record<SeasonKey, SeasonInfo> = {
      SUMMER: { name: 'SUMMER', icon: 'beach_access' },
      AUTUMN: { name: 'AUTUMN', icon: 'spa' },
      WINTER: { name: 'WINTER', icon: 'snowflake' },
      SPRING: { name: 'SPRING', icon: 'local_florist' },
    };

    return seasonDetails[seasonKey];
  });

  private calculateSeason(date: Date, latitude: number, longitude: number): SeasonKey {
    const month = date.getMonth();
    const day = date.getDate();

    // Southern Hemisphere
    if (latitude < 0) {
      if ((month === 2 && day >= 21) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
        return 'AUTUMN';
      } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
        return 'WINTER';
      } else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
        return 'SPRING';
      } else {
        return 'SUMMER';
      }
    }

    // East Asia
    const isEastAsiaMeteorological = latitude >= 15 && latitude <= 55 && longitude >= 100 && longitude <= 155;

    if (isEastAsiaMeteorological) {
      if (month >= 2 && month <= 4) {
        return 'SPRING';
      } else if (month >= 5 && month <= 7) {
        return 'SUMMER';
      } else if (month >= 8 && month <= 10) {
        return 'AUTUMN';
      } else {
        return 'WINTER';
      }
    }

    // Western Northern Hemisphere
    if ((month === 2 && day >= 21) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
      return 'SPRING';
    } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
      return 'SUMMER';
    } else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day <= 20)) {
      return 'AUTUMN';
    } else {
      return 'WINTER';
    }
  }
}