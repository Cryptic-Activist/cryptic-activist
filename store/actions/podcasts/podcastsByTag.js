/* eslint-disable import/prefer-default-export */
export function getPodcastsByTag(tag) {
  return {
    type: 'REQUEST_PODCASTS_BY_TAG',
    payload: {
      tag,
    },
  };
}
