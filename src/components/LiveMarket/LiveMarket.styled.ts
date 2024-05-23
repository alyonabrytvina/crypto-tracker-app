import { styled } from '@mui/material';

export const ParamWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(5, 0),
  minWidth: '160px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '124px',
  },
}));

export const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '120px',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  display: 'flex',
  gap: theme.spacing(0, 5),
  [theme.breakpoints.down('sm')]: {
    gap: 0,
  },
}));
