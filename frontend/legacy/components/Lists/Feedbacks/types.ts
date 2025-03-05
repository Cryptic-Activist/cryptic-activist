import { Feedback } from '@store/reducers/feedbacks/types';
import { IApp } from 'types/store/reducers';

export type IFeedbacksList = {
	vendorId: string;
	feedbacksCount: number;
	positiveFeedbacks: Feedback[];
	negativeFeedbacks: Feedback[];
	positiveFeedbackCount: number;
	negativeFeedbackCount: number;
};

export type IFeedback = {
	app: IApp;
};

export type SelectTypeParams = 'buy' | 'sell';

export type FeedbackType = 'positive' | 'negative';
