import { light as feedbackLight } from "./Feedback";
import { dark as feedbackDark } from "./Feedback";

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
		positiveNegativeAll: {
			background: "#fff",
			color: "#000",
		},
	},
	feedback: feedbackLight,
};

export const dark = {
	background: "#131313",
	borderColor: "#404040",
	header: {
		color: "#eaeaea",
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
		positiveNegativeAll: {
			background: "#131313",
			color: "#eaeaea",
		},
	},
	feedback: feedbackDark,
};
