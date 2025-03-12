import { AppStore } from '../app/types';
import { BlockchainStore } from '../blockchain/types';
import { CryptocurrencyStore } from '../cryptocurrency/types';
import { FiatStore } from '../fiat/types';
import { PaymentMethodStore } from '../paymentMethod/types';

export type RootStore = AppStore &
  BlockchainStore &
  CryptocurrencyStore &
  FiatStore &
  PaymentMethodStore;
