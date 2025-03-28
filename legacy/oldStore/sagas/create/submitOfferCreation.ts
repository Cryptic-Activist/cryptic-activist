import { ICreate } from 'types/store/reducers';
import { call, put } from 'redux-saga/effects';

const submitOfferCreation = async (create: ICreate) => {
	const response = await fetch(
		`${process.env.OFFER_API}/offer/create`,
		{
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify(create),
		}
	);

	const data = await response.json();
	return data;
};

export default function* asyncSubmitOfferCreation(action) {
	try {
		const submit = yield call(submitOfferCreation, action.payload.createOffer);

		if (submit.status_code === 200) {
			yield put({
				type: 'SUCCESS_SUBMIT_OFFER',
			});
		} else {
			yield put({
				type: 'FAILURE_SUBMIT_OFFER',
				payload: { data: submit.errors },
			});
		}
	} catch (err) {
		console.error(err);
		yield put({
			type: 'FAILURE_SUBMIT_OFFER',
			payload: { data: [err.message] },
		});
	}
}
