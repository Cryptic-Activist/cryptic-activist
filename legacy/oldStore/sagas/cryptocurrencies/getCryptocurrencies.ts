import { call, put } from 'redux-saga/effects';

async function getCryptocurrencies() {
  const res = await fetch(
    `${process.env.CRYPTOCURRENCY_API}/cryptocurrencies`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.json();
  return data;
}

export default function* asyncGetCryptocurrencies() {
  try {
    const cryptocurrencies = yield call(getCryptocurrencies);

    if (cryptocurrencies.status_code === 200) {
      yield put({
        type: 'SUCCESS_GET_CRYPTOCURRENCIES',
        payload: { data: cryptocurrencies.results },
      });
    } else {
      yield put({
        type: 'FAILURE_GET_CRYPTOCURRENCIES',
        payload: { data: cryptocurrencies.errors },
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: 'FAILURE_GET_CRYPTOCURRENCIES',
      payload: { data: err },
    });
  }
}
