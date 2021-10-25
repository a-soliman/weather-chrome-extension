import './popup.scss';
import 'fontsource-roboto';

import React, { useState } from 'react';
import ReactDom from 'react-dom';

import { Box } from '@material-ui/core';

import { SearchBar } from './SearchBar/SearchBar';
import { WeatherCard } from './WeatherCard/WeatherCard';

const App: React.FC<{}> = (): JSX.Element => {
  const [cities, setCities] = useState<string[]>(['San Francisco']);

  const handleAddCity = (city: string) => setCities([...cities, city]);
  const handleDeleteCity = (index: number) => {
    const _cities = cities.slice();
    _cities.splice(index, 1);
    setCities(_cities);
  };
  return (
    <Box mx="8px" my="16px">
      <SearchBar addClickHandler={handleAddCity} />
      {cities.map((city, idx) => (
        <WeatherCard
          key={idx}
          city={city}
          onDelete={() => {
            handleDeleteCity(idx);
          }}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDom.render(<App />, root);
