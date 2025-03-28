import { TradeSetter } from '@/store/trade/types';

export type TradeProps = {
  trade: TradeSetter;
};

export type TradePaymentInstructionsProps = TradeProps;

export type TradeStatementProps = TradeProps;

export type TradeCancelationProps = TradeProps & { timeLeft: string };

export type TradeInstructionsProps = TradeProps;
