export interface Location {
  lat: number;
  lon: number;
  name?: string;
  country?: string;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface Forecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export type WeatherType = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle' 
  | 'thunderstorm' 
  | 'snow' 
  | 'mist' 
  | 'smoke' 
  | 'haze' 
  | 'dust' 
  | 'fog' 
  | 'sand' 
  | 'ash' 
  | 'squall' 
  | 'tornado';

export interface WeatherIconProps {
  weatherType: WeatherType;
  className?: string;
  animate?: boolean;
}