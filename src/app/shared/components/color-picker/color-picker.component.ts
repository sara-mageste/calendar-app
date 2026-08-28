import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { ColorOption } from '../../../core/models/theme.model';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css'
})
export class ColorPickerComponent {
  private readonly themeService = inject(ThemeService);

  readonly isOpen = signal<boolean>(false);
  readonly availableColors = this.themeService.availableColors;
  readonly currentTheme = this.themeService.currentTheme;

  togglePopover(): void {
    this.isOpen.update(open => !open);
  }

  selectColor(color: ColorOption): void {
    this.themeService.setColor(color);
    this.isOpen.set(false);
  }
}
