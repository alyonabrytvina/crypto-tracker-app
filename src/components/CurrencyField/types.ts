export interface CurrencyFieldProps {
  handleChangeCrypto: (value: CurrencyOption) => void;
}

export interface CurrencyOption {
  name: string;
  symbol_id: string;
}

export interface CryptoCurrency {
  asset_id_base: string;
  asset_id_quote: string;
  symbol_id: string;
}
