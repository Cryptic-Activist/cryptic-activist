'use client';

import { useBlockchain, useNavigationBar } from '@/hooks';

import { WalletDrawer } from '@/layouts/drawers';

const AllDrawers = () => {
  const { navigationBar } = useNavigationBar();
  const { blockchain } = useBlockchain();

  return (
    <>
      {navigationBar.drawers.wallet && blockchain.account?.address ? (
        <WalletDrawer />
      ) : (
        <></>
      )}
    </>
  );
};

export default AllDrawers;
