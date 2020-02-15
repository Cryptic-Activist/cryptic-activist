import {
  put,
  call,
} from 'redux-saga/effects';

async function setUnfollowAuthorApi(userId, authorId) {
  const res = await fetch('http://localhost:5000/users/update/unfollow/author', {
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

export default function* asyncSetUnfollowAuthorApi(action) {
  try {
    const response = yield call(setUnfollowAuthorApi, action.payload.userId, action.payload.authorId);
    console.log('oh oby:', response);
    yield put({ type: 'SUCCESS_SET_UNFOLLOW_AUTHOR', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_SET_UNFOLLOW_AUTHOR' });
  }
}
