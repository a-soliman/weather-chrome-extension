import './popup.scss';
import 'fontsource-roboto';

import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { Box } from '@material-ui/core';

import { getStoredCities, setStoredCities } from '../utils/storage';
import { SearchBar } from './SearchBar/SearchBar';
import { WeatherCard } from './WeatherCard/WeatherCard';

const App: React.FC<{}> = (): JSX.Element => {
  const [cities, setCities] = useState<string[]>([]);

  /**
   * LOAD THE STORED 'cities' ON COMPONENT LOAD
   */
  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
  }, []);

  const handleAddCity = (city: string) => {
    const updatedCities = [...cities, city];
    setCities(updatedCities);
    setStoredCities(updatedCities);
  };

  const handleDeleteCity = (index: number) => {
    const updatedCities = cities.slice();
    updatedCities.splice(index, 1);
    setCities(updatedCities);
    setStoredCities(updatedCities);
  };

  return (
    <Box mx="8px" my="16px">
      <SearchBar addClickHandler={handleAddCity} />

      {cities.length
        ? cities.map((city, idx) => (
            <WeatherCard
              key={idx}
              city={city}
              onDelete={() => {
                handleDeleteCity(idx);
              }}
            />
          ))
        : null}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDom.render(<App />, root);
