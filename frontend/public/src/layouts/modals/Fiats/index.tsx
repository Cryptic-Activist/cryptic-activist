'use client';

import { useApp, useFiats, useNavigationBar } from '@/hooks';

import { Fiat } from '@/store/fiat/types';
import Flag from './Flag';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const Fiats = () => {
  const { fiatsList, setFiat, filterFiats } = useFiats();
  const { toggleModal } = useNavigationBar();
  const { app } = useApp();

  const selectFiat = (fiat: Fiat) => {
    setFiat(fiat);
    toggleModal('fiats');
  };

  return (
    <ListTemplate
      width="30rem"
      height="70vh"
      heading="Fiats"
      onFilter={filterFiats}
    >
      <ul className={styles.list}>
        {fiatsList?.map((fiat, index) => {
          const isSelected = app.defaults?.fiat?.id === fiat.id;
          const selectedStyle = isSelected ? styles.selected : '';
          return (
            <li key={index}>
              <button
                onClick={() => selectFiat(fiat)}
                className={selectedStyle}
              >
                <Flag country={fiat.country} flag={fiat.flag} />
                {toCapitalize(fiat.name)}
              </button>
            </li>
          );
        })}
      </ul>
    </ListTemplate>
  );
};

export default Fiats;
