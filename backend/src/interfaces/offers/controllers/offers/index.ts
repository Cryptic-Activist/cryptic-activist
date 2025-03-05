export interface IOffersIndexRequest {
  id: number;
  vendor_id: number;
  cryptocurrency_id: number;
  payment_method_id: number;
  fiat_id: number;
  payment_method_type: string;
  trade_pricing_type: string;
  trade_pricing_list_at: number;
  trade_pricing_trade_limits_min: number;
  trade_pricing_trade_limits_max: number;
  trade_pricing_time_limit: number;
  trade_instructions_tags: string[];
  trade_instructions_label: string;
  trade_instructions_terms: string;
  trade_instructions_instructions: string;
  is_deleted: boolean;
  when_deleted: Date;
  created_at: Date;
  updated_at: Date;
}
