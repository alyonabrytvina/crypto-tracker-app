import React, { useState } from 'react';
import { Button } from '@mui/material';
import { DEFAULT_CRYPTO_CUR, DEFAULT_CRYPTO_SYMBOL_ID } from '../../constants';
import { CurrencyField } from '../../components/CurrencyField/CurrencyField';
import { HistoryChart } from '../../components/HistoryChart/HistoryChart';
import { CurrencyOption } from '../../components/CurrencyField/types';
import { LiveMarket } from '../../components/LiveMarket/LiveMarket';
import { setCryptoPair, setCryptoSymbolId } from '../../store/slice';
import { useAppDispatch } from '../../store';
import {
  BockWrapper,
  CurrencyFieldWrapper,
  MainWrapper,
} from './CryptoPage.styled';

export const CryptoPage = () => {
  const dispatch = useAppDispatch();

  const [selectedCurrency, setSelectedCurrency] = useState(DEFAULT_CRYPTO_CUR);
  const [selectedCryptoSymbolId, setSelectedCryptoSymbolId] = useState(DEFAULT_CRYPTO_SYMBOL_ID);

  const handleChangeCrypto = (value: CurrencyOption) => {
    setSelectedCurrency(value.name);
    setSelectedCryptoSymbolId(value.symbol_id);
  };

  const handleClickSubscribeBtn = () => {
    dispatch(setCryptoPair(selectedCurrency));
    dispatch(setCryptoSymbolId(selectedCryptoSymbolId));
  };

  return (
    <MainWrapper>
      <BockWrapper>
        <CurrencyFieldWrapper>
          <CurrencyField
            handleChangeCrypto={handleChangeCrypto}
          />
          <Button
            variant="contained"
            onClick={handleClickSubscribeBtn}
          >
            Subscribe
          </Button>
        </CurrencyFieldWrapper>
        <LiveMarket />
      </BockWrapper>
      <HistoryChart />
    </MainWrapper>
  );
};
