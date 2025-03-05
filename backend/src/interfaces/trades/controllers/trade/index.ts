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

export interface ISanitizedInputCreateTrade {
  vendor_id: string;
  trader_id: string;
  offer_id: string;
  cryptocurrency_id: string;
  fiat_id: string;
  chat_id: string;
  cryptocurrency_amount: number;
  fiat_amount: number;
}

export interface ISanitizedInputCreateTradeReturn {
  vendor_id?: BigInt;
  trader_id?: BigInt;
  offer_id?: BigInt;
  cryptocurrency_id?: BigInt;
  fiat_id?: BigInt;
  chat_id?: BigInt;
  cryptocurrency_amount?: number;
  fiat_amount?: number;
}

export interface ISanitizedInputGetTrade {
  id: string;
}

export interface ISanitizedInputCreateGetReturn {
  id?: BigInt;
}

export interface ISanitizedInputCancelTrade {
  id: string;
}

export interface ISanitizedInputCancelReturn {
  id?: BigInt;
}
