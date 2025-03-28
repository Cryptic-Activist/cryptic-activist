type NavigationBarStatus = 'idle' | 'loading' | 'success' | 'failed';

export type NavigationBarState = {
	drawers: {
		user: boolean;
	};
	tooltips: {
		user: boolean;
		wallet: boolean;
	};
	modals: {
		login: boolean;
		register: boolean;
		resetPassword: boolean;
		verifyAccount: boolean;
		privateKeys: boolean;
		cryptocurrencies: boolean;
		fiats: boolean;
		paymentMethods: boolean;
		blockchain: boolean;
	};
	status: NavigationBarStatus;
};

export type Drawer = 'user';

export type ToggleDrawerActionPayload = {
	drawer: Drawer;
};

export type Modal =
	| 'login'
	| 'register'
	| 'resetPassword'
	| 'verifyAccount'
	| 'privateKeys'
	| 'cryptocurrencies'
	| 'fiats'
	| 'paymentMethods'
	| 'blockchain';

export type ToggleModalActionPayload = {
	modal: Modal;
};

export type Tooltip = 'user' | 'wallet';

export type ToggleTooltipActionPayload = {
	tooltip: Tooltip;
};

export type ResetNavigationBarPayload = 'drawers' | 'modals' | 'tooltips';
