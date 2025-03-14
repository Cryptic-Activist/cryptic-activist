import { FiatsStore } from './types';
import { RootStore } from '../root/types';
import { StateCreator } from 'zustand';
import { fetchFiats } from '@/services/fiats';

export const useFiatsStore: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  FiatsStore
> = (set, get) => ({
  fiats: {
    data: undefined,
    setFiatsValue: (params, actionName = 'fiats/setValue') => {
      set(
        ({ fiats }) => ({
          fiats: {
            ...fiats,
            data: params.data ?? fiats.data,
          },
        }),
        false,
        actionName
      );
    },
    getFiats: async () => {
      const fiats = await fetchFiats();
      const setValue = get().fiats.setFiatsValue;

      setValue({ data: fiats }, 'fiats/setFiats');
    },
  },
});
