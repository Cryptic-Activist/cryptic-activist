import { Wallet } from '@/zustand/blockchain/types';

export type WalletName = Wallet;

export type WalletsList = {
  label: Wallet;
  icon: string;
  onConnect: () => void;
  // onClick: (wallet: WalletName) => void;
}[];
