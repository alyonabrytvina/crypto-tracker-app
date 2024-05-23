import React, { forwardRef, useContext } from 'react';
import { VariableSizeList } from 'react-window';
import {
  LIST_BOX_PADDING,
  LIST_ITEM_IN_VIEW,
  LIST_ITEM_SIZE,
} from '../../constants';
import { OuterElementContext } from './context';
import { Row } from './Row';
import { useResetCache } from '../../hooks/useResetCache';

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
export const ListBox = forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLElement>
>((props, ref) => {
  const { children, ...other } = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    },
  );

  const getChildSize = () => LIST_ITEM_SIZE;

  const getHeight = () => {
    if (itemData.length > LIST_ITEM_IN_VIEW) {
      return LIST_ITEM_IN_VIEW * LIST_ITEM_SIZE;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemData.length);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LIST_BOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={getChildSize}
          overscanCount={5}
          itemCount={itemData.length}
        >
          {Row}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
