import update from 'immutability-helper';

const initialState = {
  cover: {
    data: {},
  },
  audioFile: {
    data: {},
  },
};

export default function uploadedPodcast(state = initialState, action) {
  switch (action.type) {
    case 'INITIAL_UPLOAD_COVER':
      return {
        ...state,
        cover: {
          data: action.payload.data,
        },
      };
    case 'UPDATE_UPLOAD_COVER_PROCESS':
      return update(state, {
        cover: {
          data: {
            progress: { $set: action.payload.progress },
          },
        },
      });
    case 'FINISH_UPLOAD_COVER_PROCESS':
      return update(state, {
        cover: {
          data: {
            id: { $set: action.payload.data.id },
            uploaded: { $set: action.payload.data.uploaded },
            url: { $set: action.payload.data.url },
          },
        },
      });
    case 'DELETE_UPLOADED_COVER':
      return {
        ...state,
        cover: {
          data: {},
        },
      };
    case 'INITIAL_UPLOAD_AUDIO_FILE':
      return {
        ...state,
        audioFile: {
          data: action.payload.data,
        },
      };
    case 'UPDATE_UPLOAD_AUDIO_FILE_PROCESS':
      return update(state, {
        audioFile: {
          data: {
            progress: { $set: action.payload.progress },
          },
        },
      });
    case 'FINISH_UPLOAD_AUDIO_FILE_PROCESS':
      return update(state, {
        audioFile: {
          data: {
            id: { $set: action.payload.data.id },
            uploaded: { $set: action.payload.data.uploaded },
            url: { $set: action.payload.data.url },
          },
        },
      });
    case 'DELETE_UPLOADED_AUDIO_FILE':
      return {
        ...state,
        audioFile: {
          data: {},
        },
      };
    default:
      return state;
  }
}
