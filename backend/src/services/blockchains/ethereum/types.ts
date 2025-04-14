type Address = `0x${string}`;

export type InitTradeParams = {
  buyer: Address;
  seller: Address;
  arbitrator: Address;
  cryptoAmount: string;
  buyerCollateral: string;
  sellerCollateral: string;
  depositDuration: number;
  confirmationDuration: number;
  disputeTimeout: number;
  feeRate: number;
  platformWallet: Address;
};
