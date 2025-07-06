import { Modal } from '@/store/navigationBar/types';

export type TradeProps = {
  trade: any;
  setAsPaymentConfirmed: any;
  setAsCanceled: any;
  setAsDisputed: any;
  replace: any;
  tradeRemaingTime: number | null;
  ref: any;
  toggleModal: (modal: Modal) => void;
  vendorHasEnoughFunds: boolean;
};

export type ActionButtonsProps = {
  trade: any;
  setAsPaymentConfirmed: any;
  setAsDisputed: any;
  setAsCanceled: any;
  replace: any;
  toggleModal: (modal: Modal) => void;
};
