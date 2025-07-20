export type Contract = { [key: string]: any };

export type Value = {
  escrow?: {
    erc20?: Contract;
    native?: Contract;
  };
  premium?: Contract;
};

export type ContractsStore = {
  contracts: {
    escrow?: {
      erc20?: Contract;
      native?: Contract;
    };
    premium?: Contract;
    setContractsValue: (value: Value, action?: `contracts/${string}`) => void;
    setEscrowNativeContract: (contract: Contract) => void;
    setEscrowERC20Contract: (contract: Contract) => void;
    setPremiumContract: (contract: Contract) => void;
  };
};
