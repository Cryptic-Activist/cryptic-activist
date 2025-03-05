export function getOffers(
	user_id: string,
	payment_method_type: string
): {
	type: 'REQUEST_GET_OFFERS';
	payload: {
		user_id: string;
		payment_method_type: string;
	};
} {
	return {
		type: 'REQUEST_GET_OFFERS',
		payload: {
			user_id,
			payment_method_type,
		},
	};
}

export function getOffersPagination(
	limit: number,
	skip: number,
	payment_method_type: 'buy' | 'sell',
	query: object
): {
	type: 'REQUEST_GET_OFFERS_PAGINATION';
	payload: {
		limit: number;
		skip: number;
		payment_method_type: string;
		query: object;
	};
} {
	return {
		type: 'REQUEST_GET_OFFERS_PAGINATION',
		payload: {
			limit,
			skip,
			payment_method_type,
			query,
		},
	};
}
