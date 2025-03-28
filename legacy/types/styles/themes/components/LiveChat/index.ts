export interface IStyledLiveChat {
	background: string;
	borderColor: string;
	header: {
		background: string;
		borderColor: string;
		vendor: {
			img: {
				borderColor: string;
				background: string;
			};
			name: {
				color: string;
			};
		};
		feedbacks: {
			positive: {
				color: string;
			};
			negative: {
				color: string;
			};
			color: string;
		};
		lastSeen: {
			icon: {
				online: {
					background: string;
				};
				away: {
					background: string;
				};
				busy: {
					background: string;
				};
			};
			statement: {
				color: string;
			};
		};
	};
	body: {
		background: string;
		message: {
			color: string;
			sender: {
				background: string;
				color: string;
			};
			receiver: {
				background: string;
				color: string;
			};
		};
	};
	inputButtons: {
		borderColor: string;
		background: string;
		input: {
			color: string;
			background: string;
		};
		attachButton: {
			color: string;
			background: string;
		};
		sendMessageButton: {
			color: string;
			background: string;
		};
	};
}
