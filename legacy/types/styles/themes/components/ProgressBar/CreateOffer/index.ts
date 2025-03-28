export interface IStyledProgressBarCreateOffer {
	selection: {
		active: {
			borderColor: string;
			color: string;
			background: string;
		};
		deactivate: {
			borderColor: string;
			color: string;
			background: string;
		};
	};
	step: {
		active: {
			color: string;
		};
		deactivate: {
			color: string;
		};
	};
	separator: {
		background: string;
	};
}
