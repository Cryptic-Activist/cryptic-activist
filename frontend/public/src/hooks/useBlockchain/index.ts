'use client';

import {
  Connector,
  useAccount,
  useAccountEffect,
  useBalance,
  useConnect,
  useSwitchAccount,
} from 'wagmi';

import { BRAVE_WALLET } from '@/constants';
import { getCurrentConnector } from '@/services/blockchain';
import { useEffect } from 'react';
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
  const { isConnected, address } = useAccount();
  const balance = useBalance({ address: address as `0x${string}` });
  const {} = useSwitchAccount();
  const {
    isLoggedIn,
    user: { id },
  } = useUser();
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
    const connector = getCurrentConnector();
    if (connector?.name === BRAVE_WALLET) {
      resetWalletNavigation();
    }
    await connector?.disconnect();
  };

  useAccountEffect({
    async onConnect({ connector, address: onConnectAddress, chain }) {
      // const address = await connector.getAccounts();
      // const chain = await connector.getChainId();

      if (id) {
        setBlockchainValue(
          {
            account: { address: onConnectAddress },
            chain,
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
    if (id && balance.isSuccess) {
      setBlockchainValue({ balance: balance.data }, 'blockchain/setBalance');
    }
  }, [balance.isSuccess, id]);

  // useEffect(() => {
  //   if (id && address) {
  //     setBlockchainValue(
  //       {
  //         account: { address: address },
  //         chain,
  //         wallet: connectorsSwitch[0].name,
  //         balance: balance.data,
  //       },
  //       'blockchain/setWalletDetails'
  //     );
  //   }
  // }, [address]);

  // console.log({ status, address });

  return {
    blockchain: {
      account,
      chain,
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
