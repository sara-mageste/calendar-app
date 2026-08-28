import { Injectable, signal, effect } from '@angular/core';
import { ColorOption, ThemeConfig } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly availableColors = signal<ColorOption[]>([
    {
      id: 'default-pastel',
      name: 'Pastel Aura',
      primaryColor: '#facc15',
      secondaryColor: '#f472b6',
      accentColor: '#2dd4bf',
      gradient: 'linear-gradient(135deg, #facc15, #f472b6, #2dd4bf)'
    },
    {
      id: 'sunset-amber',
      name: 'Sunset',
      primaryColor: '#fbbf24',
      secondaryColor: '#0015ffff',
      accentColor: '#cc00ffff',
      gradient: 'linear-gradient(135deg, #fbbf24, #a855f7, #3b82f6)'
    },
    {
      id: 'emerald-aurora',
      name: 'Emerald Aurora',
      primaryColor: '#fbbf24',
      secondaryColor: '#00e096ff',
      accentColor: '#06b6d4',
      gradient: 'linear-gradient(135deg, #fbbf24, #10b981, #06b6d4)'
    },
    {
      id: 'cyber-violet',
      name: 'Cyber Violet',
      primaryColor: '#ff0000ff',
      secondaryColor: '#5b02ffff',
      accentColor: '#021bffff',
      gradient: 'linear-gradient(135deg, #f43f5e, #8b5cf6, #06b6d4)'
    }
  ]);

  readonly currentTheme = signal<ThemeConfig>({
    selectedColor: this.availableColors()[0],
    selectedBackground: { id: 'default', name: 'Default', type: 'solid', color: '#eef2f5' },
    isDarkMode: false
  });

  constructor() {
    effect(() => {
      const color = this.currentTheme().selectedColor;
      if (color) {
        document.documentElement.style.setProperty('--primary-color', color.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', color.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', color.accentColor || color.primaryColor);
        document.documentElement.style.setProperty('--primary-gradient', color.gradient);
      }
    });
  }

  setColor(color: ColorOption): void {
    this.currentTheme.update(theme => ({
      ...theme,
      selectedColor: color
    }));
  }
}