export type Address = `0x${string}`;

export const TX_CODE = {
  ACTION_REJECTED: 'ACTION_REJECTED',
  NO_CONTRACT_FOUND: 'NO_CONTRACT_FOUND',
};

export type ApproveTokenParams = {
  tokenContractDetails: any;
  premiumContractDetails: any;
  amount: bigint;
};

export type GetTokenAllowanceParams = {
  tokenContractDetails: any;
  premiumContractDetails: any;
};

export type GetTokenBalanceParams = {
  tokenContractDetails: any;
};

export type GetTokenDecimalsParams = {
  tokenContractDetails: any;
};
