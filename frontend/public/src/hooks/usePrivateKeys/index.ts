import React from 'react';

import { useRegister } from '@/hooks';
import { resetNavigationBar, toggleModal } from '@/store';
import { copyToClipboard } from '@/utils';

const usePrivateKeys = () => {
  const { register } = useRegister();

  const handleCopyPrivateKeysToClipboard = () => {
    if (register.privateKeys) {
      const pksString = register.privateKeys.join(', ');
      copyToClipboard(pksString);
    }
  };

  const onAccountVerification = () => {
    resetNavigationBar();
    toggleModal('verifyAccount');
  };

  return { handleCopyPrivateKeysToClipboard, onAccountVerification };
};

export default usePrivateKeys;
