import { IApp, INavbar, IUser, IWallet } from 'types/store/reducers';

export interface IWalletModal {
	app: IApp;
	navigationBar: INavbar;
	user: IUser;
	wallet: IWallet;
}
