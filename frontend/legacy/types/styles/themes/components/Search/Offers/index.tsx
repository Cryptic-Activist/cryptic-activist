import { IStyledFilters } from "./Filters";

export interface IStyledOffersSearch {
	background: string;
	borderColor: string;
	topButtons: {
		borderColor: string;
		topButton: {
			color: string;
		};
		selected: {
			borderColor: string;
		};
	};
	form: {
		label: {
			color: string;
		};
		select: {
			borderColor: string;
			color: string;
			background: string;
		};
		cryptoSelect: {
			borderColor: string;
			color: string;
		};
		info: {
			button: {
				color: string;
			};
		};
		submit: {
			background: string;
			borderColor: string;
			color: string;
		};
	};
	filters: IStyledFilters;
}
