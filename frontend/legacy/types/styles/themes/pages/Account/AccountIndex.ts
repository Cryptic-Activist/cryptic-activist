export interface IStyledPageAccountIndex {
	aside: {
		profileImage: {
			borderColor: string;
			background: string;
		};
		information: {
			borderColor: string;
			background: string;
			color: string;
		};
	};
	main: {
		vendorNamesDescription: {
			color: string;
		};
		status: {
			icon: {
				online: {
					color: string;
				};
				away: {
					color: string;
				};
			};
			statement: {
				color: string;
			};
		};
		feedbacks: {
			positive: {
				borderColor: string;
				background: string;
				color: string;
				p: {
					color: string;
				};
			};
			negative: {
				borderColor: string;
				background: string;
				color: string;
				p: {
					color: string;
				};
			};
		};
		list: {
			color: string;
		};
	};
}
