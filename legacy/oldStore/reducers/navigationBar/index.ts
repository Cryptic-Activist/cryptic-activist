import update from "immutability-helper";

const initialState = {
	loginForm: false,
	registerForm: false,
	resetPasswordForm: false,
	userModal: false,
	userDrawer: false,
	verifyAccount: false,
	walletModal: false,
	privateKeys: false,
	cryptocurrenciesModal: false,
	fiatsModal: false,
	paymentMethodsModal: false,
	selectBlockchain: false,
	isLoading: false,
};

export default function navigationBar(state = initialState, action) {
	switch (action.type) {
		case "TOGGLE_MODAL":
			return update(state, {
				loginForm: { $set: false },
				registerForm: { $set: false },
				resetPasswordForm: { $set: false },
				userModal: { $set: false },
				userDrawer: { $set: false },
				verifyAccount: { $set: false },
				walletModal: { $set: false },
				privateKeys: { $set: false },
				cryptocurrenciesModal: { $set: false },
				fiatsModal: { $set: false },
				paymentMethodsModal: { $set: false },
				selectBlockchain: { $set: false },
				[action.payload.modal]: { $set: !state[action.payload.modal] },
			});
		case "CLOSE_ALL_MODALS":
			return update(state, {
				loginForm: { $set: false },
				registerForm: { $set: false },
				resetPasswordForm: { $set: false },
				userModal: { $set: false },
				userDrawer: { $set: false },
				verifyAccount: { $set: false },
				walletModal: { $set: false },
				privateKeys: { $set: false },
				cryptocurrenciesModal: { $set: false },
				fiatsModal: { $set: false },
				paymentMethodsModal: { $set: false },
				selectBlockchain: { $set: false },
			});
		case "TOGGLE_LOADINNG":
			return update(state, {
				isLoading: { $set: !state.isLoading },
			});
		default:
			return state;
	}
}
