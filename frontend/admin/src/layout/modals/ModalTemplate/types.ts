import type { ReactNode } from 'react';

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

export type ModalTemplateProps = {
	children: ReactNode;
	heading: string;
	type: ModalType;
	success?: boolean;
	successMessage?: string;
	allowClose: boolean;
};
