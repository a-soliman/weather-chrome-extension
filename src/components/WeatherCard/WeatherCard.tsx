import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@material-ui/core';

import { fetchOpenWeatherData, getWeatherIconSrc } from '../../utils/api';
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
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">{message}</Typography>
      </WeatherCardContainer>
    );
  }

  const temp = round(weatherData.main.temp);
  const feelsLike = round(weatherData.main.feelsLike);
  const displayDescription = weatherData.weather.length > 0;

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justifyContent='space-between'>
        <Grid item>
          <Typography className="weatherCard-title">{weatherData.name}</Typography>
          <Typography className="weatherCard-temp">{temp}</Typography>
          <Typography className="weatherCard-body">Feels like: {feelsLike}</Typography>
        </Grid>
        <Grid item>
          {displayDescription && (
            <>
              <img src={getWeatherIconSrc(weatherData.weather[0].icon)} alt={weatherData.weather[0].icon} />
              <Typography className="weatherCard-body">{weatherData.weather[0].main}</Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};
