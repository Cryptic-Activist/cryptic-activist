import { OFFER_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';

import { AxiosResponse } from 'axios';
import { FeedbacksParams } from './types';

const fetchFeedbacks = async ({
	userId,
}: FeedbacksParams): Promise<AxiosResponse> => {
	const response = await fetchGet(
		`${OFFER_API}/feedbacks/user/${userId}`
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const getFeedbacks = createAsyncThunk(
	'feedbacks/getFeedbacks',
	async ({ userId }: FeedbacksParams) => {
		try {
			const feedbacks = await fetchFeedbacks({ userId });

			if (!feedbacks) {
				return null;
			}

			return feedbacks.data.results;
		} catch (err) {
			return [];
		}
	}
);
