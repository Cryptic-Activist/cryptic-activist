import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';

import { Feedback } from '@store/reducers/feedbacks/types';
import { getCurrentOffers as getCurrentOffersThunk } from '@store/thunks/currentOffers';
import { getFeedbacks as getFeedbacksThunk } from '@store/thunks/feedbacks';
import { UseProfileProps } from './types';

const useProfile = (userId: UseProfileProps) => {
	const dispatch = useAppDispatch();
	const { feedbacks, currentOffers, app } = useAppSelector((state) => state);

	const [feedbacksCount, setFeedbacksCount] = useState(0);
	const [positiveFeedbacks, setPositiveFeedbacks] = useState<Feedback[]>([]);
	const [negativeFeedbacks, setNegativeFeedbacks] = useState<Feedback[]>([]);
	const [positiveFeedbacksCount, setPositiveFeedbackCount] = useState(0);
	const [negativeFeedbacksCount, setNegativeFeedbackCount] = useState(0);

	const getFeedbacks = async () => {
		dispatch(getFeedbacksThunk({ userId }));
	};

	const getCurrentOffers = async () => {
		dispatch(getCurrentOffersThunk({ type: app.type, userId: userId }));
	};

	const countFeedbacks = () => {
		const allFeedbacksCount = feedbacks.data.length;
		const allPositiveFeedbacks = feedbacks.data.filter(
			(feedback) => feedback.type == 'positive'
		);
		const allNegativeFeedbacks = feedbacks.data.filter(
			(feedback) => feedback.type == 'negative'
		);
		const positiveFeedbacksCount = allPositiveFeedbacks.length;
		const negativeFeedbacksCount = allNegativeFeedbacks.length;

		setFeedbacksCount(allFeedbacksCount);
		setPositiveFeedbacks(allPositiveFeedbacks);
		setNegativeFeedbacks(allNegativeFeedbacks);
		setPositiveFeedbackCount(positiveFeedbacksCount);
		setNegativeFeedbackCount(negativeFeedbacksCount);
	};

	useEffect(() => {
		if (userId) {
			getFeedbacks();
			getCurrentOffers();
		}
	}, [userId]);

	useEffect(() => {
		countFeedbacks();
	}, [feedbacks]);

	return {
		feedbacks,
		currentOffers,
		feedbacksCount,
		positiveFeedbacks,
		negativeFeedbacks,
		positiveFeedbacksCount,
		negativeFeedbacksCount,
	};
};

export default useProfile;
