'use client';

import {
  Cryptocurrencies,
  EnableTwoFactorAuthnetication,
  Feedback,
  Fiats,
  Login,
  PaymentMethods,
  PrivateKeys,
  Register,
  ResetPassword,
  ResetPasswordRequest,
  TwoFactorAuthentication,
  WalletModal,
} from '@/layouts/modals';

import { useNavigationBar } from '@/hooks';

const AllModals = () => {
  const { navigationBar } = useNavigationBar();

  return (
    <>
      {navigationBar.modals.login ? <Login /> : <></>}
      {navigationBar.modals.twoFactor ? <TwoFactorAuthentication /> : <></>}
      {navigationBar.modals.enableTwoFactor ? (
        <EnableTwoFactorAuthnetication />
      ) : (
        <></>
      )}
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
      {navigationBar.modals.feedback ? <Feedback /> : <></>}
    </>
  );
};

export default AllModals;
