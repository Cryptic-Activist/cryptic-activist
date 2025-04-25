import { GetTradesByUserAs } from '@/services/trades/types';
import { TradesSetter } from '@/store/trades/types';

export type TradeItemProps = {
  trade: TradesSetter;
  as: GetTradesByUserAs;
};
