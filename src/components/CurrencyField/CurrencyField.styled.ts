import { styled } from '@mui/material';
import Popper from '@mui/material/Popper';
import { autocompleteClasses } from '@mui/material/Autocomplete';

export const AutocompleteWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  width: '100%',
}));

export const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});
