import { IStyledFilter } from "./Filter";

export interface IStyledFilters {
	h1: {
		color: string;
	};
	category: {
		h2: {
			color: string;
		};
		filter: IStyledFilter;
	};
}
