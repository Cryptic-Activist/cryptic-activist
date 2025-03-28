import { ChangeEvent, KeyboardEvent } from 'react';
import { IUser } from 'types/store/reducers';

export interface ILiveChat {
	id: string;
	room: string;
	user: IUser;
	vendor: any;
	paidSignal?: boolean;
	type: 'vendor' | 'trader';
}

export interface ILiveChatMessages {
	message: string;
}

export interface IInput {
	handleSendMessage: (e: KeyboardEvent) => void;
	changeInput: (e: ChangeEvent) => void;
	message: string;
}

export interface IBodyMessage {
	messages: {
		user: { names: { firstName: string; lastName: string } };
		message: string;
	}[];
	user: IUser;
}
