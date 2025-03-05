import { IApp } from 'types/store/reducers';

export interface IRegistrationForm {
	app: IApp;
}

export interface IRegisterUserObj {
	names: {
		firstName: string;
		lastName: string;
	};
	username: string;
	password: string;
	password2: string;
}

export interface IRegisterUserResponse {
	status_code: number;
	results: {
		private_keys: string[];
	};
	errors: {
		message: string;
		instancePath: string;
	}[];
}
