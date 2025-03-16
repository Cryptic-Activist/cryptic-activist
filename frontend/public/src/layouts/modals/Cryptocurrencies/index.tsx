'use client';

import { toCapitalize, toUpperCase } from '@/utils';

import { Cryptocurrency } from '@/store/cryptocurrency/types';
import Image from 'next/image';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { useCryptocurrencies } from '@/hooks';
import { useRootStore } from '@/store';

const Cryptocurrencies = () => {
  const { cryptocurrenciesList, setCryptocurrency, filterCryptocurrencies } =
    useCryptocurrencies();
  const {
    navigationBar: { toggleModal },
  } = useRootStore();

  const selectCryptocurrency = (cryptocurrency: Cryptocurrency) => {
    setCryptocurrency(cryptocurrency);
    toggleModal('cryptocurrencies');
  };

  return (
    <ListTemplate
      width="35vw"
      height="70vh"
      heading="Cryptocurrencies"
      onFilter={filterCryptocurrencies}
    >
      <ul className={styles.list}>
        {cryptocurrenciesList?.map((cryptocurrency, index) => (
          <li key={index}>
            <button onClick={() => selectCryptocurrency(cryptocurrency)}>
              <Image
                src={cryptocurrency.image}
                alt={`${cryptocurrency.name} icon`}
                width={40}
                height={40}
              />
              {toCapitalize(cryptocurrency.name)}
            </button>
          </li>
        ))}
      </ul>
    </ListTemplate>
  );
};

export default Cryptocurrencies;
