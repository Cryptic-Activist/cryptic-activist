import { call, put } from 'redux-saga/effects';

async function getOffer(offerId) {
  const res = await fetch(
    `${process.env.OFFER_API}/offers/${offerId}`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
  const data = await res.json();
  return data;
}

export default function* asyncGetOffer(action) {
  try {
    const offer = yield call(getOffer, action.payload.offerId);

    if (offer.status_code === 200) {
      yield put({
        type: 'SUCCESS_GET_OFFER',
        payload: { data: offer.results },
      });
    } else {
      yield put({
        type: 'FAILURE_GET_OFFER',
        payload: { data: offer.errors },
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: 'FAILURE_GET_OFFER',
      payload: { data: err },
    });
  }
}
