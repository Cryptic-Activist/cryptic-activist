import { User } from '../user/types';

export type Feedback = {
	vendor: User;
	trader: User;
	offer: any;
	message: string;
	type: 'positive' | 'negative';
};

export type FeedbacksState = {
	data: Feedback[];
	loading: boolean;
	fetched: boolean;
	errors: string[];
};
