'use client';

import { toCapitalize, toUpperCase } from '@/utils';

import { Cryptocurrency } from '@/store/cryptocurrency/types';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { useCryptocurrencies } from '@/hooks';
import { useRootStore } from '@/store';

const Cryptocurrencies = () => {
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
      width="40vw"
      height="70vh"
      heading="Cryptocurrencies"
      onFilter={filterCryptocurrencies}
    >
      <ul className={styles.list}>
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
