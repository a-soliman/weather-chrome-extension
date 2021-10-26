import { setStoredCities, setStoredOptions } from '../utils/storage';

const initializerFunc = (): void => {
  setStoredCities([]);
  setStoredOptions({ homeCity: '', tempScale: 'metric' });
};

chrome.runtime.onInstalled.addListener(() => {
  initializerFunc();
});
