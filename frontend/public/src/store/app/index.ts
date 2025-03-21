import { AppStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { fetchCurrentPrice } from '@/services/app';
import { generateUUID } from '@/utils';

export const useAppStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  AppStore
> = (set, get) => ({
  app: {
    dimensions: [0, 0],
    isMobile: false,
    type: 'buy',
    toasts: [],
    defaults: {},
    setAppValue: (params, actionName = 'app/setValue') => {
      set(
        ({ app }) => ({
          app: {
            ...app,
            dimensions: params.dimensions ?? app.dimensions,
            isMobile: params.isMobile ?? app.isMobile,
            toasts: params.toasts ?? app.toasts,
            type: params.type ?? app.type,
            currentPrice: params.currentPrice ?? app.currentPrice,
            defaults: {
              cryptocurrency:
                params.defaults?.cryptocurrency ?? app.defaults.cryptocurrency,
              fiat: params.defaults?.fiat ?? app.defaults.fiat,
              paymentMethod:
                params.defaults?.paymentMethod ?? app.defaults.paymentMethod,
            },
          },
        }),
        false,
        actionName
      );
    },
    setCurrentPrice: async (id, fiatSymbol) => {
      const currentPrice = await fetchCurrentPrice(id, fiatSymbol);

      if (!currentPrice) {
        return;
      }

      const {
        app: { currentPrice: _currentPrice, setAppValue },
      } = get();

      setAppValue({ currentPrice: currentPrice.price }, 'app/setCurrentPrice');
    },
    removeToast: (id) => {
      const {
        app: { toasts, ...restApp },
        ...rest
      } = get();
      const filteredToasts = toasts.filter((toast) => toast.id !== id);

      set(
        { app: { toasts: filteredToasts, ...restApp }, ...rest },
        false,
        'app/removeToast'
      );
    },
    addToast: (type, content, timeout) => {
      const {
        app: { toasts, ...restApp },
        ...rest
      } = get();
      const newToast = toasts;
      const removeToast = get().app.removeToast;
      const uuid = generateUUID();

      newToast.push({ type, content, timeout, id: uuid });

      set(
        { app: { toasts: newToast, ...restApp }, ...rest },
        false,
        'app/addToast'
      );

      setTimeout(() => {
        removeToast(uuid);
      }, timeout);
    },
    checkIsMobile: ({ width }) => {
      const { app } = get();
      const isMobile = width < 768;

      set({ app: { ...app, isMobile } }, false, 'app/checkIsMobile');
    },
  },
});
