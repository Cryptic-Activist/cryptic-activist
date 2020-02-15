/* eslint-disable import/prefer-default-export */
export function getPodcast(slug) {
  return {
    type: 'REQUEST_PODCAST_BY_SLUG',
    payload: {
      slug,
    },
  };
}
