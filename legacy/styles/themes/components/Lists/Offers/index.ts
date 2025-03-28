import { light as offerLight } from "./Offer";
import { dark as offerDark } from "./Offer";

export const light = {
	background: "#fff",
	borderColor: "#000",
	header: {
		background: "#fff",
		borderColor: "#000",
		title: {
			color: "#000",
		},
		sort: {
			color: "#000",
			background: "#fff",
			borderColor: "#000",
		},
	},
	list: {
		background: "#fff",
		color: "#000",
	},
	offer: offerLight,
};

export const dark = {
	background: "#131313",
	borderColor: "#343434",
	header: {
		background: "#131313",
		borderColor: "#3a3a3a",
		title: {
			color: "#eaeaea",
		},
		sort: {
			color: "#eaeaea",
			background: "#232323",
			borderColor: "#000",
		},
	},
	list: {
		background: "#131313",
		color: "#eaeaea",
	},
	offer: offerDark,
};
