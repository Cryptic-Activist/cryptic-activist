export type Address = `0x${string}`;

export type InitTradeParams = {
  buyer: Address;
  seller: Address;
  arbitrator: Address;
  tradeAmount: bigint;
  buyerCollateral: bigint;
  sellerCollateral: bigint;
  sellerTotalDeposit: bigint;
  feeRate: number;
  tradeDuration: number;
  profitMargin: number;
};

export type Token = 'chainlnik' | 'pol';

export type DeployEscrowSmartContractParams = {
  platformWallet: string;
  defaultFeeRate: number;
  defaultProfitMargin: number;
  rpcUrl: string;
};
