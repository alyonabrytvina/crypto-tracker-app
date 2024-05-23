import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCryptoCurrencies = (state: RootState) => state.crypto.cryptoCurrencies;

export const selectCryptoPair = (state: RootState) => state.crypto.selectedCryptoPair;

export const selectCryptoSymbolId = (state: RootState) => state.crypto.selectedCryptoSymbolId;

export const selectCryptoPairs = createSelector(
  selectCryptoCurrencies,
  (currencies) => {
    if (!currencies || !Array.isArray(currencies)) {
      return [];
    }

    return currencies
      .map((asset) => ({
        name: `${asset.asset_id_base}/${asset.asset_id_quote}`,
        symbol_id: asset.symbol_id,
      }));
  },
);

export const selectChartData = (state: RootState) => state.crypto.chartData;

export const selectHistoryDataPrices = createSelector(
  selectChartData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((entry) => entry.price_close).reverse();
  },
);

export const selectHistoryDataLabels = createSelector(
  selectChartData,
  (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((entry) => entry.time_period_start).reverse();
  },
);
