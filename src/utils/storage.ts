import { OpenWeather } from './OpenWeather';

export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  overlay: boolean;
  homeCity: string;
  tempScale: OpenWeather.TempScale;
}

export type LocalStorageKeys = keyof LocalStorage;

class Storage {
  static instance: Storage;

  static getInstance(): Storage {
    if (!Storage.instance) Storage.instance = new Storage();
    return Storage.instance;
  }

  public set(input: {}): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set(input, () => {
        resolve();
      });
    });
  }

  public get(keys: string[]): Promise<any> {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (res: LocalStorage) => {
        resolve(res);
      });
    });
  }
}

const storageInstance = Storage.getInstance();

// CITIES
export async function setStoredCities(cities: string[]): Promise<void> {
  const values: LocalStorage = { cities };
  return storageInstance.set(values);
}

export async function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities'];
  const res = await storageInstance.get(keys);
  return res.cities ?? [];
}

// OPTIONS
export async function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const values: LocalStorage = { options };
  return storageInstance.set(values);
}

export async function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options'];
  const res = await storageInstance.get(keys);
  return res.options ?? {};
}
