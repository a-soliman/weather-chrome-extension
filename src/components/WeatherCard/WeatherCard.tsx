import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';

import { fetchOpenWeatherData } from '../../utils/api';
import { OpenWeather } from '../../utils/OpenWeather';
import { WeatherCardContainer } from './WeatherCardContainer';

import './WeatherCard.scss';

interface WeatherCardProps {
  city: string;
  tempScale: OpenWeather.TempScale;
  onDelete?: () => void;
}

type WeatherCardState = 'loading' | 'error' | 'ready';

export const WeatherCard: React.FC<WeatherCardProps> = ({ city, onDelete, tempScale }): JSX.Element => {
  const [cardState, setCardState] = useState<WeatherCardState>('loading');
  const [weatherData, setWeatherData] = useState<OpenWeather.OpenWeatherResponse | null>(null);
  useEffect(() => {
    setCardState('loading');
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState('ready');
      })
      .catch((err) => {
        console.error(err);
        setCardState('error');
      });
  }, [city, tempScale]);

  const round = (input: number): number => Math.round(input);

  if (['loading', 'error'].includes(cardState)) {
    const message = cardState === 'loading' ? 'Loading...' : `Error: Could not retrieve weather data for this city.`;
    return (
      <WeatherCardContainer>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">{message}</Typography>
      </WeatherCardContainer>
    );
  }

  const temp = round(weatherData.main.temp);
  const feelsLike = round(weatherData.main.feelsLike);
  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weatherCard-title">{weatherData.name}</Typography>
      <Typography className="weatherCard-body">{temp}</Typography>
      <Typography className="weatherCard-body">Feels like: {feelsLike}</Typography>
    </WeatherCardContainer>
  );
};
