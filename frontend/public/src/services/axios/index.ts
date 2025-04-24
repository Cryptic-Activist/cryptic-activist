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
    const response = await axios.get(endpoint, {
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
    const response = await axios.post(endpoint, body, {
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
  body: object,
  headers?: AxiosRequestHeaders | any,
  timeout = 5000
) => {
  console.log({ headers });
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await axios.put(endpoint, body, {
      headers,
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
    const response = await axios.delete(endpoint, {
      ...params,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    return response;
  } catch (error) {
    throw error;
  }
};
