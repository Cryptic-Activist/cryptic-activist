'use client';

import useApp from '../useApp';
import { useEffect } from 'react';
import useNavigationBar from '../useNavigationBar';
import useResetPassword from '../useResetPassword';
import useURL from '../useURL';

const useParams = () => {
  const { getSearchParams, clearSearchParams, searchParams } = useURL();
  const { toggleModal } = useNavigationBar();
  const { addToast } = useApp();
  const { resetPassword } = useResetPassword();

  const handleAccountVerifedParam = () => {
    const isPasswordResetVerifiedParam = getSearchParams('account-verified');
    const isAccountVerified = Number(isPasswordResetVerifiedParam);
    if (isAccountVerified === 1) {
      addToast(
        'success',
        'Account verified successfully, you can login now',
        5000
      );
      clearSearchParams();
    } else if (isAccountVerified === 0) {
      addToast('error', 'Account verification failed', 5000);
      clearSearchParams();
    }
  };

  const handlePasswordResetVerifiedParam = () => {
    const isPasswordResetVerifiedParam = getSearchParams('reset-password');
    const token = getSearchParams('token') as string;

    const isPasswordResetVerified = Number(isPasswordResetVerifiedParam);
    if (isPasswordResetVerified === 1 && token) {
      resetPassword.setResetPassword({ token });
      toggleModal('resetPassword');
      clearSearchParams();
    } else if (isPasswordResetVerified === 0) {
      addToast('error', 'Password reset request is invalid', 5000);
      clearSearchParams();
    }
  };

  const handleLoginParam = () => {
    const openLoginModal = getSearchParams('login');

    const canOpenLoginModal = Number(openLoginModal);
    if (canOpenLoginModal === 1) {
      toggleModal('login');
      clearSearchParams();
    } else if (canOpenLoginModal === 0) {
      clearSearchParams();
    }
  };

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      handleAccountVerifedParam();
      handlePasswordResetVerifiedParam();
      handleLoginParam();
    }
  }, [searchParams]);

  return {};
};

export default useParams;
