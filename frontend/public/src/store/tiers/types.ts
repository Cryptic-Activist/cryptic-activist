export type Tier = {
  id: string;
  name: string;
  description: string;
  level: number;
  tradingFee: number;
  discount: number;
  volume: number;
  requiredXP: number;
};

export type TiersStore = {
  tiers: {
    data: Tier[];
    setTiersValue: (value: Value, action?: `tiers/${string}`) => void;
    getTiers: (tiers: Value) => Promise<void>;
  };
};

export type TiersSetter = {
  data: Tier[];
};

export type Value = TiersSetter;
