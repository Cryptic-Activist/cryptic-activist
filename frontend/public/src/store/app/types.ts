import type { Cryptocurrency } from '@/store/cryptocurrency/types';
import type { Fiat } from '@/store/fiat/types';
import type { PaymentMethod } from '@/store/paymentMethod/types';
import { ReactElement } from 'react';

type Dimensions = [number, number];

export type Type = 'buy' | 'sell';

export type ToastType = 'error' | 'info' | 'warning' | 'success';
export type ToastContent = string | ReactElement | ReactElement[];

export type Toast = {
  id: string;
  type: ToastType;
  content: ToastContent;
  timeout: number;
};

type Defaults = {
  fiat?: Fiat;
  cryptocurrency?: Cryptocurrency;
  paymentMethod?: PaymentMethod;
};

export type CurrentPrice = number;

export type AppState = {
  isMobile: boolean;
  dimensions: Dimensions;
  toasts: Toast[];
  type: Type;
  defaults: Defaults;
  currentPrice?: CurrentPrice;
};

export type AppStateSetter = {
  isMobile?: boolean;
  dimensions?: Dimensions;
  toasts?: Toast[];
  type?: Type;
  defaults?: {
    fiat?: Fiat | null;
    cryptocurrency?: Cryptocurrency | null;
    paymentMethod?: PaymentMethod | null;
  };
  currentPrice?: CurrentPrice;
};

export type Value = AppStateSetter;

export type SetCurrentPrice = (id: string, fiatSymbol: string) => Promise<void>;
