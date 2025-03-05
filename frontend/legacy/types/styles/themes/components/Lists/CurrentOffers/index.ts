import { IStyledListCurrentOffersOffer } from "./Offer";

export interface IStyledListCurrentOffers {
	background: string;
	borderColor: string;
	header: {
		color: string;
		background: string;
		borderColor: string;
		buttons: {
			active: {
				background: string;
				color: string;
			};
			deactive: {
				background: string;
				color: string;
			};
		};
	};
	list: {
		background: string;
		offer: IStyledListCurrentOffersOffer;
		empty: {
			color: string;
		};
	};
}
