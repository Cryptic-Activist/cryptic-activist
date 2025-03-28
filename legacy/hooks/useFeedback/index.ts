import { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '@store/index';
import { getFeedbacks } from '@store/thunks/feedbacks';
import { UseFeedbacksProps } from './types';

import { Feedback } from '@store/reducers/feedbacks/types';

const useFeedback = ({ id }: UseFeedbacksProps) => {
	const dispatch = useAppDispatch();
	const { feedbacks } = useAppSelector((state) => state);

	const [feedbacksCount, setFeedbacksCount] = useState(0);
	const [positiveFeedbacks, setPositiveFeedbacks] = useState<Feedback[]>([]);
	const [negativeFeedbacks, setNegativeFeedbacks] = useState<Feedback[]>([]);
	const [positiveFeedbacksCount, setPositiveFeedbacksCount] = useState(0);
	const [negativeFeedbacksCount, setNegativeFeedbacksCount] = useState(0);

	useEffect(() => {
		if (id && id.length > 0) {
			dispatch(getFeedbacks({ userId: id }));
		}
	}, [id]);

	const getPositiveFeedbacks = () => {
		const filtered = feedbacks.data.filter(
			(feedback) => feedback.type === 'positive'
		);

		setPositiveFeedbacks(filtered);
		setPositiveFeedbacksCount(filtered.length);
	};

	const getNegativeFeedbacks = () => {
		const filtered = feedbacks.data.filter(
			(feedback) => feedback.type === 'negative'
		);

		setNegativeFeedbacks(filtered);
		setNegativeFeedbacksCount(filtered.length);
	};

	const getFeedbackCount = () => {
		setFeedbacksCount(feedbacks.data.length);
	};

	useEffect(() => {
		getPositiveFeedbacks();
		getNegativeFeedbacks();
		getFeedbackCount();
	}, [feedbacks.data]);

	return {
		feedbacks,
		feedbacksCount,
		positiveFeedbacks,
		positiveFeedbacksCount,
		negativeFeedbacks,
		negativeFeedbacksCount,
	};
};

export default useFeedback;
