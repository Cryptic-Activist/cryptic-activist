export type SelectorProps = {
  type: 'cryptocurrency' | 'fiat';
  hasLabel?: boolean;
};

export type BuildLabel = (symbol: string, name: string) => string;
