import { Filter } from '@/hooks/useTrades/types';
import { GetTradesByUserAs } from '@/services/trades/types';
import { Trade } from '@/store/trades/types';

export type TradeItemProps = {
  trade: Trade;
  as: GetTradesByUserAs;
};

type Status =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'EXPIRED'
  | 'FAILED';

export type Icons = {
  status: Status;
  name: string;
  backgroundColor: string;
  color: string;
  title: string;
  mainActionButtonLabel?: string;
}[];

export type Filters = {
  label: string;
  filter: Filter;
}[];
