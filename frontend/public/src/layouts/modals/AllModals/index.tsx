'use client';

import {
  Cryptocurrencies,
  Fiats,
  Login,
  PaymentMethods,
  PrivateKeys,
  Register,
  ResetPassword,
  ResetPasswordRequest,
  WalletModal,
} from '@/layouts/modals';

import { useNavigationBar } from '@/hooks';

const AllModals = () => {
  const { navigationBar } = useNavigationBar();

  return (
    <>
      {navigationBar.modals.login ? <Login /> : <></>}
      {navigationBar.modals.register ? <Register /> : <></>}
      {/* {navigationBar.modals.verifyAccount ? <VerifyAccount /> : <></>} */}
      {navigationBar.modals.resetPasswordRequest ? (
        <ResetPasswordRequest />
      ) : (
        <></>
      )}
      {navigationBar.modals.resetPassword ? <ResetPassword /> : <></>}
      {navigationBar.modals.fiats ? <Fiats /> : <></>}
      {navigationBar.modals.cryptocurrencies ? <Cryptocurrencies /> : <></>}
      {navigationBar.modals.paymentMethods ? <PaymentMethods /> : <></>}
      {navigationBar.modals.privateKeys ? <PrivateKeys /> : <></>}
      {navigationBar.modals.blockchain ? <WalletModal /> : <></>}
    </>
  );
};

export default AllModals;
