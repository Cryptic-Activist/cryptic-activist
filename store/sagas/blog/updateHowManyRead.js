import {
  put,
  call,
} from 'redux-saga/effects';

async function updateHowManyReadApi(post) {
  const response = fetch(
    'http://localhost:5000/blog/update/post/how-many-read',
    {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    },
  );
  const data = response.json();
  return data;
}

export default function* asyncUpdateHowManyReadApi(action) {
  try {
    yield call(updateHowManyReadApi, action.payload.post);

    yield put({ type: 'SUCCESS_UPDATE_HOW_MANY_READ' });
  } catch (err) {
    yield put({ type: 'SUCCESS_UPDATE_HOW_MANY_READ' });
  }
}
