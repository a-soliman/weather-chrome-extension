import { getStoredCities, getStoredOptions, setStoredCities, setStoredOptions } from '../utils/storage';
import { fetchOpenWeatherData } from '../utils/api';

const initializeStorage = (): void => {
  setStoredCities([]);
  setStoredOptions({ overlay: false, homeCity: '', tempScale: 'metric' });
};

const initializeContextMenu = (): void => {
  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension',
  });
};

const initializeAlarms = (): void => {
  chrome.alarms.create({
    periodInMinutes: 60,
  });
};

const handleContextMenuClick = async (evt: chrome.contextMenus.OnClickData): Promise<void> => {
  const storedCities = await getStoredCities();
  setStoredCities([...storedCities, evt.selectionText]);
};

const updateBadgeText = async (): Promise<null> => {
  const { homeCity, tempScale } = await getStoredOptions();
  if (!homeCity) return;

  const data = await fetchOpenWeatherData(homeCity, tempScale);
  const temp = Math.round(data.main.temp);
  const symbol = tempScale === 'metric' ? '\u2103' : '\u2109';

  chrome.action.setBadgeText({
    text: `${temp} ${symbol}`,
  });
};

chrome.runtime.onInstalled.addListener(() => {
  initializeStorage();
  initializeContextMenu();
  initializeAlarms();
});

chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
chrome.alarms.onAlarm.addListener(updateBadgeText);
