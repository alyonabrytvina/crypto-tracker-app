import React, {
  FC, useEffect, useState,
} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend, ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button } from '@mui/material';
import { BLOCK_BTN_DELAY, CHART_OPTIONS, PERIOD } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectCryptoPair,
  selectCryptoSymbolId,
  selectHistoryDataLabels,
  selectHistoryDataPrices,
} from '../../store/selectors';
import { getCryptoHistoryDataAsync } from '../../store/async-actions';
import { ButtonsWrapper, Wrapper } from './HistoryChart.styled';
import { formatLabel } from '../../utils/formatLabel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const HistoryChart: FC = () => {
  const dispatch = useAppDispatch();

  const selectedCryptoPair = useAppSelector(selectCryptoPair);
  const selectedCryptoSymbolId = useAppSelector(selectCryptoSymbolId);

  const prices = useAppSelector(selectHistoryDataPrices);
  const labels = useAppSelector(selectHistoryDataLabels);

  const [period, setPeriod] = useState(PERIOD.DAY);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (period && selectedCryptoPair) {
      dispatch(getCryptoHistoryDataAsync({ period, selectedCryptoSymbolId }));
    }
  }, [period, selectedCryptoPair]);

  const handleClick = (value: string) => {
    setPeriod(value);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, BLOCK_BTN_DELAY);
  };

  const data: ChartData<'line', number[], string> = {
    labels: formatLabel(labels, period),
    datasets: [
      {
        fill: true,
        label: selectedCryptoPair,
        data: prices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Wrapper>
      <Line options={CHART_OPTIONS} data={data} />
      <ButtonsWrapper>
        {Object.entries(PERIOD).map(([key, value]) => (
          <Button
            key={key}
            variant={period === value ? 'contained' : 'outlined'}
            onClick={() => handleClick(value)}
            disabled={disabled}
          >
            {key}
          </Button>
        ))}
      </ButtonsWrapper>
    </Wrapper>
  );
};
