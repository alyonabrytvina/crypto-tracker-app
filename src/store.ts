import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cryptoReducer, initialState } from './store/slice';
import {
  loadState,
  saveState,
  stateToStorageSelector,
} from './utils/localStorage';

const persistedStore = loadState();

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  preloadedState: {
    crypto: {
      ...initialState,
      cryptoCurrencies: persistedStore,
    },
  },
});

store.subscribe(() => {
  saveState(stateToStorageSelector(store.getState()));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
