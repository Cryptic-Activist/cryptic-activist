export type SetPaymentConfirmedParams = {
  paymentConfirmedAt: string;
  status: string;
  endedAt: string;
  escrowReleasedAt: string;
};

export type SetTradeCancelledParams = {
  status: string;
  endedAt: string;
};
export type SetTradePaidParams = {
  paidAt: string;
};
