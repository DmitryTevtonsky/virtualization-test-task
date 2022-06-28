import { useData } from 'hooks';
import React, { FC } from 'react';

import { Main } from 'features';

import { Spinner } from './components';
import css from './index.module.css';

const Core: FC = () => {
  const { data, loading, error } = useData();

  if (loading) return <Spinner />;

  if (error) return <div>Error while fetching data...</div>;

  /**
   * Some filtration elements might be in footer.
   * Also there is header.
   */
  return (
    <section className={css.layout}>
      <header className={css.header}>
        <h1>SpaceX launches virtualized list</h1>
      </header>
      <main className={css.main}>
        <Main loading={loading} error={error} data={data} />
      </main>
      <footer className={css.footer}>Controls</footer>
    </section>
  );
};

export default Core;
