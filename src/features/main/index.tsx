import { Spinner } from 'core/components';
import React, { FC } from 'react';

import css from './index.module.css';

interface MainProps {
  loading: boolean;
  error: boolean;
  data: any[];
}

const Main: FC<MainProps> = ({ loading, error, data }: MainProps) => {
  console.log({ data, loading, error });

  if (loading) return <Spinner />;

  if (error) return <div>error</div>;

  return (
    <ul className={css.list}>
      {data.map((item) => (
        <li key={item.id} className={css.item}>
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
  );
};

export default Main;
