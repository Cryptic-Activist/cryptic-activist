import { SetTradeAs } from '../types';

type DisputeType =
  | 'PAYMENT_NOT_RECEIVED'
  | 'PAYMENT_FRAUD'
  | 'CRYPTO_NOT_RELEASED'
  | 'INCORRECT_PAYMENT_AMOUNT'
  | 'PAYMENT_TO_WRONG_ACCOUNT'
  | 'FAKE_PAYMENT_PROOF'
  | 'LATE_PAYMENT'
  | 'COMMUNICATION_ISSUE'
  | 'OFF_PLATFORM_TRANSACTION'
  | 'TRADE_TIMEOUT'
  | 'ABUSIVE_BEHAVIOR'
  | 'IDENTITY_MISMATCH'
  | 'PLATFORM_ERROR'
  | 'SUSPICIOUS_ACTIVITY'
  | 'OTHER';

export type Evidence = {
  fileName: string;
  url: string;
};

export type SetTradeAsPaidParams = SetTradeAs;
export type SetTradeAsPaymentConfirmed = SetTradeAs;
export type SetTradeAsCanceledParams = SetTradeAs;
export type SetTradeAsDisputedParams = SetTradeAs & {
  type: DisputeType;
  reason: string;
  evidences: Evidence[];
};
