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
import {
  getCurrentConnector,
  getSupportedChains,
  getSupportedTokens,
} from '@/services/blockchain';
import { useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

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
      tokens,
    },
    navigationBar: { resetNavigationBar, toggleModal },
    chains: chainsStore,
  } = useRootStore();

  const { connect, connectors } = useConnect();

  const {
    isConnected,
    address: wagmiAddress,
    connector: wagmiConnector,
    chain: wagmiChain,
    addresses,
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

  const handleSwitchChain = (switchChainId = DEFAULT_CHAIN_ID) => {
    const chainToSwitch = chains.find((c) => c.id === switchChainId);
    if (switchChain && chainToSwitch) {
      switchChain({ chainId: chainToSwitch.id });
    } else {
      console.warn('Chain not supported in wagmi chains array');
    }
  };

  const supportedChainsQuery = useQuery({
    queryKey: ['supportedChains'],
    queryFn: getSupportedChains,
  });

  const tokensMutation = useMutation({
    mutationKey: ['tokens'],
    mutationFn: async (chainId?: number) => {
      if (chainId) {
        const response = await getSupportedTokens(chainId);
        return response;
      }
    },
    onSuccess: (data) => {
      setBlockchainValue({ tokens: data }, 'blockchain/setTokens');
    },
  });

  const onConnectWallet = async (connector: Connector) => {
    try {
      const { chainId } = await connector.connect();

      // Prevent connecting to unsupported chains
      if (
        supportedChainsQuery.data &&
        !isSupportedChain(chainId, supportedChainsQuery.data)
      ) {
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
      if (id && supportedChainsQuery.data) {
        let chainLocal = chain;
        if (
          supportedChainsQuery.data &&
          !isSupportedChain(chain?.id, supportedChainsQuery.data)
        ) {
          localStorage.removeItem(WALLET_STORAGE_KEY);
          localStorage.removeItem(CHAIN_STORAGE_KEY);

          const connector = wagmiConnector ?? getCurrentConnector();
          if (!isConnected || !id || !connector) return;

          chainLocal = chains.find((c) => c.id === DEFAULT_CHAIN_ID) ?? chain;
        }

        const foundChain = chainsStore.data?.find(
          (c) => c.chainId === chainLocal?.id
        );

        console.log({ found2: foundChain });

        setBlockchainValue(
          {
            account: { address: onConnectAddress },
            chain: {
              id: foundChain?.chainId,
              name: foundChain?.name,
              logoUrl: foundChain?.logoUrl,
            },
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

        if (
          supportedChainsQuery.data &&
          !isSupportedChain(chainInfo.id, supportedChainsQuery.data)
        ) {
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
    supportedChainsQuery.data,
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

          console.log({ parsedChain });

          // Prevent connecting to unsupported chains
          if (
            supportedChainsQuery.data &&
            !isSupportedChain(parsedChain, supportedChainsQuery.data)
          ) {
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
  }, [setBlockchainValue, supportedChainsQuery.data]);

  useEffect(() => {
    const syncChainChange = () => {
      if (!wagmiChain || !isConnected || !id) return;

      if (
        supportedChainsQuery.data &&
        !isSupportedChain(wagmiChain.id, supportedChainsQuery.data)
      ) {
        handleSwitchChain();
        localStorage.removeItem(WALLET_STORAGE_KEY);
        localStorage.removeItem(CHAIN_STORAGE_KEY);
        toggleModal('blockchain');
        return;
      }

      const foundChain = chainsStore.data?.find(
        (c) => c.chainId === wagmiChain.id
      );

      console.log({ found1: foundChain });

      const chainInfo = {
        id: wagmiChain.id,
        name: getChainNameById(wagmiChain.id),
        logoUrl: foundChain?.logoUrl,
      };

      setBlockchainValue(
        { chain: chainInfo },
        'blockchain/chainChangeDetected'
      );

      localStorage.setItem(CHAIN_STORAGE_KEY, JSON.stringify(chainInfo));
    };

    syncChainChange();
  }, [wagmiChain?.id, supportedChainsQuery.data]);

  useEffect(() => {
    if (chain?.id) {
      tokensMutation.mutate(chain?.id);
    }
  }, [chain?.id]);

  return {
    blockchain: {
      account,
      chain,
      wallet,
      balance: balanceBlockchainStore,
    },
    addresses,
    connectors,
    isWalletConnected,
    supportedChainsQuery,
    tokensMutation,
    tokens,
    handleSwitchChain,
    connect,
    onConnectWallet,
    onDisconnectWallet,
    setValue: setBlockchainValue,
  };
};

export default useBlockchain;
