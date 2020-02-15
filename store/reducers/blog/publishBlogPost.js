import update from 'immutability-helper';

const initialState = {
  data: {},
};

export default function publishBlogPostCover(state = initialState, action) {
  switch (action.type) {
    case 'INITIAL_UPLOAD_COVER':
      return {
        ...state,
        data: action.payload.data,
      };
    case 'UPDATE_UPLOAD_COVER_PROCESS':
      return update(state, {
        data: {
          progress: { $set: action.payload.progress },
        },
      });
    case 'FINISH_UPLOAD_COVER_PROCESS':
      return update(state, {
        data: {
          id: { $set: action.payload.data.id },
          uploaded: { $set: action.payload.data.uploaded },
          url: { $set: action.payload.data.url },
        },
      });
    case 'DELETE_UPLOADED_COVER':
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
}
