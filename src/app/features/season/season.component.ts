import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SeasonInfo {
    name: string;
    icon: string;
}

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
    private readonly currentDate = signal(new Date());

    readonly season = computed<SeasonInfo>(() => {
        const date = this.currentDate();
        const month = date.getMonth();
        const day = date.getDate();

        if ((month === 11 && day >= 21) || month === 0 || month === 1 || (month === 2 && day <= 20)) {
            return { name: 'SUMMER', icon: 'beach_access' };
        } else if ((month === 2 && day >= 21) || month === 3 || month === 4 || (month === 5 && day <= 20)) {
            return { name: 'AUTUMN', icon: 'spa' };
        } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day <= 22)) {
            return { name: 'WINTER', icon: 'snowflake' };
        } else {
            return { name: 'SPRING', icon: 'local_florist' };
        }
    });
}