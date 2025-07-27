import {
	NavigationBarState,
	ToggleModalParams,
	ToggleTooltipParams
} from './types';

import { map } from 'nanostores';

export const navigationBar = map<NavigationBarState>({
	drawers: {
		user: false
	},
	tooltips: {
		user: false
	},
	modals: {
		login: false,
		register: false,
		resetPassword: false
	},
	status: 'idle'
});

export const openModal = ({ modal }: ToggleModalParams) => {
	const current = navigationBar.get();

	current.modals = {
		login: false,
		register: false,
		resetPassword: false
	};
	current.modals[modal] = !current.modals[modal];

	navigationBar.set({
		modals: current.modals,
		drawers: current.drawers,
		tooltips: current.tooltips,
		status: current.status
	});
};

export const closeModal = () => {
	const current = navigationBar.get();

	current.modals = {
		login: false,
		register: false,
		resetPassword: false
	};

	navigationBar.set({
		modals: current.modals,
		drawers: current.drawers,
		tooltips: current.tooltips,
		status: current.status
	});
};

export const openTooltip = ({ tooltip }: ToggleTooltipParams) => {
	const current = navigationBar.get();

	current.tooltips = {
		user: true
	};
	current.tooltips[tooltip] = !current.tooltips[tooltip];

	navigationBar.set({
		modals: current.modals,
		drawers: current.drawers,
		tooltips: current.tooltips,
		status: current.status
	});
};

export const closeTooltip = () => {
	const current = navigationBar.get();

	current.tooltips = {
		user: true
	};

	navigationBar.set({
		modals: current.modals,
		drawers: current.drawers,
		tooltips: current.tooltips,
		status: current.status
	});
};
