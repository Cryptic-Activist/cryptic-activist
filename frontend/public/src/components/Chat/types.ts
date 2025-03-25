import { Trader, Vendor } from '@/store/trade/types';

export type ChatProps = {
  sender: Trader;
  receiver: Vendor;
};

export type HeaderProps = ChatProps;

export type ContentProps = ChatProps;

export type InputsProps = ChatProps;
