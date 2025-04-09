import { SetAsPaidParams } from '@/hooks/useSocket/types';
import { TradeSetter } from '@/store/trade/types';

export type TradeProps = {
  trade: TradeSetter;
};

export type TradePaymentInstructionsProps = TradeProps;

export type TradeStatementProps = TradeProps;

export type TradeCancelationProps = TradeProps & {
  timeLeft: string;
  onSetAsPaid: (params: SetAsPaidParams) => void;
  isTradePaid: null | boolean;
};

export type TradeInstructionsProps = TradeProps;
