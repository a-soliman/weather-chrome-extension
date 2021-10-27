import { getStoredCities, setStoredCities, setStoredOptions } from '../utils/storage';

const initializerFunc = (): void => {
  setStoredCities([]);
  setStoredOptions({ overlay: false, homeCity: '', tempScale: 'metric' });
};

const createContextMenu = (): void => {
  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension',
  });
};

const handleContextMenuClick = async (evt: chrome.contextMenus.OnClickData): Promise<void> => {
  const storedCities = await getStoredCities();
  setStoredCities([...storedCities, evt.selectionText]);
};

chrome.runtime.onInstalled.addListener(() => {
  initializerFunc();
  createContextMenu();
});

chrome.contextMenus.onClicked.addListener(handleContextMenuClick);
