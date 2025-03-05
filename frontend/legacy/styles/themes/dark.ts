import { dark as global } from './global';

import { dark as avatar } from './components/Avatar';
import { dark as buySell } from './components/BuySell';
import { dark as drawer } from './components/Drawer';
import { dark as footer } from './components/Footer';
import { dark as liveChat } from './components/LiveChat';
import { dark as minusPlusInput } from './components/MinusPlusInput';
import { dark as modal } from './components/Modals/ModalTemplate';
import { dark as navigationBar } from './components/NavigationBar';
import { dark as offersSearch } from './components/Search/Offers/OffersSearch';
import { dark as usersSearch } from './components/Search/Users/User';
import { dark as vendorsSearch } from './components/Search/Vendors';
import { dark as selectPaymentMethod } from './components/SelectPaymentMethod';
import { dark as languageSwitcher } from './components/Switchers/Language';
import { dark as themeSwitcher } from './components/Switchers/Theme';
import { dark as warnings } from './components/Warnings';

import { dark as listCryptocurrencies } from './components/Lists/Cryptocurrencies';
import { dark as listCurrentOffers } from './components/Lists/CurrentOffers';
import { dark as listFeedbacks } from './components/Lists/Feedbacks';
import { dark as listFiats } from './components/Lists/Fiats';
import { dark as listOffers } from './components/Lists/Offers';
import { dark as listUsers } from './components/Lists/Users';

import { dark as progressBarCreateOffer } from './components/ProgressBar/CreateOffer';

import { dark as buttonInfo } from './components/Buttons/Info';
import { dark as buttonLink } from './components/Buttons/Link';
import { dark as buttonSelector } from './components/Buttons/Selector';

import { dark as sectionIndexFindOffer } from './sections/Index/FindOffer';
import { dark as sectionIndexHero } from './sections/Index/Hero';
import { dark as sectionIndexWhatYouCanDo } from './sections/Index/WhatYouCanDo';

import { dark as sectionOfferCreatePayment } from './sections/Offer/Create/PaymentMethod';
import { dark as sectionOfferCreateInstructions } from './sections/Offer/Create/TradeInstructions';
import { dark as sectionOfferCreatePricing } from './sections/Offer/Create/TradePricing';

import { dark as pageAccountIndex } from './pages/Account/Index';
import { dark as pageAccountMessages } from './pages/Account/Messages';
import { dark as pageAccountPaymentMethods } from './pages/Account/PaymentMethods/Index';
import { dark as pageOfferId } from './pages/Offer/Id';
import { dark as pageTradeId } from './pages/Trade/Id';
import { dark as vendorUsername } from './pages/Vendor/Username';

export default {
	global,
	components: {
		navigationBar,
		drawer,
		modal,
		footer,
		liveChat,
		switchers: {
			theme: themeSwitcher,
			language: languageSwitcher,
		},
		warnings,
		search: {
			offers: offersSearch,
			vendors: vendorsSearch,
			users: usersSearch,
		},
		list: {
			offers: listOffers,
			fiats: listFiats,
			cryptocurrencies: listCryptocurrencies,
			currentOffers: listCurrentOffers,
			feedbacks: listFeedbacks,
			users: listUsers,
		},
		buttons: {
			link: buttonLink,
			selector: buttonSelector,
			info: buttonInfo,
		},
		progressBar: {
			createOffer: progressBarCreateOffer,
		},
		selectPaymentMethod,
		buySell,
		minusPlusInput,
		avatar,
	},
	sections: {
		index: {
			hero: sectionIndexHero,
			findOffer: sectionIndexFindOffer,
			whatYouCanDo: sectionIndexWhatYouCanDo,
		},
		offer: {
			create: {
				paymentMethod: sectionOfferCreatePayment,
				tradePricing: sectionOfferCreatePricing,
				tradeInstructions: sectionOfferCreateInstructions,
			},
		},
	},
	pages: {
		account: {
			index: pageAccountIndex,
			messages: pageAccountMessages,
			paymentMethods: {
				index: pageAccountPaymentMethods,
			},
		},
		offer: {
			id: pageOfferId,
		},
		trade: {
			id: pageTradeId,
		},
		vendor: {
			username: vendorUsername,
		},
	},
};
