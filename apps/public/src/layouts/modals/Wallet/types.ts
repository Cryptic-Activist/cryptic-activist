import { Connector } from 'wagmi';

export type ProviderProps = {
  connector: Connector;
  onConnectWallet: (connector: Connector) => Promise<void>;
};
