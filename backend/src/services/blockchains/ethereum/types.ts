type Address = `0x${string}`;

export type InitTradeParams = {
  buyer: Address;
  seller: Address;
  arbitrator: Address;
  cryptoAmount: string;
  buyerCollateral: string;
  sellerCollateral: string;
  feeRate: number;
  tradeDuration: number;
  profitMargin: number;
};
