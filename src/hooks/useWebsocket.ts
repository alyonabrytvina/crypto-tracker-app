import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { API_KEYS, DEFAULT_SPOT_MARKET_SYMBOL_ID, URLS } from '../constants';
import { formatPrice } from '../utils/formatPrice';
import { formatDate } from '../utils/formatDate';

interface MarketData {
  price: string | null,
  date: string | null,
}

export function useWebsocket(cryptoPair: string) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const openSocket = () => {
      setIsLoading(true);
      const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
      const socketInstance = new WebSocket(URLS.EXCHANGE_WS_URL);

      socketInstance.onopen = () => {
        const options = {
          type: 'hello',
          apikey: apiKey,
          heartbeat: false,
          subscribe_data_type: ['trade'],
          subscribe_filter_asset_id: [cryptoPair],
          subscribe_filter_symbol_id: [DEFAULT_SPOT_MARKET_SYMBOL_ID],
          subscribe_update_limit_ms_quote: 1000,
        };
        socketInstance.send(JSON.stringify(options));
        console.info('Socket opened');
      };

      socketInstance.onmessage = (event) => {
        const data = JSON.parse(event.data.toString());

        if (data.type === 'error') {
          setError(data.message);
          console.error(data.message);
          setMarketData({
            price: '?',
            date: '?',
          });
          return;
        }
        setMarketData({
          price: formatPrice(data.price),
          date: formatDate(data.time_exchange, smUp),
        });
        setIsLoading(false);
      };

      socketInstance.onerror = () => {
        setError('Socket error');
        console.error('Socket error');
        setMarketData({
          price: null,
          date: null,
        });
        setIsLoading(false);
      };

      socketInstance.onclose = () => {
        console.warn('Socket closed');
        setMarketData({
          price: null,
          date: null,
        });
        setIsLoading(false);
      };

      socketRef.current = socketInstance;
    };

    openSocket();
    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [cryptoPair]);

  return { marketData, error, isLoading };
}
