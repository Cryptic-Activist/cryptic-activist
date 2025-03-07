import {
  AppState,
  AppStateSetter,
  SetCurrentPrice,
  ToastContent,
  ToastType,
  Value,
} from './types';

import { fetchCurrentPrice } from '@/services/app';
import { generateUUID } from '@/utils';
import { map } from 'nanostores';

export const $app = map<AppState>({
  dimensions: [0, 0],
  isMobile: false,
  type: 'buy',
  toasts: [],
  defaults: {},
});

const setter = ({
  defaults,
  dimensions,
  isMobile,
  type,
  toasts,
  currentPrice,
}: AppStateSetter) => {
  const app = $app.get();

  $app.set({
    defaults: {
      fiat: defaults?.fiat ?? app.defaults?.fiat,
      cryptocurrency: defaults?.cryptocurrency ?? app.defaults?.cryptocurrency,
      paymentMethod: defaults?.paymentMethod ?? app.defaults?.paymentMethod,
    },
    dimensions: dimensions ?? app.dimensions,
    isMobile: isMobile ?? app.isMobile,
    type: type ?? app.type,
    toasts: toasts ?? app.toasts,
    currentPrice: currentPrice ?? app.currentPrice,
  });
};

export const setValue = (value: Value) => {
  setter(value);
};

export const setCurrentPrice: SetCurrentPrice = async (id, fiatSymbol) => {
  const currentPrice = await fetchCurrentPrice(id, fiatSymbol);

  if (!currentPrice) {
    return;
  }

  const crypto = Object.values(currentPrice.data)[0] as object;
  const price: number = Object.values(crypto)[0];

  setter({ currentPrice: price });
};

export const addToast = (
  type: ToastType,
  content: ToastContent,
  timeout: number
) => {
  let toasts = $app.get().toasts;
  const uuid = generateUUID();

  toasts.push({ type, content, timeout, id: uuid });

  setter({ toasts });

  setTimeout(() => {
    removeToast(uuid);
  }, timeout);
};

export const removeToast = (id: string) => {
  const toasts = $app.get().toasts;
  const filteredToasts = toasts.filter((toast) => toast.id !== id);

  setter({ toasts: filteredToasts });
};
