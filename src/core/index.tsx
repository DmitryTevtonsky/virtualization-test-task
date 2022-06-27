import { useData } from 'hooks';
import React, { FC } from 'react';

import Main from 'features/main';

import { Spinner } from './components';
import css from './index.module.css';

const Core: FC = () => {
  const { data, loading, error } = useData();

  if (loading) return <Spinner />;

  if (error) return <div>error</div>;

  return (
    <section className={css.layout}>
      <header className={css.header}>SpaceX launches virtualized list</header>
      <main className={css.main}>
        <Main loading={loading} error={error} data={data} />
      </main>
      <footer className={css.footer}>FOOTER</footer>
    </section>
  );
};

export default Core;
