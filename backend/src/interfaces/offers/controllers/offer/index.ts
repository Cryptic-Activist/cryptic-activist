export interface IUserResponse {
  id: number;
  names: {
    first_name: string;
    last_name: string;
  };
  username: string;
  is_verified: boolean;
  created_at: string;
  updated_at: null | string;
}

export interface ICreateOffer {
  vendor_id: string;
  cryptocurrency_id: string;
  payment_method_type: 'buy' | 'sell';
  payment_method_id: string;
  fiat_id: string;
  trade_pricing_type: 'market' | 'fixed';
  trade_pricing_list_at: number;
  trade_pricing_trade_limits_min: number;
  trade_pricing_trade_limits_max: number;
  trade_pricing_time_limit: number;
  trade_instructions_tags: string[];
  trade_instructions_label: string;
  trade_instructions_terms: string;
  trade_instructions_instructions: string;
}

export interface ISanitizedCreateOffer {
  vendor_id: string;
  cryptocurrency_id: string;
  payment_method_type: string;
  payment_method_id: string;
  fiat_id: string;
  trade_pricing_type: string;
  trade_pricing_list_at: number;
  trade_pricing_trade_limits_min: number;
  trade_pricing_trade_limits_max: number;
  trade_pricing_time_limit: number;
  trade_instructions_tags: string[];
  trade_instructions_label: string;
  trade_instructions_terms: string;
  trade_instructions_instructions: string;
}

export interface ISanitizedGetOffer {
  id?: string;
  vendor_id?: string;
  cryptocurrency_id?: string;
  payment_method_type?: string;
  payment_method_id?: string;
  fiat_id?: string;
  trade_pricing_type?: string;
  trade_pricing_list_at?: number;
  trade_pricing_trade_limits_min?: number;
  trade_pricing_trade_limits_max?: number;
  trade_pricing_time_limit?: number;
  trade_instructions_tags?: string[];
  trade_instructions_label?: string;
  trade_instructions_terms?: string;
  trade_instructions_instructions?: string;
  is_deleted?: boolean;
  when_deleted?: null | Date;
  created_at?: Date;
  updated_at?: null | Date;
}

export interface ISanitizedGetOfferReturn {
  id?: BigInt;
  vendor_id?: BigInt;
  cryptocurrency_id?: BigInt;
  payment_method_type?: string;
  payment_method_id?: BigInt;
  fiat_id?: BigInt;
  trade_pricing_type?: string;
  trade_pricing_list_at?: number;
  trade_pricing_trade_limits_min?: number;
  trade_pricing_trade_limits_max?: number;
  trade_pricing_time_limit?: number;
  trade_instructions_tags?: string[];
  trade_instructions_label?: string;
  trade_instructions_terms?: string;
  trade_instructions_instructions?: string;
}

export interface ISanitizedInputCountFeedbacks {
  id?: string;
  vendor_id?: string;
  user_id?: string;
  offer_id?: string;
  message?: string;
  type?: string;
}

export interface ISanitizedInputCountFeedbacksReturn {
  id?: BigInt;
  vendor_id?: BigInt;
  user_id?: BigInt;
  offer_id?: BigInt;
  message?: string;
  type?: string;
}

export interface ICryptocurrency {
  id: BigInt;
  icon: string;
  name: string;
  symbol: string;
}

export interface IFiat {
  id: BigInt;
  name: string;
  symbol: string;
}

export interface IPaymentMethod {
  name: string;
}

export interface IVendor {
  id: BigInt;
  names: {
    first_name: string;
    last_name: string;
  },
  username: string;
}

export interface IOffer {
  id: BigInt;
  payment_method_type: string;
  trade_instructions_instructions: string;
  trade_instructions_label: string;
  trade_instructions_tags: string[];
  trade_instructions_terms: string;
  trade_pricing_list_at: number;
  trade_pricing_time_limit: number;
  trade_pricing_trade_limits_max: number;
  trade_pricing_trade_limits_min: number;
  trade_pricing_type: string;
  cryptocurrency?: ICryptocurrency;
  fiat?: IFiat;
  payment_method?: IPaymentMethod;
  vendor?: IVendor;
}
