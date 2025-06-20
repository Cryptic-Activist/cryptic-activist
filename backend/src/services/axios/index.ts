import axios, { type AxiosRequestHeaders } from 'axios';

export const fetchGet = async (
  endpoint: string,
  headers?: AxiosRequestHeaders | any,
  timeout = 5000,
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
  body?: object,
  headers?: AxiosRequestHeaders | any,
) => {
  const response = await axios.post(endpoint, body, { headers });
  return response;
};

export const fetchPut = async (endpoint: string, params: object) => {
  const response = await axios.put(endpoint, params);
  return response;
};

export const fetchDelete = async (endpoint: string, params: object) => {
  const response = await axios.delete(endpoint, params);
  return response;
};
