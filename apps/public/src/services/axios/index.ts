import axios, { AxiosRequestHeaders } from 'axios';

export type { AxiosResponse } from 'axios';

export const fetchGet = async (
  endpoint: string,
  headers?: AxiosRequestHeaders | any,
  timeout = 5000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = axios.get(endpoint, {
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchPost = async (
  endpoint: string,
  body: object,
  headers?: AxiosRequestHeaders | any,
  timeout = 5000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = axios.post(endpoint, body, {
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchPut = async (
  endpoint: string,
  params: object,
  timeout = 5000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = axios.put(endpoint, params, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDelete = async (
  endpoint: string,
  params: object,
  timeout = 5000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = axios.delete(endpoint, {
      ...params,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    throw error;
  }
};
