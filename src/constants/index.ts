export const API_KEY = process.env.REACT_APP_COIN_API_KEY;
export const API_KEY_1 = process.env.REACT_APP_COIN_API_KEY_1;
export const API_KEY_2 = process.env.REACT_APP_COIN_API_KEY_2;

export const API_KEYS = [
  API_KEY,
  API_KEY_1,
  API_KEY_2,
];

export const LIST_BOX_PADDING = 8; // px
export const LIST_ITEM_SIZE = 42; // px
export const LIST_ITEM_IN_VIEW = 8;

export const DEFAULT_CRYPTO_CUR = 'BTC/USDT';
export const DEFAULT_CRYPTO_SYMBOL_ID = 'BINANCE_SPOT_BTC_USDT';
export const DEFAULT_SPOT_MARKET_SYMBOL_ID = 'BINANCE_SPOT_';

export const URLS = {
  SYMBOLS_URL: (symbolId: string) => `https://rest.coinapi.io/v1/symbols?filter_symbol_id=${symbolId}`,
  HISTORY_URL: (symbolId: string, period_id: string) =>
    `https://rest.coinapi.io/v1/ohlcv/${symbolId}/history?period_id=${period_id}`,
  EXCHANGE_WS_URL: 'wss://ws.coinapi.io/v1/',
};

export const PERIOD = {
  SEC: '30SEC',
  HRS: '4HRS',
  DAY: '1DAY',
  MONTH: '1MTH',
  YEAR: '1YRS',
};

export const CHART_OPTIONS = {
  responsive: true,
};

export const BLOCK_BTN_DELAY = 2000;
