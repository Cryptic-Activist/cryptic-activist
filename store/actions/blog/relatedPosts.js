/* eslint-disable import/prefer-default-export */
export function getRelatedPosts(category, slug) {
  return {
    type: 'REQUEST_GET_RELATED_POSTS',
    payload: {
      category,
      slug,
    },
  };
}
