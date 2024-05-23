import { API_KEY, DEFAULT_SPOT_MARKET_SYMBOL_ID, URLS } from '../constants';

export async function getAllCryptoSymbols() {
  try {
    if (!API_KEY) {
      return undefined;
    }

    const response = await fetch(URLS.SYMBOLS_URL(DEFAULT_SPOT_MARKET_SYMBOL_ID), {
      headers: {
        'X-CoinAPI-Key': API_KEY,
      },
    });

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getCryptoHistoryData(selectedCryptoSymbolId: string, period: string) {
  try {
    if (!API_KEY) {
      return undefined;
    }

    const response = await fetch(URLS.HISTORY_URL(selectedCryptoSymbolId, period), {
      headers: {
        'X-CoinAPI-Key': API_KEY,
      },
    });

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}
