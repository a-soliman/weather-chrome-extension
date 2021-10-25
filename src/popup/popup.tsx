import './popup.scss';
import 'fontsource-roboto';

import React, { useState } from 'react';
import ReactDom from 'react-dom';

import { Box } from '@material-ui/core';

import { SearchBar } from './SearchBar/SearchBar';
import { WeatherCard } from './WeatherCard/WeatherCard';

const App: React.FC<{}> = (): JSX.Element => {
  const [cities, setCities] = useState<string[]>([
    'San Francisco',
    'not real city',
  ]);

  const handleAddCity = (city: string) => setCities([...cities, city]);
  return (
    <Box mx="8px" my="16px">
      <SearchBar addClickHandler={handleAddCity} />
      {cities.map((city, idx) => (
        <WeatherCard key={idx} city={city} />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDom.render(<App />, root);
