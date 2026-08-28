import { Injectable, signal } from '@angular/core';
import { BackgroundOption, ColorOption, ThemeConfig } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly availableColors = signal<ColorOption[]>([
    {
      id: 'indigo-pink',
      name: 'Índigo Neon',
      primaryColor: '#6366f1',
      secondaryColor: '#ec4899',
      accentColor: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
    },
    {
      id: 'emerald-teal',
      name: 'Aurora Esmeralda',
      primaryColor: '#10b981',
      secondaryColor: '#14b8a6',
      accentColor: '#06b6d4',
      gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
    },
    {
      id: 'sunset-orange',
      name: 'Pôr do Sol',
      primaryColor: '#f97316',
      secondaryColor: '#e11d48',
      accentColor: '#fbbf24',
      gradient: 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)'
    },
    {
      id: 'cyber-purple',
      name: 'Cyber Violeta',
      primaryColor: '#a855f7',
      secondaryColor: '#6366f1',
      accentColor: '#d946ef',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)'
    }
  ]);

  readonly availableBackgrounds = signal<BackgroundOption[]>([
    {
      id: 'cosmic-dark',
      name: 'Cósmico Escuro',
      type: 'gradient',
      gradient: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
    },
    {
      id: 'midnight-blue',
      name: 'Azul Meia-Noite',
      type: 'gradient',
      gradient: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)'
    },
    {
      id: 'solid-dark',
      name: 'Escuro Puro',
      type: 'solid',
      color: '#0f172a'
    }
  ]);

  readonly currentTheme = signal<ThemeConfig>({
    selectedColor: this.availableColors()[0],
    selectedBackground: this.availableBackgrounds()[0],
    isDarkMode: true
  });

  setColor(color: ColorOption): void {
    this.currentTheme.update(theme => ({
      ...theme,
      selectedColor: color
    }));
  }

  setBackground(bg: BackgroundOption): void {
    this.currentTheme.update(theme => ({
      ...theme,
      selectedBackground: bg
    }));
  }

  toggleDarkMode(): void {
    this.currentTheme.update(theme => ({
      ...theme,
      isDarkMode: !theme.isDarkMode
    }));
  }
}
