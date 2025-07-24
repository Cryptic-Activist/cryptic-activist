export type DeployPremiumSmartContractParams = {
  platformWallet: string;
  monthlyPrice: string;
  yearlyPrice: string;
  chain: {
    id: string;
    rpcUrl: string;
  };
};
