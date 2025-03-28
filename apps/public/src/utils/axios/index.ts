import { GetQueryParams } from './types';

export const getQueries = (queryObject: GetQueryParams) => {
	let queryString = '?';
	const lastItem = Object.entries(queryObject).length - 1;

	Object.entries(queryObject).forEach((query, index) => {
		if (query[1] !== undefined) {
			queryString += `${query[0]}=${query[1]}`;
			if (index !== lastItem) {
				queryString += '&';
			}
		}
	});

	return queryString;
};
