'use client';

import { Fiat } from '@/store/fiat/types';
import Flag from './Flag';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';
import { useFiats } from '@/hooks';
import { useRootStore } from '@/store';

const Fiats = () => {
  const { fiatsList, setFiat, filterFiats } = useFiats();
  const {
    navigationBar: { toggleModal },
  } = useRootStore();

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
        {fiatsList?.map((fiat, index) => (
          <li key={index}>
            <button onClick={() => selectFiat(fiat)}>
              <Flag country={fiat.country} flag={fiat.flag} />
              {toCapitalize(fiat.name)}
            </button>
          </li>
        ))}
      </ul>
    </ListTemplate>
  );
};

export default Fiats;
