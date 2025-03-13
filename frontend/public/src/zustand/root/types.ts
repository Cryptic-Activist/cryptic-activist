import type { AppStore } from '../app/types';
import type { BlockchainStore } from '../blockchain/types';
import type { CreateOfferStore } from '../createOffer/types';
import type { CryptocurrencyStore } from '../cryptocurrency/types';
import type { FiatStore } from '../fiat/types';
import type { NavigationBarStore } from '../navigationBar/types';
import type { PaymentMethodStore } from '../paymentMethod/types';
import type { RegisterStore } from '../register/types';
import type { UserStore } from '../user/types';

export type RootStore = AppStore &
  BlockchainStore &
  CryptocurrencyStore &
  FiatStore &
  PaymentMethodStore &
  NavigationBarStore &
  UserStore &
  RegisterStore &
  CreateOfferStore;
