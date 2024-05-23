import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CRYPTO_CUR, DEFAULT_CRYPTO_SYMBOL_ID } from '../constants';
import {
  getCryptoHistoryDataAsync,
  getCryptoSymbolsAsync,
} from './async-actions';
import { CryptoCurrency } from '../components/CurrencyField/types';
import { HistoryCryptoData } from './types';

interface CryptoState {
  selectedCryptoPair: string,
  selectedCryptoSymbolId: string,
  chartData: HistoryCryptoData[],
  cryptoCurrencies: CryptoCurrency[],
}

export const initialState: CryptoState = {
  selectedCryptoPair: DEFAULT_CRYPTO_CUR,
  selectedCryptoSymbolId: DEFAULT_CRYPTO_SYMBOL_ID,
  cryptoCurrencies: [],
  chartData: [],
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoPair: (state, action: PayloadAction<string>) => {
      state.selectedCryptoPair = action.payload;
    },
    setCryptoSymbolId: (state, action: PayloadAction<string>) => {
      state.selectedCryptoSymbolId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoSymbolsAsync.rejected, (state) => {
        state.cryptoCurrencies = [];
      })
      .addCase(getCryptoSymbolsAsync.fulfilled, (state, { payload }) => {
        state.cryptoCurrencies = payload;
      })
      .addCase(getCryptoHistoryDataAsync.rejected, (state) => {
        state.chartData = [];
      })
      .addCase(getCryptoHistoryDataAsync.fulfilled, (state, { payload }) => {
        state.chartData = payload;
      });
  },
});

export const {
  setCryptoPair,
  setCryptoSymbolId,
} = cryptoSlice.actions;

export const cryptoReducer = cryptoSlice.reducer;
