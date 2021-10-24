import './popup.scss';
import 'fontsource-roboto';

import React, { useState } from 'react';
import ReactDom from 'react-dom';

import { WeatherCard } from './WeatherCard/WeatherCard';

const App: React.FC<{}> = (): JSX.Element => {
  const [cities, setCities] = useState<string[]>([
    'San Francisco',
    'not real city',
  ]);
  return (
    <>
      {cities.map((city, idx) => (
        <WeatherCard key={idx} city={city} />
      ))}
    </>
  );
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDom.render(<App />, root);
