type Params = {
  tradeId: string;
  type: 'NEGATIVE' | 'NEUTRAL' | 'POSITIVE';
  message: string;
};

export type OnSubmit = (params: Params) => void;
