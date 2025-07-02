'use client';

import { useBlockchain, useCreateOffer, useNavigationBar } from '@/hooks';

import { ListTemplate } from '@/layouts/modals';
import styles from './index.module.scss';

const Chains = () => {
  const { toggleModal } = useNavigationBar();

  const { addresses } = useBlockchain();
  const {
    setCreateOfferValue,
    createOffer: { vendorWalletAddress },
  } = useCreateOffer(false);

  const selectWallet = (address: string) => {
    setCreateOfferValue(
      { vendorWalletAddress: address },
      'createOffer/setVendorWalletAddress'
    );
    toggleModal('wallets');
  };

  return (
    <ListTemplate width="40rem" height="30vh" heading="Available Wallets">
      <ul className={styles.list}>
        {addresses?.map((address, index) => {
          const isSelected = vendorWalletAddress === address;
          const selectedStyle = isSelected ? styles.selected : '';
          return (
            <li key={index}>
              <button
                onClick={() => selectWallet(address)}
                className={selectedStyle}
              >
                {address}
              </button>
            </li>
          );
        })}
      </ul>
    </ListTemplate>
  );
};

export default Chains;
