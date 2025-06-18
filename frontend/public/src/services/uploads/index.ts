import { UploadEvidenceFilesParams, UploadKYCFilesParams } from './types';

import { BACKEND } from '@/constants';
import axios from 'axios';
import { getBearerToken } from '@/utils';

export const uploadEvidenceFiles = async (
  params: UploadEvidenceFilesParams
) => {
  try {
    const bearerToken = getBearerToken();
    params.formData.append('folder', `/disputes/evidences/${params.tradeId}`);

    const response = await axios.post(
      `${BACKEND}/upload/public`,
      params.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: bearerToken,
        },
      }
    );

    if (response.status !== 200) {
      return {
        error: 'Unable to upload files',
      };
    }

    return response.data.files;
  } catch (err) {
    console.error('Upload error:', err);
    return {
      error: err,
    };
  }
};

export const uploadKYCFiles = async (params: UploadKYCFilesParams) => {
  try {
    const bearerToken = getBearerToken();
    params.formData.append('folder', `/kyc/${params.userId}`);

    const response = await axios.post(
      `${BACKEND}/upload/public`,
      params.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: bearerToken,
        },
      }
    );

    if (response.status !== 200) {
      return {
        error: 'Unable to upload files',
      };
    }

    return response.data.files;
  } catch (err) {
    console.error('Upload error:', err);
    return {
      error: err,
    };
  }
};
