import { call, put } from 'redux-saga/effects';

async function getFeedbacksPagination(
  limit: number,
  skip: number,
  vendorId: BigInt,
  type: string,
) {
  const res = await fetch(
    `${process.env.OFFER_API}/feedbacks/pagination?limit=${limit}&skip=${skip}`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vendor_id: vendorId, type }),
    },
  );
  const data = await res.json();
  return data;
}

export default function* asyncGetFeedbacksPagination(action) {
  try {
    const feedbacks = yield call(
      getFeedbacksPagination,
      action.payload.limit,
      action.payload.skip,
      action.payload.vendorId,
      action.payload.type,
    );

    if (feedbacks.status_code === 200) {
      yield put({
        type: 'SUCCESS_GET_FEEDBACK_PAGINATION',
        payload: { data: feedbacks.results },
      });
    } else {
      yield put({
        type: 'FAILURE_GET_FEEDBACK_PAGINATION',
        payload: { data: feedbacks.errors },
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: 'FAILURE_GET_FEEDBACK_PAGINATION',
      payload: { data: err },
    });
  }
}
