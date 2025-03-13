import { AppStore } from '../app/types';
import { BlockchainStore } from '../blockchain/types';
import { CryptocurrencyStore } from '../cryptocurrency/types';
import { FiatStore } from '../fiat/types';
import { NavigationBarStore } from '../navigationBar/types';
import { PaymentMethodStore } from '../paymentMethod/types';
import { UserStore } from '../user/types';

export type RootStore = AppStore &
  BlockchainStore &
  CryptocurrencyStore &
  FiatStore &
  PaymentMethodStore &
  NavigationBarStore &
  UserStore;
