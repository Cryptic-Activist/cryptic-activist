import { light as global } from './global';

import { light as avatar } from './components/Avatar';
import { light as buySell } from './components/BuySell';
import { light as drawer } from './components/Drawer';
import { light as footer } from './components/Footer';
import { light as liveChat } from './components/LiveChat';
import { light as minusPlusInput } from './components/MinusPlusInput';
import { light as modal } from './components/Modals/ModalTemplate';
import { light as navigationBar } from './components/NavigationBar';
import { light as offersSearch } from './components/Search/Offers/OffersSearch';
import { light as usersSearch } from './components/Search/Users/User';
import { light as vendorsSearch } from './components/Search/Vendors';
import { light as selectPaymentMethod } from './components/SelectPaymentMethod';
import { light as languageSwitcher } from './components/Switchers/Language';
import { light as themeSwitcher } from './components/Switchers/Theme';
import { light as warnings } from './components/Warnings';

import { light as listCryptocurrencies } from './components/Lists/Cryptocurrencies';
import { light as listCurrentOffers } from './components/Lists/CurrentOffers';
import { light as listFeedbacks } from './components/Lists/Feedbacks';
import { light as listFiats } from './components/Lists/Fiats';
import { light as listOffers } from './components/Lists/Offers';
import { light as listUsers } from './components/Lists/Users';

import { light as progressBarCreateOffer } from './components/ProgressBar/CreateOffer';

import { light as buttonInfo } from './components/Buttons/Info';
import { light as buttonLink } from './components/Buttons/Link';
import { light as buttonSelector } from './components/Buttons/Selector';

import { light as sectionIndexFindOffer } from './sections/Index/FindOffer';
import { light as sectionIndexHero } from './sections/Index/Hero';
import { light as sectionIndexWhatYouCanDo } from './sections/Index/WhatYouCanDo';

import { light as sectionOfferCreatePayment } from './sections/Offer/Create/PaymentMethod';
import { light as sectionOfferCreateInstructions } from './sections/Offer/Create/TradeInstructions';
import { light as sectionOfferCreatePricing } from './sections/Offer/Create/TradePricing';

import { light as pageAccountIndex } from './pages/Account/Index';
import { light as pageAccountMessages } from './pages/Account/Messages';
import { light as pageAccountPaymentMethods } from './pages/Account/PaymentMethods/Index';
import { light as pageOfferId } from './pages/Offer/Id';
import { light as pageTradeId } from './pages/Trade/Id';
import { light as vendorUsername } from './pages/Vendor/Username';

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
