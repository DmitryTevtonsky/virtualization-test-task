import React, { FC, useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

import css from './index.module.css';

interface MainProps {
  loading: boolean;
  error: boolean;
  data: any[];
}

const Main: FC<MainProps> = ({ data }: MainProps) => {
  const virtualizationHolderElement = useRef<HTMLDivElement>(null);
  const scrollerElement = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(800);

  useEffect(() => {
    setViewportHeight(virtualizationHolderElement.current?.clientHeight || 0);
  }, []);

  const amountRows = data.length;
  const rowHeight = 200;
  const amountRowsBuffered = 10;

  const indexStart = Math.max(Math.floor(scrollTop / rowHeight) - amountRowsBuffered, 0);

  const indexEnd = Math.min(
    Math.ceil((scrollTop + viewportHeight) / rowHeight - 1) + amountRowsBuffered,
    amountRows - 1
  );

  const dataWithIndexes = data.map((item, index) => ({
    ...item,
    topOffset: index * rowHeight,
  }));

  const update = throttle(
    () => {
      scrollerElement?.current && setScrollTop(scrollerElement.current.scrollTop);
    },
    50,
    { leading: false }
  );

  return (
    <div className={css.virtualizationHolder} ref={virtualizationHolderElement}>
      {viewportHeight && (
        <div onScroll={update} ref={scrollerElement} className={css.scroller} style={{ height: viewportHeight }}>
          <ul className={css.list} style={{ height: amountRows * rowHeight }}>
            {[...dataWithIndexes].slice(indexStart, indexEnd + 1).map((item) => (
              <li key={item.id} className={css.item} style={{ top: item.topOffset, height: rowHeight }}>
                <img
                  loading="lazy"
                  alt={`Mission patch "${item.name}"`}
                  className={css.itemImage}
                  src={item.links?.patch?.small}
                />
                <div className={css.itemInfo}>
                  <div className={css.itemHeader}>
                    <h3 className={css.itemTitle}>{item.name}</h3>
                    <h3 className={css.itemExtra}>{new Date(item.date_local as string).toLocaleDateString()}</h3>
                  </div>
                  <div className={css.itemDescription}>{item.upcoming ? 'Upcoming' : item.details}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Main;
