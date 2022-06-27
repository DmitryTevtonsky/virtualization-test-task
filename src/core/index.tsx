import { useData } from 'hooks';
import React, { FC } from 'react';

import css from './index.module.css';

const Core: FC = () => {
  const { data, loading, error } = useData();

  console.log({ data, loading, error });

  return (
    <section className={css.layout}>
      <header>HEADER</header>
      <main>MAIN</main>
      <footer>FOOTER</footer>
    </section>
  );
};

export default Core;
