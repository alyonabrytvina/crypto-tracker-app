import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCryptoSymbols, getCryptoHistoryData } from './api';
import { HistoryCryptoData, ThunkApi } from './types';
import { CryptoCurrency } from '../components/CurrencyField/types';

export const getCryptoSymbolsAsync = createAsyncThunk<
CryptoCurrency[],
void,
ThunkApi
>(
  'crypto/getCryptoSymbolsAsync',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCryptoSymbols();
    } catch (e) {
      const error = e as Error;
      rejectWithValue(error.message);
      return [];
    }
  },
);

export const getCryptoHistoryDataAsync = createAsyncThunk<
HistoryCryptoData[],
{ selectedCryptoSymbolId: string, period: string },
ThunkApi
>(
  'crypto/getCryptoHistoryAsync',
  async ({ selectedCryptoSymbolId, period }, { rejectWithValue }) => {
    try {
      return await getCryptoHistoryData(selectedCryptoSymbolId, period);
    } catch (e) {
      const error = e as Error;
      rejectWithValue(error.message);
      return [];
    }
  },
);
