type Address = `0x${string}`;

export type InitTradeParams = {
  buyer: Address;
  seller: Address;
  arbitrator: Address;
  cryptoAmount: number;
  buyerCollateral: number;
  sellerCollateral: number;
  feeRate: number;
  tradeDuration: number;
  profitMargin: number;
};

export type Token = 'chainlnik' | 'pol';
