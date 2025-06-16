import { Modal } from '@/store/navigationBar/types';

export type ActionButtonsProps = {
  trade: any;
  onSetAsPaid: any;
  setAsCanceled: any;
  setAsDisputed: any;
  replace: any;
  toggleModal: (modal: Modal) => void;
};

export type TradeProps = {
  trade: any;
  setAsPaid: any;
  setAsCanceled: any;
  setAsDisputed: any;
  replace: any;
  tradeRemaingTime: number | null;
  ref: any;
  toggleModal: (modal: Modal) => void;
};
