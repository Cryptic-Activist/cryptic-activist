export interface IStyledSelectPaymentMethod {
	search: {
		borderColor: string;
		background: string;
		label: {
			color: string;
		};
		input: {
			color: string;
			focus: {
				borderColor: string;
			};
			placeholder: {
				color: string;
			};
		};
		icon: {
			color: string;
		};
	};
	list: {
		label: {
			color: string;
		};
		separator: {
			background: string;
		};
		items: {
			selected: {
				color: string;
				background: string;
				before: {
					background: string;
				};
			};
			color: string;
			background: string;
			hover: {
				background: string;
			};
			active: {
				background: string;
			};
		};
		borderColor: string;
		background: string;
	};
	apply: {
		color: string;
		background: string;
		borderColor: string;
		isCompleted: {
			color: string;
			background: string;
		};
	};
}
