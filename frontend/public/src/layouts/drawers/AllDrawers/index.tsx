'use client';

import { UserDrawer, WalletDrawer } from '@/layouts/drawers';
import { useBlockchain, useNavigationBar } from '@/hooks';

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
      {navigationBar.drawers.user ? <UserDrawer /> : <></>}
    </>
  );
};

export default AllDrawers;
