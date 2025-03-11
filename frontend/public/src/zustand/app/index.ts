import { AppStore } from './types';
import { IS_DEVELOPMENT } from '@/constants';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchCurrentPrice } from '@/services/app';
import { generateUUID } from '@/utils';

const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      dimensions: [0, 0],
      isMobile: false,
      type: 'buy',
      toasts: [],
      defaults: {},
      setValue: ({
        currentPrice,
        defaults,
        dimensions,
        isMobile,
        toasts,
        type,
      }) => {
        set(
          (state) => {
            return {
              defaults: {
                fiat: defaults?.fiat ?? state.defaults?.fiat,
                cryptocurrency:
                  defaults?.cryptocurrency ?? state.defaults?.cryptocurrency,
                paymentMethod:
                  defaults?.paymentMethod ?? state.defaults?.paymentMethod,
              },
              dimensions: dimensions ?? state.dimensions,
              isMobile: isMobile ?? state.isMobile,
              type: type ?? state.type,
              toasts: toasts ?? state.toasts,
              currentPrice: currentPrice ?? state.currentPrice,
            };
          },
          false,
          'app/setValue'
        );
      },
      setCurrentPrice: async (id, fiatSymbol) => {
        const currentPrice = await fetchCurrentPrice(id, fiatSymbol);

        if (!currentPrice) {
          return;
        }

        const crypto = Object.values(currentPrice.data)[0] as object;
        const price: number = Object.values(crypto)[0];

        set(
          () => ({
            currentPrice: price,
          }),
          false,
          'app/setCurrentPrice'
        );
      },
      removeToast: (id) => {
        const toasts = useAppStore.getState().toasts;
        const filteredToasts = toasts.filter((toast) => toast.id !== id);
        set({ toasts: filteredToasts }, false, 'app/removeToast');
      },
      addToast: (type, content, timeout) => {
        const toasts = useAppStore.getState().toasts;
        const removeToast = useAppStore.getState().removeToast;
        const uuid = generateUUID();

        toasts.push({ type, content, timeout, id: uuid });

        set({ toasts }, false, 'app/addToast');

        setTimeout(() => {
          removeToast(uuid);
        }, timeout);
      },
    }),
    {
      name: 'appStore',
      enabled: IS_DEVELOPMENT,
    }
  )
);

export default useAppStore;
