import {
  put,
  call,
} from 'redux-saga/effects';

async function postCommentApi(userId, postId, comment) {
  const res = await fetch('http://localhost:5000/blog/contributor/comment/post',
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, postId, content: comment }),
    });
  const data = await res.json(res);
  return data;
}

export default function* asyncPostCommentApi(action) {
  try {
    console.log('action:', action);
    const response = yield call(postCommentApi,
      action.payload.userId,
      action.payload.postId,
      action.payload.comment);

    yield put({ type: 'SUCCESS_POST_COMMENT', payload: { data: response } });
  } catch (err) {
    console.log('err', err);
    yield put({ type: 'FAILURE_POST_COMMENT' });
  }
}
