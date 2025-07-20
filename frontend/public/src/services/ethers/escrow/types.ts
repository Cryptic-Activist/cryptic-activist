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
  NO_CONTRACT_FOUND: 'NO_CONTRACT_FOUND',
};

export type GetTokenAllowanceParams = {
  tokenContractDetails: any;
  escrowContractDetails: any;
};

export type GetTokenBalanceParams = {
  tokenContractDetails: any;
};

export type ApproveTokenParams = {
  tokenContractDetails: any;
  escrowContractDetails: any;
  amount: bigint;
};

export type GetTokenDecimalsParams = {
  tokenContractDetails: any;
};
