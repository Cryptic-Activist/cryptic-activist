import { CryptocurrenciesStore } from './types';
import { create } from 'zustand';
import { fetchCryptocurrencies } from '@/services/cryptocurrencies';

const useCryptocurrenciesStore = create<CryptocurrenciesStore>((set) => ({
  data: [],
  getCryptocurrencies: async () => {
    const cryptocurrencies = await fetchCryptocurrencies();

    if (!cryptocurrencies) {
      set({ data: cryptocurrencies });
    }
  },
}));

export default useCryptocurrenciesStore;
