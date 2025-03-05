export interface IStyledDrawer {
	background: string;
	borderColor: string;
	profileButton: {
		background: string;
		img: {
			borderColor: string;
		};
		name: {
			color: string;
		};
		username: {
			color: string;
		};
		hover: {
			background: string;
		};
		active: {
			background: string;
		};
	};
	profileDropDownMenu: {
		background: string;
		item: {
			background: string;
			color: string;
			hover: {
				background: string;
			};
		};
	};
	item: {
		background: string;
		color: string;
		hover: {
			background: string;
		};
	};
	loginLogout: {
		background: string;
		color: string;
		borderColor: string;
	};
}
