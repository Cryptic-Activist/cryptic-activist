/* eslint-disable import/prefer-default-export */
export function getPostsByCategory(category) {
  return {
    type: 'REQUEST_POSTS_BY_CATEGORY',
    payload: {
      category,
    },
  };
}
