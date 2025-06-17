import { BACKEND } from '@/constants';
import { UploadKYCFilesParams } from './types';
import axios from 'axios';
import { getBearerToken } from '@/utils';

export const uploadFiles = async (formData: FormData) => {
  try {
    const bearerToken = getBearerToken();
    formData.append('folder', 'evidences');

    const response = await axios.post(`${BACKEND}/upload/public`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: bearerToken,
      },
    });

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
