/* eslint-disable import/prefer-default-export */
export function getGetRelatedPodcasts(category, slug) {
  return {
    type: 'REQUEST_RELATED_PODCASTS',
    payload: {
      category,
      slug,
    },
  };
}
