import type { AppStore } from '../app/types';
import type { BlockchainStore } from '../blockchain/types';
import type { CreateOfferStore } from '../createOffer/types';
import type { CryptocurrenciesStore } from '../cryptocurrencies/types';
import type { CryptocurrencyStore } from '../cryptocurrency/types';
import type { FiatStore } from '../fiat/types';
import type { FiatsStore } from '../fiats/types';
import type { NavigationBarStore } from '../navigationBar/types';
import type { OfferStore } from '../offer/types';
import type { OffersStore } from '../offers/types';
import type { PaymentMethodCategoriesStore } from '../paymentMethodCategories/types';
import type { PaymentMethodStore } from '../paymentMethod/types';
import type { PaymentMethodsStore } from '../paymentMethods/types';
import type { RegisterStore } from '../register/types';
import type { UserStore } from '../user/types';
import type { VerifyAccountStore } from '../verifyAccount/types';

export type RootStore = AppStore &
  BlockchainStore &
  CryptocurrencyStore &
  CryptocurrenciesStore &
  FiatStore &
  PaymentMethodStore &
  NavigationBarStore &
  UserStore &
  RegisterStore &
  CreateOfferStore &
  FiatsStore &
  PaymentMethodsStore &
  PaymentMethodCategoriesStore &
  VerifyAccountStore &
  OffersStore &
  OfferStore;
