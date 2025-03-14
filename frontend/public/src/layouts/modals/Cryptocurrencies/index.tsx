'use client';

import { toCapitalize, toUpperCase } from '@/utils';
import { useCryptocurrencies, useHorizontalScroll } from '@/hooks';

import { Cryptocurrency } from '@/store/cryptocurrency/types';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { useRef } from 'react';
import { useRootStore } from '@/store';

const Cryptocurrencies = () => {
  const ref = useRef<HTMLUListElement | null>(null);
  const _scroll = useHorizontalScroll(ref);
  const { cryptocurrenciesList, setCryptocurrency, filterCryptocurrencies } =
    useCryptocurrencies();
  const {
    navigationBar: { resetNavigationBar, toggleModal },
  } = useRootStore();

  const selectCryptocurrency = (cryptocurrency: Cryptocurrency) => {
    setCryptocurrency(cryptocurrency);
    toggleModal('cryptocurrencies');
  };

  return (
    <ListTemplate
      width="70vw"
      height="70vh"
      heading="Cryptocurrencies"
      onFilter={filterCryptocurrencies}
    >
      <ul className={styles.list} ref={ref}>
        {cryptocurrenciesList?.map((cryptocurrency, index) => (
          <li key={index}>
            <button
              onClick={() => selectCryptocurrency(cryptocurrency)}
            >{`${toUpperCase(cryptocurrency.symbol)} - ${toCapitalize(
              cryptocurrency.name
            )}`}</button>
          </li>
        ))}
      </ul>
    </ListTemplate>
  );
};

export default Cryptocurrencies;
