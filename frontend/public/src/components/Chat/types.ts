import {
  Message,
  ReceiverStatus,
  SendMessageParams,
} from '@/hooks/useSocket/types';
import { Trader, Vendor } from '@/store/trade/types';

type SendMessage = (params: SendMessageParams) => void;

export type Props = {
  sender: Trader;
  receiver: Vendor;
};

export type ChatProps = {
  receiverStatus: ReceiverStatus;
  onSendMessage: SendMessage;
  messages: Message[];
} & Props;

export type HeaderProps = Props & {
  receiverStatus: ReceiverStatus;
};

export type ContentProps = Props & {
  messages: Message[];
};

export type InputsProps = Props & {
  sendMessage: SendMessage;
};
