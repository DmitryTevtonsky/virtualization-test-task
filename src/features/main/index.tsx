import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { ItemRendererProps } from 'core/components/v-list';
import { Launch } from 'types';
import { VList } from 'core/components';

import { LaunchInfo } from './components';
import css from './index.module.css';

import throttle from 'lodash.throttle';

interface MainProps {
  loading: boolean;
  error: boolean;
  data: Launch[];
}

const Main: FC<MainProps> = ({ data }: MainProps) => {
  const virtualizationHolderElement = useRef<HTMLDivElement>(null);

  const [viewportHeight, setViewportHeight] = useState<number>(0);

  const throttledSetViewportHeight = useCallback(
    throttle((height: number) => {
      setViewportHeight(height);
    }, 200),
    []
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const { contentRect } of entries) {
        throttledSetViewportHeight(contentRect.height || 0);
      }
    });

    virtualizationHolderElement.current && resizeObserver.observe(virtualizationHolderElement.current);

    return () => {
      resizeObserver && resizeObserver.disconnect();
    };
  }, [throttledSetViewportHeight]);

  const itemRenderer = ({ itemData }: ItemRendererProps) => {
    return <LaunchInfo launch={itemData} />;
  };

  /**
   * I'm decided to get height of v-list holder
   * to fill available area and not hard code it.
   * It's like AutoSizer component in "react-virtualized".
   */
  return (
    <div className={css.virtualizationHolder} ref={virtualizationHolderElement}>
      {!!viewportHeight && (
        <VList data={data} height={viewportHeight} itemsBuffered={5} itemHeight={200} itemRenderer={itemRenderer} />
      )}
    </div>
  );
};

export default Main;
