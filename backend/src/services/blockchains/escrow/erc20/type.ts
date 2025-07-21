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
