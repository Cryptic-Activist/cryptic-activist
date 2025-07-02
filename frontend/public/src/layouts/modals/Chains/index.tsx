'use client';

import { useApp, useCryptocurrencies, useNavigationBar } from '@/hooks';

import { Chain } from '@/store/chain/types';
import Image from 'next/image';
import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const Chains = () => {
  const { chainsList, setChain, filterChains } = useCryptocurrencies();
  const { toggleModal } = useNavigationBar();
  const { app } = useApp();

  const selectChain = (chain: Chain) => {
    setChain(chain);
    toggleModal('chains');
  };

  console.log({ chainsList });

  return (
    <ListTemplate
      width="30rem"
      height="70vh"
      heading="Chains"
      onFilter={filterChains}
    >
      <ul className={styles.list}>
        {chainsList?.map((chain, index) => {
          const isSelected = app.defaults?.chain?.id === chain.id;
          const selectedStyle = isSelected ? styles.selected : '';
          return (
            <li key={index}>
              <button
                onClick={() => selectChain(chain)}
                className={selectedStyle}
              >
                {chain.logoUrl && (
                  <Image
                    src={chain.logoUrl ?? null}
                    alt={`${chain.name} icon`}
                    width={40}
                    height={40}
                  />
                )}
                {toCapitalize(chain.name)}
              </button>
            </li>
          );
        })}
      </ul>
    </ListTemplate>
  );
};

export default Chains;
