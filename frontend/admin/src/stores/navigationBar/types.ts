export type NavigationBarState = {
	drawers: {
		user: boolean;
	};
	tooltips: {
		user: boolean;
	};
	modals: {
		login: boolean;
		register: boolean;
		resetPassword: boolean;
	};
	status: 'idle' | 'loading';
};

export type ToggleModalParams = {
	modal: 'login' | 'register' | 'resetPassword';
};

export type ToggleTooltipParams = {
	tooltip: 'user';
};
