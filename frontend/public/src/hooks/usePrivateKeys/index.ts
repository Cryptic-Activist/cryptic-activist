import { copyToClipboard } from '@/utils';
import { useRegister } from '@/hooks';
import { useRootStore } from '@/zustand';

const usePrivateKeys = () => {
  const { register } = useRegister();
  const {
    navigationBar: { resetNavigationBar, toggleModal },
  } = useRootStore();

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
