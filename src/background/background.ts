import { setStoredCities } from '../utils/storage';

const initializerFunc = (): void => {
  setStoredCities([]);
};

chrome.runtime.onInstalled.addListener(() => {
  initializerFunc();
});
