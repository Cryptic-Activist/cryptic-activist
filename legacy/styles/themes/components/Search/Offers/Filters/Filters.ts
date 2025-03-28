import { light as filterLight } from "./Filter/Filter";
import { dark as filterDark } from "./Filter/Filter";

export const light = {
	h1: {
		color: "#000",
	},
	category: {
		h2: {
			color: "#000",
		},
		filter: filterLight,
	},
};

export const dark = {
	h1: {
		color: "#eaeaea",
	},
	category: {
		h2: {
			color: "#eaeaea",
		},
		filter: filterDark,
	},
};
