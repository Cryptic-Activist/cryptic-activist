import { GetTradesByUserAs } from '@/services/trades/types';
import { Trade } from '@/store/trades/types';

export type TradeItemProps = {
  trade: Trade;
  as: GetTradesByUserAs;
};
