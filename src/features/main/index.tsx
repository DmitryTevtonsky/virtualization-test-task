import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Launch } from 'types';
import VirtList from 'core/components/virt-list';

import { LaunchInfo } from './components';
import css from './index.module.css';

interface MainProps {
  loading: boolean;
  error: boolean;
  data: Launch[];
}

const Main: FC<MainProps> = ({ data }: MainProps) => {
  const virtualizationHolderElement = useRef<HTMLDivElement>(null);

  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    setViewportHeight(virtualizationHolderElement.current?.clientHeight || 0);
  }, []);

  const renderItemContent = useCallback((item: Launch) => {
    return <LaunchInfo launch={item} />;
  }, []);

  /**
   * I'm decided to get height of v-list holder
   * to fill available area and not hard code it.
   * It's like AutoSizer component in "react-virtualized".
   */
  return (
    <div className={css.virtualizationHolder} ref={virtualizationHolderElement}>
      {viewportHeight && (
        <VirtList
          data={data}
          height={viewportHeight}
          itemsBuffered={5}
          itemHeight={200}
          renderItem={renderItemContent}
        />
      )}
    </div>
  );
};

export default Main;
