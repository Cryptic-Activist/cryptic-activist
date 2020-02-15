import {
  put,
  call,
} from 'redux-saga/effects';

async function setFollowAuthorApi(userId, authorId) {
  const res = await fetch('http://localhost:5000/users/update/follow/author', {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      authorId,
    }),
  });
  const data = await res.json();
  return data;
}

export default function* asyncSetFollowAuthorApi(action) {
  try {
    const response = yield call(setFollowAuthorApi, action.payload.userId, action.payload.authorId);
    console.log('response: nigga:', response);
    yield put({ type: 'SUCCESS_SET_FOLLOW_AUTHOR', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_SET_FOLLOW_AUTHOR' });
  }
}
