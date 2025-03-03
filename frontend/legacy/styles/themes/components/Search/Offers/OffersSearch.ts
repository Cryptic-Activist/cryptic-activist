import { light as filtersLight } from "./Filters/Filters";
import { dark as filtersDark } from "./Filters/Filters";

export const light = {
	background: "#fff",
	borderColor: "#000",
	topButtons: {
		borderColor: "#d3d3d3",
		topButton: {
			color: "#000",
		},
		selected: {
			borderColor: "#000",
		},
	},
	form: {
		label: {
			color: "#000",
		},
		select: {
			borderColor: "#c2c2c2",
			color: "#6c6c6c",
			background: "#f2f2f2",
		},
		cryptoSelect: {
			borderColor: "#c2c2c2",
			color: "#000",
		},
		info: {
			button: {
				color: "#a2a2a2",
			},
		},
		submit: {
			background: "#000",
			borderColor: "#000",
			color: "#ffcd2b",
		},
	},
	filters: filtersLight,
};

export const dark = {
	background: "#131313",
	borderColor: "#343434",
	topButtons: {
		borderColor: "#3a3a3a",
		topButton: {
			color: "#eaeaea",
		},
		selected: {
			borderColor: "#fff",
		},
	},
	form: {
		label: {
			color: "#eaeaea",
		},
		select: {
			borderColor: "#545454",
			color: "#eaeaea",
			background: "#2f2f2f",
		},
		cryptoSelect: {
			borderColor: "#545454",
			color: "#eaeaea",
		},
		info: {
			button: {
				color: "#eaeaea",
			},
		},
		submit: {
			background: "#060606",
			borderColor: "#000",
			color: "#eaeaea",
		},
	},
	filters: filtersDark,
};
