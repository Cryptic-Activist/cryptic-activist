/* eslint-disable import/prefer-default-export */
export function initialUploadCoverProcess(data) {
  return {
    type: 'INITIAL_UPLOAD_COVER',
    payload: {
      data,
    },
  };
}

export function updateUploadCoverProcess(progress) {
  return {
    type: 'UPDATE_UPLOAD_COVER_PROCESS',
    payload: {
      progress,
    },
  };
}

export function finishUploadCoverProcess(data) {
  return {
    type: 'FINISH_UPLOAD_COVER_PROCESS',
    payload: {
      data,
    },
  };
}

export function deleteUploadedCover() {
  return {
    type: 'DELETE_UPLOADED_COVER',
  };
}

export function initialUploadAudioFileProcess(data) {
  return {
    type: 'INITIAL_UPLOAD_AUDIO_FILE',
    payload: {
      data,
    },
  };
}

export function updateUploadAudioFileProcess(progress) {
  return {
    type: 'UPDATE_UPLOAD_AUDIO_FILE_PROCESS',
    payload: {
      progress,
    },
  };
}

export function finishUploadAudioFileProcess(data) {
  return {
    type: 'FINISH_UPLOAD_AUDIO_FILE_PROCESS',
    payload: {
      data,
    },
  };
}

export function deleteUploadedAudioFile() {
  return {
    type: 'DELETE_UPLOADED_AUDIO_FILE',
  };
}
