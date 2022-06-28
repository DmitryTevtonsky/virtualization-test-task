import React, { FC, memo } from 'react';

import css from './index.module.css';

import { Launch } from 'types';

interface LaunchInfoProps {
  launch: Launch;
}

const LaunchInfo: FC<LaunchInfoProps> = ({ launch }) => {
  return (
    <>
      <img
        loading="lazy"
        alt={`Mission patch "${launch.name}"`}
        className={css.itemImage}
        src={launch.links?.patch?.small}
      />
      <div className={css.itemInfo}>
        <div className={css.itemHeader}>
          <h3 className={css.itemTitle}>{launch.name}</h3>
          <h3 className={css.itemExtra}>{new Date(launch.date_local).toLocaleDateString()}</h3>
        </div>
        <div className={css.itemDescription}>{launch.upcoming ? 'Upcoming' : launch.details}</div>
      </div>
    </>
  );
};

// Using memo to prevent rerender of already visible elements in list.
export default memo(LaunchInfo, (prevProps, nextProps) => prevProps.launch.id === nextProps.launch.id);
