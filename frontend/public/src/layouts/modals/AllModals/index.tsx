'use client';

import {
  Chains,
  Cryptocurrencies,
  DisputeRequest,
  EnableTwoFactorAuthnetication,
  Feedback,
  Fiats,
  Login,
  PaymentMethods,
  PrivateKeys,
  Register,
  ResetPassword,
  ResetPasswordRequest,
  StartTradeConfirmation,
  TwoFactorAuthentication,
  WalletModal,
  Wallets,
} from '@/layouts/modals';

import { useNavigationBar } from '@/hooks';

const AllModals = () => {
  const { navigationBar } = useNavigationBar();

  return (
    <>
      {navigationBar.modals.login ? <Login /> : null}
      {navigationBar.modals.twoFactor ? <TwoFactorAuthentication /> : null}
      {navigationBar.modals.enableTwoFactor ? (
        <EnableTwoFactorAuthnetication />
      ) : null}
      {navigationBar.modals.register ? <Register /> : null}
      {/* {navigationBar.modals.verifyAccount ? <VerifyAccount /> : null} */}
      {navigationBar.modals.resetPasswordRequest ? (
        <ResetPasswordRequest />
      ) : null}
      {navigationBar.modals.resetPassword ? <ResetPassword /> : null}
      {navigationBar.modals.fiats ? <Fiats /> : null}
      {navigationBar.modals.cryptocurrencies ? <Cryptocurrencies /> : null}
      {navigationBar.modals.chains ? <Chains /> : null}
      {navigationBar.modals.wallets ? <Wallets /> : null}
      {navigationBar.modals.paymentMethods ? <PaymentMethods /> : null}
      {navigationBar.modals.privateKeys ? <PrivateKeys /> : null}
      {navigationBar.modals.blockchain ? <WalletModal /> : null}
      {navigationBar.modals.feedback ? <Feedback /> : null}
      {navigationBar.modals.disputeRequest ? <DisputeRequest /> : null}
      {navigationBar.modals.startTradeConfirmation ? (
        <StartTradeConfirmation />
      ) : null}
    </>
  );
};

export default AllModals;
