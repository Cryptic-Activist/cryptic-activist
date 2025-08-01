import { AdminWallet, UserWallet } from '@prisma/client';

import { Decimal } from '@prisma/client/runtime/library';

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

export type GetCreateTradeDetailsReturn = {
  buyerWallet: any;
  sellerWallet: any;
  arbitratorWallet: any;

  tradeAmount: Decimal;
  buyerCollateral: Decimal;
  sellerCollateral: Decimal;
  sellerTotalFund: Decimal;

  tradeAmountInWei: bigint;
  buyerCollateralInWei: bigint;
  sellerCollateralInWei: bigint;
  sellerTotalFundInWei: bigint;

  tradeDurationInSeconds: number;
  feeRate: number;
  profitMargin: number;
};
