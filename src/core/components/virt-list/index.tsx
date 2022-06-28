/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useMemo, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

import css from './index.module.css';

interface VirtListProps {
  data: any[];
  height: number;
  itemHeight: number;
  itemsBuffered?: number;
  renderItem: (item: any) => React.ReactNode;
}

/**
 * I often use libraries for virtualization like a "react-virtualized"
 * But it's my first time of implementation custom virtualization!
 * It was excited!)
 * Also there some ways to upgrade this component: height per item, placeholders for items.
 */
const VirtList: FC<VirtListProps> = ({ height, itemHeight, itemsBuffered = 3, data, renderItem }: VirtListProps) => {
  const scrollerElement = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState<number>(0);

  const itemsCount = data.length;

  const indexStart = Math.max(Math.floor(scrollTop / itemHeight) - itemsBuffered, 0);

  const indexEnd = Math.min(Math.ceil((scrollTop + height) / itemHeight - 1) + itemsBuffered, itemsCount - 1);

  const dataWithIndexes = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        topOffset: index * itemHeight,
      })),
    [itemHeight, data]
  );

  // For better performance using "throttle".
  const update = throttle(
    () => {
      scrollerElement?.current && setScrollTop(scrollerElement.current.scrollTop);
    },
    100,
    { leading: false }
  );

  return (
    <div onScroll={update} ref={scrollerElement} className={css.scroller} style={{ height: height }}>
      <ul className={css.list} style={{ height: itemsCount * itemHeight }}>
        {[...dataWithIndexes].slice(indexStart, indexEnd + 1).map((item) => (
          <li key={item.topOffset} className={css.item} style={{ top: item.topOffset, height: itemHeight }}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VirtList;
