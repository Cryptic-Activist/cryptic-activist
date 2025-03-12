import { AppStore } from '../app/types';
import { BlockchainStore } from '../blockchain/types';
import { CryptocurrencyStore } from '../cryptocurrency/types';

export type RootStore = AppStore & BlockchainStore & CryptocurrencyStore;
