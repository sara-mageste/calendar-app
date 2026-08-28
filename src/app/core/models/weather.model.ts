export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  icon: string;
  precipitationProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface CurrentWeather {
  city: string;
  temperature: number;
  condition: string;
  description: string;
  icon: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyForecast[];
}
