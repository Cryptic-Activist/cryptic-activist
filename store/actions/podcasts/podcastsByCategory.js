/* eslint-disable import/prefer-default-export */
export function getPodcastsByCategory(category) {
  return {
    type: 'REQUEST_PODCASTS_BY_CATEGORY',
    payload: {
      category,
    },
  };
}
