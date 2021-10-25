export interface LocalStorage {
  cities?: string[];
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const values: LocalStorage = { cities };
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? []);
    });
  });
}
