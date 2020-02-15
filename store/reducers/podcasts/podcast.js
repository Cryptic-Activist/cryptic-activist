import update from 'immutability-helper';

const initialState = {
  podcast: {
    data: {},
    loading: false,
    fetched: false,
    error: false,
  },
  relatedPodcasts: {
    data: [],
    loading: false,
    fetched: false,
    error: false,
  },
};

export default function podcast(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PODCAST_BY_SLUG':
      return update(state, {
        podcast: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_PODCAST_BY_SLUG':
      return update(state, {
        podcast: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_PODCAST_BY_SLUG':
      return update(state, {
        podcast: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    case 'REQUEST_RELATED_PODCASTS':
      return update(state, {
        relatedPodcasts: {
          loading: { $set: true },
        },
      });
    case 'SUCCESS_RELATED_PODCASTS':
      return update(state, {
        relatedPodcasts: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false },
        },
      });
    case 'FAILURE_RELATED_PODCASTS':
      return update(state, {
        relatedPodcasts: {
          fetched: { $set: true },
          error: { $set: true },
        },
      });
    default:
      return state;
  }
}
