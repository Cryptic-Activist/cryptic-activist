export type ABI = { [key: string]: any };

export type Value = {
  escrow?: ABI;
  premium?: ABI;
};

export type ABIsStore = {
  abis: {
    escrow?: ABI;
    premium?: ABI;
    setABIsValue: (value: Value, action?: `abis/${string}`) => void;
    setEscrowABI: (abi: ABI) => void;
    setPremiumABI: (abi: ABI) => void;
  };
};
