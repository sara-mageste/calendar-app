import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoonService } from '../../core/services/moon.service';

@Component({
    selector: 'app-moon-phase',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './moon-phase.component.html',
    styleUrl: './moon-phase.component.css'
})
export class MoonPhaseComponent {
    readonly moonService = inject(MoonService);
}