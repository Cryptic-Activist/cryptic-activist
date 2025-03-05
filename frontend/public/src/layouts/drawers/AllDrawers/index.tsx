'use client';

import { useBlockchain, useNavigationBar } from '@/hooks';
import { Wallet } from '@/layouts/drawers';

const AllDrawers = () => {
  const { navigationBar } = useNavigationBar();
  const { blockchain } = useBlockchain();

  return (
    <>
      {navigationBar.drawers.wallet && blockchain.account?.address ? (
        <Wallet />
      ) : (
        <></>
      )}
    </>
  );
};

export default AllDrawers;
