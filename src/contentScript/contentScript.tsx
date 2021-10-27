import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { Card } from '@material-ui/core';

import { WeatherCard } from '../components/WeatherCard/WeatherCard';
import { Messages } from '../utils/messages';
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

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleRunTimeMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleRunTimeMessage);
    };
  }, [options]);

  
  const handleRunTimeMessage = (msg) => {
    if (msg === Messages.TOGGLE_OVERLAY) {
      const updatedOptions = { ...options, overlay: !options.overlay };
      setOptions(updatedOptions);
    }
  };

  const handleClose = () => {
    const updatedOptions = { ...options, overlay: false };
    setOptions(updatedOptions);
    setStoredOptions(updatedOptions);
  };

  if (!options || !options.overlay) return null;
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
