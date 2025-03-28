import { IStyledListOffersOffer } from "./Offer";

export interface IStyledListOffers {
	background: string;
	borderColor: string;
	header: {
		background: string;
		borderColor: string;
		title: {
			color: string;
		};
		sort: {
			color: string;
			background: string;
			borderColor: string;
		};
	};
	list: {
		background: string;
		color: string;
	};
	offer: IStyledListOffersOffer;
}
