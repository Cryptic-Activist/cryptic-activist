/* eslint-disable import/prefer-default-export */
export function getPostsByTag(tag) {
  return {
    type: 'REQUEST_POSTS_BY_TAG',
    payload: {
      tag,
    },
  };
}
