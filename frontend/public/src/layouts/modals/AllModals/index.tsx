'use client';

import {
  Cryptocurrencies,
  Fiats,
  Login,
  PaymentMethods,
  PrivateKeys,
  Register,
  VerifyAccount,
  Wallet,
} from '@/layouts/modals';

import { useNavigationBar } from '@/hooks';

const AllModals = () => {
  const { navigationBar } = useNavigationBar();

  return (
    <>
      {navigationBar.modals.login ? <Login /> : <></>}
      {navigationBar.modals.register ? <Register /> : <></>}
      {navigationBar.modals.verifyAccount ? <VerifyAccount /> : <></>}
      {navigationBar.modals.fiats ? <Fiats /> : <></>}
      {navigationBar.modals.cryptocurrencies ? <Cryptocurrencies /> : <></>}
      {navigationBar.modals.paymentMethods ? <PaymentMethods /> : <></>}
      {navigationBar.modals.privateKeys ? <PrivateKeys /> : <></>}
      {navigationBar.modals.blockchain ? <Wallet /> : <></>}
    </>
  );
};

export default AllModals;
