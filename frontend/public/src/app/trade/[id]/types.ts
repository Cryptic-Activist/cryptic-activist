import { Modal } from '@/store/navigationBar/types';

export type ActionButtonsProps = {
  user?: any;
  trade: any;
  onSetAsPaid: any;
  setAsCanceled: any;
  setAsDisputed: any;
  replace: any;
  toggleModal: (modal: Modal) => void;
  fundTrade: () => Promise<void>;
};

export type TradeProps = {
  user?: any;
  trade: any;
  setAsPaid: any;
  setAsCanceled: any;
  setAsDisputed: any;
  replace: any;
  tradeRemaingTime: number | null;
  ref: any;
  toggleModal: (modal: Modal) => void;
  fundTrade: () => Promise<void>;
};
