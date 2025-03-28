import { IApp, INavbar, IUser, IWallet } from 'types/store/reducers';

export type INavigationBar = {
	app: IApp;
	navigationBar: INavbar;
	user: IUser;
	wallet: IWallet;
};
