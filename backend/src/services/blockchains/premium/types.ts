export type DeployPremiumSmartContractParams = {
  platformWallet: string;
  monthlyPrice: number;
  yearlyPrice: number;
  chain: {
    id: string;
    rpcUrl: string;
  };
};
