export interface ColorOption {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradient: string;
}

export interface BackgroundOption {
  id: string;
  name: string;
  type: 'image' | 'gradient' | 'solid';
  url?: string;
  gradient?: string;
  color?: string;
}

export interface ThemeConfig {
  selectedColor: ColorOption;
  selectedBackground: BackgroundOption;
  isDarkMode: boolean;
}
