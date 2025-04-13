type Address = `0x${string}`;

export type InitTradeParams = {
  buyer: Address;
  seller: Address;
  arbitrator: Address;
  cryptoAmount: number;
  buyerCollateral: number;
  sellerCollateral: number;
  depositDuration: number;
  confirmationDuration: number;
  disputeTimeout: number;
  feeRate: number;
  platformWallet: Address;
};
