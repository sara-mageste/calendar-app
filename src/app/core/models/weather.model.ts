export interface HourlyForecast {
  time: string;
  temp: number;
  condition?: string;
  icon: string;
  pop?: number;
  precipitationProbability?: number;
  humidity?: number;
  windSpeed?: number;
}

export interface CurrentWeather {
  city: string;
  temperature: number;
  condition: string;
  description?: string;
  icon: string;
  high?: number;
  low?: number;
  tempMax?: number;
  tempMin?: number;
  humidity?: number;
  windSpeed?: number;
  uvIndex?: number;
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  hourly: HourlyForecast[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyForecast[];
}