type Address = `0x${string}`;

export type InitTradeParams = {
  buyer: Address;
  seller: Address;
  arbitrator: Address;
  cryptoAmount: bigint;
  buyerCollateral: bigint;
  sellerCollateral: bigint;
  feeRate: number;
  tradeDuration: number;
  profitMargin: number;
};
