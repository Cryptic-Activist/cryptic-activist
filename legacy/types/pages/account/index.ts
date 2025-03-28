import { IUser, ISystemMessages } from "../../store/reducers";

export interface IAccount {
	user: IUser;
}

export interface IAccountSystemMessages {
	user: IUser;
	systemMessages: ISystemMessages;
}
