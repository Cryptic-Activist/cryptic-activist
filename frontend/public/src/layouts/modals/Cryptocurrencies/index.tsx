'use client';

import { useApp, useCryptocurrencies, useNavigationBar } from '@/hooks';

import { Cryptocurrency } from '@/store/cryptocurrency/types';
import Image from 'next/image';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const Cryptocurrencies = () => {
  const { cryptocurrenciesList, setCryptocurrency, filterCryptocurrencies } =
    useCryptocurrencies();
  const { toggleModal } = useNavigationBar();
  const { app } = useApp();

  const selectCryptocurrency = (cryptocurrency: Cryptocurrency) => {
    setCryptocurrency(cryptocurrency);
    toggleModal('cryptocurrencies');
  };

  return (
    <ListTemplate
      width="30rem"
      height="70vh"
      heading="Cryptocurrencies"
      onFilter={filterCryptocurrencies}
    >
      <ul className={styles.list}>
        {cryptocurrenciesList?.map((cryptocurrency, index) => {
          const isSelected =
            app.defaults?.cryptocurrency?.id === cryptocurrency.id;
          const selectedStyle = isSelected ? styles.selected : '';
          return (
            <li key={index}>
              <button
                onClick={() => selectCryptocurrency(cryptocurrency)}
                className={selectedStyle}
              >
                {cryptocurrency.image && (
                  <Image
                    src={cryptocurrency.image ?? null}
                    alt={`${cryptocurrency.name} icon`}
                    width={40}
                    height={40}
                  />
                )}
                {toCapitalize(cryptocurrency.name)}
              </button>
            </li>
          );
        })}
      </ul>
    </ListTemplate>
  );
};

export default Cryptocurrencies;
