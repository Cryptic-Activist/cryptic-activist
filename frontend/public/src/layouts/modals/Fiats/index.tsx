'use client';

import { toCapitalize, toUpperCase } from '@/utils';
import { useFiats, useHorizontalScroll } from '@/hooks';

import { Fiat } from '@/store/fiat/types';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { useRef } from 'react';
import { useRootStore } from '@/zustand';

const Fiats = () => {
  const ref = useRef<HTMLUListElement | null>(null);
  const _scroll = useHorizontalScroll(ref);
  const { fiatsList, setFiat, filterFiats } = useFiats();
  const {
    navigationBar: { resetNavigationBar, toggleModal },
  } = useRootStore();

  const selectFiat = (fiat: Fiat) => {
    setFiat(fiat);
    toggleModal('fiats');
  };

  return (
    <ListTemplate
      width="70vw"
      height="70vh"
      heading="Fiats"
      onFilter={filterFiats}
    >
      <ul className={styles.list} ref={ref}>
        {fiatsList?.map((fiat, index) => (
          <li key={index}>
            <button onClick={() => selectFiat(fiat)}>{`${toUpperCase(
              fiat.symbol
            )} - ${toCapitalize(fiat.name)}`}</button>
          </li>
        ))}
      </ul>
    </ListTemplate>
  );
};

export default Fiats;
