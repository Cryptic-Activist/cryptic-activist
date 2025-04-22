import {
  SetAsCanceledParams,
  SetAsPaidParams,
} from '@/hooks/useTradeSocket/types';

import { TradeSetter } from '@/store/trade/types';

export type TradeProps = {
  trade: TradeSetter;
};

export type TradePaymentInstructionsProps = TradeProps;

export type TradeStatementProps = TradeProps;

export type TradeCancelationProps = TradeProps & {
  timeLeft: string;
  escrowReleased: boolean;
  hasTradeBeenCreateBlockchain: boolean;
  paid: boolean;
  onSetAsPaid: (params: SetAsPaidParams) => void;
  onSetAsCanceled: (params: SetAsCanceledParams) => void;
};

export type TradeInstructionsProps = TradeProps;
