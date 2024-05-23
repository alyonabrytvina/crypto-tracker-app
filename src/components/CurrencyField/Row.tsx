import React from 'react';
import { ListChildComponentProps } from 'react-window';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import { LIST_BOX_PADDING } from '../../constants';

export const Row = (props: ListChildComponentProps): JSX.Element => {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LIST_BOX_PADDING,
  };

  if ('group' in dataSet) {
    return (
      <ListSubheader
        key={dataSet.key}
        component="div"
        style={inlineStyle}
      >
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography
      component="li"
      {...dataSet[0]}
      key={dataSet.key}
      noWrap
      style={inlineStyle}
    >
      {dataSet[1]}
    </Typography>
  );
};
