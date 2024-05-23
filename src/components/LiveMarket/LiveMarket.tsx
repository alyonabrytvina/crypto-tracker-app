import React, { FC } from 'react';
import { ParamWrapper, Wrapper } from './LiveMarket.styled';
import { useAppSelector } from '../../store';
import { useWebsocket } from '../../hooks/useWebsocket';
import { selectCryptoPair } from '../../store/selectors';

export const LiveMarket: FC = () => {
  const selectedCryptoPair = useAppSelector(selectCryptoPair);
  const { marketData, error, isLoading } = useWebsocket(selectedCryptoPair);

  if (error) {
    return <Wrapper>Ops, something went wrong...</Wrapper>;
  }

  const tableData = [{
    key: 1,
    title: 'Symbol',
    value: selectedCryptoPair,
  }, {
    key: 2,

    title: 'Price',
    value: (marketData && !isLoading
      ? marketData?.price ?? 'Loading...'
      : 'Loading...'),
  }, {
    key: 3,

    title: 'Time',
    value: (marketData && !isLoading
      ? marketData?.date ?? 'Loading...'
      : 'Loading...'),
  }];

  return (
    <Wrapper>
      {tableData.map(({ key, title, value }) => (
        <ParamWrapper key={key}>
          <span>
            {title}
            :
          </span>
          <span>{value}</span>
        </ParamWrapper>
      ))}
    </Wrapper>
  );
};
