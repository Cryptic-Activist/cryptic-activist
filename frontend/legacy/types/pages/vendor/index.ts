import { IUserResponse } from 'types/store/reducers/response';
import { NextPageContext } from 'next';
import { IUser } from '../../store/reducers';

export interface IVendor extends NextPageContext {
	errors?: string[];
	vendor?: IUserResponse;
}

export interface IVendorObjSSR {
	redirect?: {
		permanent: boolean;
		destination: string;
	};
	props?: {
		errors?: string[];
		vendor?: IUser;
	};
}
