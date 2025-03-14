'use client';

import {
  Connector,
  useAccount,
  useAccountEffect,
  useBalance,
  useConnect,
} from 'wagmi';

import { BRAVE_WALLET } from '@/constants';
import { useEffect } from 'react';
import { useRootStore } from '@/store';
import { useUser } from '@/hooks';

const useBlockchain = () => {
  const {
    blockchain: {
      setBlockchainValue,
      resetBlockchain,
      account,
      connector,
      provider,
      chain,
      balance: balanceBlockchainStore,
      wallet,
    },
    navigationBar: { resetNavigationBar, toggleModal },
  } = useRootStore();
  const { connect, connectors } = useConnect();
  const balance = useBalance({ address: account?.address as `0x${string}` });
  const { isConnected } = useAccount();
  const { isLoggedIn } = useUser();
  const isWalletConnected = isLoggedIn() && isConnected;

  const resetWalletNavigation = () => {
    resetNavigationBar();
    resetBlockchain();
  };

  const onConnectWallet = async (connector: Connector) => {
    connect({ connector });
    toggleModal('blockchain');
  };

  const onDisconnectWallet = async () => {
    if (connector?.name === BRAVE_WALLET) {
      resetWalletNavigation();
    }
    await connector?.disconnect();
  };

  useAccountEffect({
    async onConnect({ address, chain, connector }) {
      const provider = await connector.getProvider();

      setBlockchainValue(
        {
          account: { address: address },
          chain,
          connector,
          wallet: connector.name,
          provider,
          balance: balance.data,
        },
        'blockchain/setWalletDetails'
      );
    },
    onDisconnect() {
      resetWalletNavigation();
    },
  });

  useEffect(() => {
    if (balance.isSuccess) {
      setBlockchainValue({ balance: balance.data }, 'blockchain/setBalance');
    }
  }, [balance.isSuccess]);

  return {
    blockchain: {
      account,
      chain,
      connector,
      provider,
      wallet,
      balance: balanceBlockchainStore,
    },
    connectors,
    isWalletConnected,
    connect,
    onConnectWallet,
    onDisconnectWallet,
    setValue: setBlockchainValue,
  };
};

export default useBlockchain;
