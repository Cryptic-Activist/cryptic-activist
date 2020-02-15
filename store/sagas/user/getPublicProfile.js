import {
  put,
  call,
} from 'redux-saga/effects';

async function getPublicProfileApi(user) {
  const res = await fetch(`http://localhost:5000/users/public-profile/${user}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

export default function* asyncGetPublicProfileApi(action) {
  console.log('asyncGetPublicProfileApi action:', action.payload.user);
  try {
    const response = yield call(getPublicProfileApi, action.payload.user);

    console.log('response:', response);
    yield put({ type: 'SUCCESS_GET_PUBLIC_PROFILE', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_PUBLIC_PROFILE' });
  }
}
