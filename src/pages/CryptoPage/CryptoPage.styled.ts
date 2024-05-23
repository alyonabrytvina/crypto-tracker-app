import { styled } from '@mui/material';

export const MainWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '0.5fr 2.5fr',
  padding: theme.spacing(5, 15, 10),
  flexDirection: 'column',
  height: '100vh',
  alightItems: 'center',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1, 5),
  },
}));

export const CurrencyFieldWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  gap: theme.spacing(2),
  height: '64px',

  [theme.breakpoints.down('sm')]: {
    height: '52px',
  },
}));

export const BockWrapper = styled('div')({
  margin: '0 auto',
  textAlign: 'center',
});
