import { Chain } from '@/store/chain/types';
import { Cryptocurrency } from '@/store/cryptocurrency/types';
import { Fiat } from '@/store/fiat/types';
import { PaymentMethod } from '@/store/paymentMethod/types';
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
  chain?: Chain;
  amount?: number;
};

type Settings = { [key: string]: string | number | boolean };

export type CurrentPrice = number;
export type IsCheckIsMobileParams = {
  width: number;
  height: number;
};

export type AppStore = {
  app: {
    isMobile: boolean;
    dimensions: Dimensions;
    toasts: Toast[];
    type: Type;
    defaults: Defaults;
    currentPrice?: CurrentPrice;
    referralCode?: string;
    settings?: Settings;
    setAppValue: (value: Partial<Value>, actionName?: `app/${string}`) => void;
    setCurrentPrice: (id: string, fiatSymbol: string) => Promise<void>;
    removeToast: (id: string) => void;
    addToast: (type: ToastType, content: ToastContent, timeout: number) => void;
    checkIsMobile: (params: IsCheckIsMobileParams) => void;
    setReferralCode: (referralCode: string) => void;
    setSettings: () => void;
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
    chain?: Chain | null;
    amount?: number;
  };
  currentPrice?: CurrentPrice;
  referralCode?: string;
  settings?: Settings;
};

export type Value = AppStoreSetter;
export type SetCurrentPrice = (id: string, fiatSymbol: string) => Promise<void>;
