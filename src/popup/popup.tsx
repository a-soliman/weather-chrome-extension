import './styles.scss';

import React, { useEffect } from 'react';
import ReactDom from 'react-dom';

import { fetchOpenWeatherData } from '../utils/api';

const App: React.FC<{}> = (): JSX.Element => {
  useEffect(() => {
    fetchOpenWeatherData('San Francisco')
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <img src="./icon.png" alt="" />
    </>
  );
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDom.render(<App />, root);
