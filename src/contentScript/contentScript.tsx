import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import { Card } from '@material-ui/core';

import { WeatherCard } from '../components/WeatherCard/WeatherCard';

import { getStoredOptions, LocalStorageOptions, setStoredOptions } from '../utils/storage';

import './contentScript.scss';

const weatherCardStyles: React.CSSProperties = {
  position: 'fixed',
  left: '5%',
  top: '15%',
  backgroundColor: '#7777bb',
  maxWidth: '240px',
  maxHeight: '240px',
  zIndex: 99999,
};

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleClose = () => {
    const updatedOptions = { ...options, overlay: false };
    setOptions(updatedOptions);
    setStoredOptions(updatedOptions);
  };

  if (!options || !options.homeCity || !options.overlay) return null;
  return (
    <Card className="overlayCard" style={weatherCardStyles}>
      <WeatherCard city={options.homeCity} tempScale={options.tempScale} onDelete={handleClose} />
    </Card>
  );
};

const root = document.createElement('div');
root.id = 'weatherExtensionRoot';
document.body.appendChild(root);
ReactDom.render(<App />, root);
