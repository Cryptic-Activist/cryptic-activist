import 'styled-components';

import {
	IStyledAvatar,
	IStyledButtonInfo,
	IStyledButtonLink,
	IStyledButtonSelector,
	IStyledBuySell,
	IStyledDrawer,
	IStyledFooter,
	IStyledGlobal,
	IStyledLanguageSwitcher,
	IStyledListCryptocurrencies,
	IStyledListCurrentOffers,
	IStyledListFeedbacks,
	IStyledListFiats,
	IStyledListOffers,
	IStyledListUsers,
	IStyledLiveChat,
	IStyledMinusPlusInput,
	IStyledModalTemplate,
	IStyledNavigationBar,
	IStyledOffersSearch,
	IStyledPageAccountIndex,
	IStyledPageAccountMessages,
	IStyledPageAccountPaymentMethodsIndex,
	IStyledPageOfferId,
	IStyledPageTradeId,
	IStyledPageVendorUsername,
	IStyledProgressBarCreateOffer,
	IStyledSearchUsersUser,
	IStyledSectionCreateOfferInstructions,
	IStyledSectionCreateOfferPaymentMethod,
	IStyledSectionCreateOfferPricing,
	IStyledSectionIndexFindOffer,
	IStyledSectionIndexHero,
	IStyledSectionIndexWhatYouCanDo,
	IStyledSelectPaymentMethod,
	IStyledThemeSwitcher,
	IStyledVendorsSearch,
	IStyledWarnings,
} from 'types/styles/themes';

declare module 'styled-components' {
	export interface DefaultTheme {
		global: IStyledGlobal;
		components: {
			navigationBar: IStyledNavigationBar;
			drawer: IStyledDrawer;
			footer: IStyledFooter;
			modal: IStyledModalTemplate;
			liveChat: IStyledLiveChat;
			switchers: {
				theme: IStyledThemeSwitcher;
				language: IStyledLanguageSwitcher;
			};
			warnings: IStyledWarnings;
			search: {
				offers: IStyledOffersSearch;
				vendors: IStyledVendorsSearch;
				users: IStyledSearchUsersUser;
			};
			list: {
				offers: IStyledListOffers;
				fiats: IStyledListFiats;
				users: IStyledListUsers;
				cryptocurrencies: IStyledListCryptocurrencies;
				currentOffers: IStyledListCurrentOffers;
				feedbacks: IStyledListFeedbacks;
			};
			buttons: {
				link: IStyledButtonLink;
				selector: IStyledButtonSelector;
				info: IStyledButtonInfo;
			};
			progressBar: {
				createOffer: IStyledProgressBarCreateOffer;
			};
			selectPaymentMethod: IStyledSelectPaymentMethod;
			buySell: IStyledBuySell;
			minusPlusInput: IStyledMinusPlusInput;
			avatar: IStyledAvatar;
		};
		sections: {
			index: {
				hero: IStyledSectionIndexHero;
				findOffer: IStyledSectionIndexFindOffer;
				whatYouCanDo: IStyledSectionIndexWhatYouCanDo;
			};
			offer: {
				create: {
					paymentMethod: IStyledSectionCreateOfferPaymentMethod;
					tradePricing: IStyledSectionCreateOfferPricing;
					tradeInstructions: IStyledSectionCreateOfferInstructions;
				};
			};
		};
		pages: {
			account: {
				index: IStyledPageAccountIndex;
				messages: IStyledPageAccountMessages;
				paymentMethods: {
					index: IStyledPageAccountPaymentMethodsIndex;
				};
			};
			offer: {
				id: IStyledPageOfferId;
			};
			trade: {
				id: IStyledPageTradeId;
			};
			vendor: {
				username: IStyledPageVendorUsername;
			};
		};
	}
}
