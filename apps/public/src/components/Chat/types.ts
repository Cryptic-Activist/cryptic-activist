import { TradeSetter, Trader, Vendor } from '@/store/trade/types';

import { Message } from '@/hooks/useSocket/types';

export type Props = {
  sender: Trader;
  receiver: Vendor;
};

export type ChatProps = Props & {
  trade: TradeSetter;
};

export type HeaderProps = Props;

export type ContentProps = Props & {
  messages: Message[];
};

export type InputsProps = Props & {
  sendMessage: (content: string) => void;
};
