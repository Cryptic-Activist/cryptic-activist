import { SetTradeAs } from '../types';

export type SetTradeAsPaidParams = SetTradeAs;
export type SetTradeAsPaymentConfirmed = SetTradeAs;
export type SetTradeAsCanceledParams = SetTradeAs;
export type SetTradeAsDisputedParams = SetTradeAs & {
  disputeReason: string;
};
