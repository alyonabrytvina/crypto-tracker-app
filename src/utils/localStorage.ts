import type { RootState } from '../store';
import { CryptoCurrency } from '../components/CurrencyField/types';

export const saveState = (cryptoCurrencies: CryptoCurrency[]) => {
  try {
    const serializedState = JSON.stringify(cryptoCurrencies);
    localStorage.setItem('cryptoCurrencies', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage.ts', err);
  }
};

export const stateToStorageSelector = (state: RootState) => state.crypto.cryptoCurrencies;

export const loadState = (): CryptoCurrency[] => {
  try {
    const serializedState = localStorage.getItem('cryptoCurrencies');

    if (serializedState === null) {
      return [];
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage.ts', err);
    return [];
  }
};
