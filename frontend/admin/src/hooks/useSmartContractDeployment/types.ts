export type DeploymentFormData = {
	type: '' | 'Escrow' | 'Premium';
	chainId: string;
	defaultFeeRate: number;
	defaultProfitMargin: number;
	platformWallet: string;
};
