export type Address = `0x${string}`;

export type InitTradeParams = {
  buyer: Address;
  seller: Address;
  arbitrator: Address;
  cryptoAmount: bigint;
  buyerCollateral: bigint;
  sellerCollateral: bigint;
  sellerTotalDeposit: bigint;
  feeRate: number;
  tradeDuration: number;
  profitMargin: number;
};

export type Token = 'chainlnik' | 'pol';

export const TX_CODE = {
  ACTION_REJECTED: 'ACTION_REJECTED',
};
