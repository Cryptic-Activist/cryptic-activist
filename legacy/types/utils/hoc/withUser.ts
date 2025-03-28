import { IUser } from 'types/store/reducers';
import { ReactChild } from 'react';

export interface IWithUser {
	user: IUser;
	children: ReactChild | ReactChild[];
}
