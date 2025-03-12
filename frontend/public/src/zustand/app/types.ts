import { Cryptocurrency } from '@/zustand/cryptocurrency/types';
import { Fiat } from '@/zustand/fiat/types';
import { PaymentMethod } from '@/zustand/paymentMethod/types';
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

export type AppStore = {
  app: {
    isMobile: boolean;
    dimensions: Dimensions;
    toasts: Toast[];
    type: Type;
    defaults: Defaults;
    currentPrice?: CurrentPrice;
    setAppValue: (value: Value) => void;
    setCurrentPrice: (id: string, fiatSymbol: string) => Promise<void>;
    removeToast: (id: string) => void;
    addToast: (type: ToastType, content: ToastContent, timeout: number) => void;
  };
};

export type AppStoreSetter = {
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

export type Value = AppStoreSetter;
export type SetCurrentPrice = (id: string, fiatSymbol: string) => Promise<void>;
