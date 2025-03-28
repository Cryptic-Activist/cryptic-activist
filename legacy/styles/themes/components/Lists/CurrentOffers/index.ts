import { dark as offerDark } from "./Offer";
import { light as offerLight } from "./Offer";

export const light = {
	background: "#fff",
	borderColor: "#000",
	header: {
		color: "#000",
		background: "#fff",
		borderColor: "#000",
		buttons: {
			active: {
				background: "#ffcd2b",
				color: "#000",
			},
			deactive: {
				background: "#fff",
				color: "#000",
			},
		},
	},
	list: {
		background: "#fff",
		offer: offerLight,
		empty: {
			color: "#000",
		},
	},
};

export const dark = {
	background: "#131313",
	borderColor: "#343434",
	header: {
		color: "#000",
		background: "#131313",
		borderColor: "#404040",
		buttons: {
			active: {
				background: "#545454",
				color: "#eaeaea",
			},
			deactive: {
				background: "#131313",
				color: "#eaeaea",
			},
		},
	},
	list: {
		background: "#131313",
		offer: offerDark,
		empty: {
			color: "#eaeaea",
		},
	},
};
