import { CreateOfferState } from '@store/reducers/createOffer/types';
import { UserState } from '../../store/reducers/user/types';
import { HasFetchedParams } from './types';

export const checkRequest = (toCheck) => {
	if (
		Object.entries(toCheck.data).length > 0 &&
		!toCheck.loading &&
		toCheck.fetched &&
		toCheck.errors.length === 0
	) {
		return true;
	} else {
		return false;
	}
};

// export const checkIsOnline = () => {
// 	if (document !== undefined) {
// 		window.addEventListener("offline", () => {
// 			console.log("Im offline");
// 		});
// 	}
// };

export const isLoggedIn = (user: UserState) =>
	Object.entries(user.data).length > 0 &&
	user.errors.length === 0 &&
	user.fetched === true &&
	user.loading === false;

export const hasFetched = (params: HasFetchedParams) =>
	!params.loading && params.fetched && params.errors.length === 0;

export const isObjectNotEmpty = (object: object) =>
	Object.entries(object).length > 0;

export const isOfferCreated = (createOffer: CreateOfferState) =>
	!createOffer.data.section.paymentMethod &&
	!createOffer.data.section.tradePricing &&
	createOffer.data.section.tradeInstructions &&
	createOffer.data.cryptocurrency &&
	createOffer.data.fiat &&
	createOffer.data.paymentMethodType &&
	createOffer.data.category &&
	createOffer.data.selection &&
	createOffer.data.isPaymentMethodCompleted &&
	createOffer.data.tradePricingType &&
	createOffer.data.tradePricingType &&
	createOffer.data.listAt &&
	createOffer.data.listAt &&
	createOffer.data.limitMin &&
	createOffer.data.limitMax &&
	createOffer.data.timeLimit &&
	createOffer.data.isTradeInstructionsCompleted &&
	createOffer.data.tags.length > 0 &&
	createOffer.data.label.length > 0 &&
	createOffer.data.terms.length > 0 &&
	createOffer.data.instructions.length > 0 &&
	createOffer.data.isTradeInstructionsCompleted &&
	createOffer.data.isFilled &&
	createOffer.data.isSubmitted &&
	createOffer.hasCreated;
