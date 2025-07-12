export type Tier = {
  id: string;
  name: string;
  symbol: string;
  country: string;
};

export type TiersStore = {
  tiers: {
    data?: Tier[];
    setTiersValue: (value: Value, action?: `tiers/${string}`) => void;
    getTiers: (tiers: Value) => Promise<void>;
  };
};

export type TiersSetter = {
  data: {
    id: string;
    name: string;
    symbol: string;
    country: string;
  }[];
};

export type Value = TiersSetter;
