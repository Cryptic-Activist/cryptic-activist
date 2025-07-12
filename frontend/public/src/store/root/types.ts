import { ABIsStore } from '../abis/types';
import type { AppStore } from '../app/types';
import type { BlockchainStore } from '../blockchain/types';
import { ChainStore } from '../chain/types';
import { ChainsStore } from '../chains/types';
import type { CreateOfferStore } from '../createOffer/types';
import type { CryptocurrenciesStore } from '../cryptocurrencies/types';
import type { CryptocurrencyStore } from '../cryptocurrency/types';
import type { FiatStore } from '../fiat/types';
import type { FiatsStore } from '../fiats/types';
import { MyOffersStore } from '../myOffers/types';
import type { NavigationBarStore } from '../navigationBar/types';
import type { NotificationsStore } from '../notifications/types';
import type { OfferStore } from '../offer/types';
import type { OffersStore } from '../offers/types';
import type { PaymentMethodCategoriesStore } from '../paymentMethodCategories/types';
import type { PaymentMethodStore } from '../paymentMethod/types';
import type { PaymentMethodsStore } from '../paymentMethods/types';
import type { RegisterStore } from '../register/types';
import type { ResetPasswordStore } from '../resetPassword/types';
import type { TiersStore } from '../tiers/types';
import type { TradeDetailsStore } from '../tradeDetails/types';
import type { TradeStore } from '../trade/types';
import type { TradesStore } from '../trades/types';
import type { UserStore } from '../user/types';
import { VendorStore } from '../vendor/types';
import type { VerifyAccountStore } from '../verifyAccount/types';

export type RootStore = ABIsStore &
  AppStore &
  BlockchainStore &
  ChainsStore &
  ChainStore &
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
  OfferStore &
  TradeStore &
  NotificationsStore &
  ResetPasswordStore &
  TradesStore &
  TradeDetailsStore &
  TiersStore &
  VendorStore &
  MyOffersStore;
