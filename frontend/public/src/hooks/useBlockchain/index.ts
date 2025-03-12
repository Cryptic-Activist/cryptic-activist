'use client';

import { Connector, useAccountEffect, useBalance, useConnect } from 'wagmi';
import { resetNavigationBar, toggleModal } from '@/store';
import { useBlockchainStore, useRootStore } from '@/zustand';

import { BRAVE_WALLET } from '@/constants';
import { Balance } from '@/zustand/blockchain/types';
import { useEffect } from 'react';
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
  } = useRootStore();
  const { connect, connectors } = useConnect();
  const balance = useBalance({ address: account?.address as `0x${string}` });
  const { isLoggedIn } = useUser();

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

  const isWalletConnected =
    isLoggedIn() &&
    provider &&
    account?.address &&
    account?.address?.length > 0;

  useAccountEffect({
    async onConnect({ address, chain, connector, isReconnected }) {
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
        'blockchain/setBlockchainValue'
      );
    },
    onDisconnect() {
      resetWalletNavigation();
    },
  });

  const onReconnectWallet = () => {
    // const walletCookie = getCookie();
  };

  useEffect(() => {
    if (balance.isSuccess) {
      setBlockchainValue({ balance: balance.data });
    }
  }, [balance.isSuccess]);

  useEffect(() => {}, []);

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
