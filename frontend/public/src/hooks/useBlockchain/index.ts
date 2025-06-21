'use client';

import {
  BRAVE_WALLET,
  CHAIN_STORAGE_KEY,
  DEFAULT_CHAIN_ID,
  WALLET_STORAGE_KEY,
} from '@/constants';
import {
  Connector,
  useAccount,
  useAccountEffect,
  useBalance,
  useConnect,
  useSwitchChain,
} from 'wagmi';
import {
  getChainNameById,
  getWalletType,
  isSupportedChain,
} from '@/utils/blockchain';
import { useEffect, useMemo } from 'react';

import { getCurrentConnector } from '@/services/blockchain';
import { useRootStore } from '@/store';
import { useUser } from '@/hooks';

const useBlockchain = () => {
  const {
    blockchain: {
      setBlockchainValue,
      resetBlockchain,
      account,
      chain,
      balance: balanceBlockchainStore,
      wallet,
    },
    navigationBar: { resetNavigationBar, toggleModal },
  } = useRootStore();

  const { connect, connectors } = useConnect();

  const {
    isConnected,
    address: wagmiAddress,
    connector: wagmiConnector,
  } = useAccount();
  const balance = useBalance({ address: wagmiAddress as `0x${string}` });
  const { chains, switchChain } = useSwitchChain();

  const {
    isLoggedIn,
    user: { id },
  } = useUser();

  const isWalletConnected = useMemo(() => {
    return isLoggedIn() && !!account?.address && !!wallet;
  }, [isLoggedIn, account?.address, wallet]);

  const resetWalletNavigation = () => {
    resetNavigationBar();
    resetBlockchain();
  };

  const handleSwitchChain = () => {
    if (switchChain) {
      switchChain({
        chainId: DEFAULT_CHAIN_ID,
      });
    }
  };

  const onConnectWallet = async (connector: Connector) => {
    try {
      const { chainId } = await connector.connect();

      // Prevent connecting to unsupported chains
      if (!isSupportedChain(chainId)) {
        localStorage.removeItem(WALLET_STORAGE_KEY);
        localStorage.removeItem(CHAIN_STORAGE_KEY);

        connect({ connector, chainId: DEFAULT_CHAIN_ID });
        toggleModal('blockchain');
        return;
      }

      connect({ connector });
      toggleModal('blockchain');
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  const onDisconnectWallet = async () => {
    const connector = getCurrentConnector();
    if (connector?.name === BRAVE_WALLET) {
      resetWalletNavigation();
    }
    await connector?.disconnect();
  };

  useAccountEffect({
    async onConnect({ connector, address: onConnectAddress, chain }) {
      if (id) {
        let chainLocal = chain;
        if (!isSupportedChain(chain?.id)) {
          localStorage.removeItem(WALLET_STORAGE_KEY);
          localStorage.removeItem(CHAIN_STORAGE_KEY);

          const connector = wagmiConnector ?? getCurrentConnector();
          if (!isConnected || !id || !connector) return;

          chainLocal = chains.find((c) => c.id === DEFAULT_CHAIN_ID) ?? chain;
        }
        setBlockchainValue(
          {
            account: { address: onConnectAddress },
            chain: chainLocal,
            wallet: connector.name,
            balance: balance.data,
          },
          'blockchain/setWalletDetails'
        );
      }
    },
    onDisconnect() {
      resetWalletNavigation();
    },
  });

  useEffect(() => {
    const maybeHydrateFromWagmi = async () => {
      const connector = wagmiConnector ?? getCurrentConnector();
      if (!isConnected || !id || !connector) return;

      let chainData = chain;

      // Try to get missing chainId if needed
      if (!chainData?.id && connector?.getChainId) {
        try {
          const chainId = await connector.getChainId?.();
          chainData = { id: chainId, name: getChainNameById(chainId) };
        } catch (err) {
          console.warn('Failed to get chain ID from connector:', err);
        }
      }

      const address = wagmiAddress as string;
      const hydrated = account?.address && wallet && chain?.id;

      const shouldUpdate =
        !hydrated || // initial hydration
        account?.address !== address ||
        wallet !== connector.name ||
        chain?.id !== chainData?.id;

      if (shouldUpdate) {
        const walletType = getWalletType(connector);

        const walletInfo = {
          name: connector.name,
          type: walletType,
        };

        const chainInfo = {
          id: chainData?.id,
          name: chainData?.name,
        };

        if (!isSupportedChain(chainInfo.id)) {
          handleSwitchChain();
          localStorage.removeItem(WALLET_STORAGE_KEY);
          localStorage.removeItem(CHAIN_STORAGE_KEY);

          connect({ connector, chainId: DEFAULT_CHAIN_ID });
          toggleModal('blockchain');
          return;
        }

        localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletInfo));
        localStorage.setItem(CHAIN_STORAGE_KEY, JSON.stringify(chainInfo));

        setBlockchainValue(
          {
            account: { address },
            chain: chainInfo,
            wallet: connector.name,
            balance: balance.data,
          },
          'blockchain/updateOnWalletOrChainChange'
        );
      }
    };

    maybeHydrateFromWagmi();
  }, [
    isConnected,
    id,
    account?.address,
    chain?.id,
    chain?.name,
    wallet,
    wagmiAddress,
    wagmiConnector,
    balance.data,
    setBlockchainValue,
  ]);

  useEffect(() => {
    if (id && balance.isSuccess) {
      setBlockchainValue({ balance: balance.data }, 'blockchain/setBalance');
    }
  }, [balance.isSuccess, balance.data, id, setBlockchainValue]);

  useEffect(() => {
    const restoreFromStorage = () => {
      if (isConnected) return;

      const storedWallet = localStorage.getItem(WALLET_STORAGE_KEY);
      const storedChain = localStorage.getItem(CHAIN_STORAGE_KEY);

      if (storedWallet && storedChain) {
        try {
          const parsedWallet = JSON.parse(storedWallet);
          const parsedChain = JSON.parse(storedChain);

          // Prevent connecting to unsupported chains
          if (!isSupportedChain(parsedChain)) {
            localStorage.removeItem(WALLET_STORAGE_KEY);
            localStorage.removeItem(CHAIN_STORAGE_KEY);

            const connector = wagmiConnector ?? getCurrentConnector();
            if (!isConnected || !id || !connector) return;

            connect({ connector, chainId: DEFAULT_CHAIN_ID });
            toggleModal('blockchain');
            return;
          }

          setBlockchainValue(
            {
              wallet: parsedWallet.name,
              chain: parsedChain,
            },
            'blockchain/restoreFromStorage'
          );
        } catch (err) {
          console.warn(
            'Failed to restore blockchain data from localStorage:',
            err
          );
        }
      }
    };

    restoreFromStorage();
  }, [setBlockchainValue]);

  return {
    blockchain: {
      account,
      chain,
      wallet,
      balance: balanceBlockchainStore,
    },
    connectors,
    isWalletConnected,
    handleSwitchChain,
    connect,
    onConnectWallet,
    onDisconnectWallet,
    setValue: setBlockchainValue,
  };
};

export default useBlockchain;
