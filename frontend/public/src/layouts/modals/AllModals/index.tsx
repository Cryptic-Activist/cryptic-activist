'use client';

import { useNavigationBar } from '@/hooks';
import {
  Blockchain,
  Cryptocurrencies,
  Fiats,
  Login,
  PaymentMethods,
  PrivateKeys,
  Register,
  VerifyAccount,
} from '@/layouts/modals';

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
      {navigationBar.modals.blockchain ? <Blockchain /> : <></>}
    </>
  );
};

export default AllModals;
