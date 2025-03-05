export interface IStyledModalTemplate {
	background: string;
	borderColor: string;
	heading: {
		color: string;
	};
	label: {
		color: string;
	};
	input: {
		color: string;
		borderColor: string;
		background: string;
		focus: {
			borderColor: string;
		};
		placeholder: {
			color: string;
		};
	};
	submit: {
		background: string;
		color: string;
		borderColor: string;
		active: {
			background: string;
			color: string;
		};
		hover: {
			background: string;
			color: string;
		};
	};
	button: {
		color: string;
	};
	loading: {
		color: string;
	};
	message: {
		color: string;
	};
	privateKey: {
		color: string;
		background: string;
	};
	list: {
		item: {
			color: string;
		};
		button: {
			color: string;
		};
	};
	wallet: {
		address: {
			color: string;
		};
		copy: {
			color: string;
		};
	};
	selectBlockchain: {
		background: string;
		color: string;
		icon: {
			color: string;
		};
	};
}
