export type ModalType =
	| 'loginForm'
	| 'registerForm'
	| 'resetPasswordForm'
	| 'userModal'
	| 'userDrawer'
	| 'verifyAccount'
	| 'walletModal'
	| 'privateKeys'
	| 'cryptocurrenciesModal'
	| 'selectBlockchain'
	| 'fiatsModal'
	| 'paymentMethodsModal';

export interface IModalTemplate {
	children: any;
	heading: string;
	type: ModalType;
	success?: boolean;
	successMessage?: string;
	allowClose: boolean;
	dataTestId?: string;
}
