import React, {
  FC, useEffect,
} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material';
import { CurrencyOption, CurrencyFieldProps } from './types';
import { useAppDispatch, useAppSelector } from '../../store';
import { AutocompleteWrapper, StyledPopper } from './CurrencyField.styled';
import {
  getCryptoSymbolsAsync,
} from '../../store/async-actions';
import { selectCryptoPair, selectCryptoPairs } from '../../store/selectors';
import { ListBox } from './ListBox';

export const CurrencyField: FC<CurrencyFieldProps> = ({
  handleChangeCrypto,
}) => {
  const dispatch = useAppDispatch();
  const selectedCurrency = useAppSelector(selectCryptoPair);
  const options = useAppSelector(selectCryptoPairs);
  const theme = useTheme();

  useEffect(() => {
    if (!options?.length) {
      dispatch(getCryptoSymbolsAsync());
    }
  }, [options?.length]);

  return (
    <AutocompleteWrapper>
      <Autocomplete
        id="crypto-currencies"
        sx={{
          minWidth: '420px',
          [theme.breakpoints.down('md')]: {
            minWidth: '220px',
          },
        }}
        disableListWrap
        PopperComponent={StyledPopper}
        ListboxComponent={ListBox}
        options={options}
        getOptionLabel={(option: CurrencyOption) => (option && option.name ? option.name : '')}
        onChange={(event, value) => {
          if (value) {
            handleChangeCrypto(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Crypto currencies"
          />
        )}
        renderOption={(props, option, state) => [props, option.name, state.index] as React.ReactNode}
        value={options.find((option: CurrencyOption) => option.name === selectedCurrency) || null}
      />
    </AutocompleteWrapper>
  );
};
