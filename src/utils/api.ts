import { config } from '../config/config';
import { OpenWeather } from './OpenWeather';

export async function fetchOpenWeatherData(city: string, tempScale: OpenWeather.TempScale): Promise<OpenWeather.OpenWeatherResponse> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${config.OPEN_WEATHER_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Weather data not found');

  const resJson = await res.json();

  return new OpenWeather.OpenWeatherData(resJson).values;
}
