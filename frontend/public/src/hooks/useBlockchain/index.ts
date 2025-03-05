'use client';

import {
  $blockchain,
  resetBlockchain,
  resetNavigationBar,
  setAccount,
  setBalance,
  setChain,
  setConnector,
  setProvider,
  setWallet,
  toggleModal,
} from '@/store';
import { useStore } from '@nanostores/react';
import { Connector, useConnect, useAccountEffect, useBalance } from 'wagmi';

import { useUser } from '@/hooks';
import { useEffect } from 'react';
import { getCookie } from '@/utils';
import { BRAVE_WALLET } from '@/constants';

const useBlockchain = () => {
  const blockchain = useStore($blockchain);
  const { connect, connectors } = useConnect();
  const balance = useBalance({ address: blockchain.account?.address });
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
    if (blockchain.connector?.name === BRAVE_WALLET) {
      resetWalletNavigation();
    }
    await blockchain.connector?.disconnect();
  };

  const isWalletConnected =
    isLoggedIn() &&
    blockchain.provider &&
    blockchain.account?.address &&
    blockchain.account?.address?.length > 0;

  useAccountEffect({
    async onConnect({ address, chain, connector, isReconnected }) {
      const provider = await connector.getProvider();

      setAccount({ address });
      setChain(chain);
      setConnector(connector);
      setWallet(connector.name);
      setProvider(provider);
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
      setBalance(balance.data);
    }
  }, [balance.isSuccess]);

  useEffect(() => {}, []);

  return {
    blockchain,
    connectors,
    isWalletConnected,
    connect,
    setProvider,
    onConnectWallet,
    onDisconnectWallet,
  };
};

export default useBlockchain;
