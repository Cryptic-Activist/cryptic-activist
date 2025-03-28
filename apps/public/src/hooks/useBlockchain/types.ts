import { Wallet } from '@/store/blockchain/types';

export type WalletName = Wallet;

export type WalletsList = {
  label: Wallet;
  icon: string;
  onConnect: () => void;
  // onClick: (wallet: WalletName) => void;
}[];
