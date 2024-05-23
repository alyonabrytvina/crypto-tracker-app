import { ButtonGroup, styled } from '@mui/material';

export const ButtonsWrapper = styled(ButtonGroup)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  display: 'flex',
  justifyContent: 'center',
}));

export const Wrapper = styled('div')(({ theme }) => ({
  width: '70%',
  margin: '0 auto',
  [theme.breakpoints.down('lg')]: {
    width: '80%',
  },
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));
