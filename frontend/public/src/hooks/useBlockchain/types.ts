import { Wallet } from '@/store/blockchain/types';

export type WalletName = Wallet;

export type WalletsList = {
  label: Wallet;
  icon: string;
  onConnect: () => void;
  // onClick: (wallet: WalletName) => void;
}[];

export type TokenBalance = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  formattedBalance: string;
  logoUrl?: string;
};
