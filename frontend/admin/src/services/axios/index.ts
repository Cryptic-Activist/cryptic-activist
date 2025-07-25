import axios, { type AxiosRequestHeaders } from 'axios';

export const fetchGet = async (
	endpoint: string,
	headers?: AxiosRequestHeaders | any
) => {
	const response = await axios.get(endpoint, { headers });
	return response;
};

export const fetchPost = async (
	endpoint: string,
	body?: object,
	headers?: AxiosRequestHeaders | any
) => {
	const response = await axios.post(endpoint, body, { headers });
	return response;
};

export const fetchPut = async (
	endpoint: string,
	body?: object,
	headers?: AxiosRequestHeaders | any
) => {
	const response = await axios.put(endpoint, body, { headers });
	return response;
};

export const fetchDelete = async (
	endpoint: string,
	headers?: AxiosRequestHeaders | any
) => {
	const response = await axios.delete(endpoint, { headers });
	return response;
};
