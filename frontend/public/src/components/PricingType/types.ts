export type PricingItem = {
  label: 'Market' | 'Fixed';
  value: 'market' | 'fixed';
};

export type PricingTypeProps = {
  onChange: (item: PricingItem) => void;
};
