import './popup.scss';
import 'fontsource-roboto';

import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { Box, Grid, Paper } from '@material-ui/core';

import { getStoredCities, getStoredOptions, setStoredOptions, LocalStorageOptions, setStoredCities } from '../utils/storage';
import { Messages } from '../utils/messages';
import { SearchBar } from './SearchBar/SearchBar';
import { WeatherCard } from '../components/WeatherCard/WeatherCard';
import { TempScaleToggler } from './TempScaleToggler/TempScaleToggler';
import { OverlayController } from './OverlayController/OverlayController';

const App: React.FC<{}> = (): JSX.Element => {
  const [cities, setCities] = useState<string[]>([]);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  /**
   * LOAD THE STORED 'cities', 'options' ON COMPONENT LOAD
   */
  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleAddCity = (city: string): void => {
    const updatedCities = [...cities, city];
    setCities(updatedCities);
    setStoredCities(updatedCities);
  };

  const handleDeleteCity = (index: number): void => {
    const updatedCities = cities.slice();
    updatedCities.splice(index, 1);
    setCities(updatedCities);
    setStoredCities(updatedCities);
  };

  const handleTempScaleToggle = (): void => {
    const updatedOptions: LocalStorageOptions = { ...options, tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric' };
    setOptions(updatedOptions);
    setStoredOptions(updatedOptions);
  };

  const handleOverlayToggleOnCurrentTab = (): void => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs.length > 0) {
        console.log(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
      }
    });
  };

  if (!options) return null; // maybe a loader...

  return (
    <Box mx="8px" my="16px">
      <Paper>
        <Box px="15px" py="5px">
          <Grid container wrap="nowrap" justifyContent="space-between">
            <SearchBar addClickHandler={handleAddCity} />
            {options.tempScale && <TempScaleToggler tempScale={options.tempScale} onToggle={handleTempScaleToggle} />}
            <OverlayController isActive={options.overlay} onToggle={handleOverlayToggleOnCurrentTab} />
          </Grid>
        </Box>
      </Paper>

      {options.homeCity !== '' && <WeatherCard city={options.homeCity} tempScale={options.tempScale} />}
      {cities.length
        ? cities.map((city, idx) => (
            <WeatherCard
              key={idx}
              city={city}
              tempScale={options.tempScale}
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
