import axios, { AxiosRequestHeaders } from 'axios';

export const fetchGet = async (
	endpoint: string,
	headers?: AxiosRequestHeaders | any
) => {
	try {
		const response = axios.get(endpoint, { headers });
		return response;
	} catch (error) {
		throw error;
	}
};

export const fetchPost = async (
	endpoint: string,
	body: object,
	headers?: AxiosRequestHeaders | any
) => {
	try {
		const response = axios.post(endpoint, body, { headers });
		return response;
	} catch (error) {
		throw error;
	}
};

export const fetchPut = async (endpoint: string, params: object) => {
	try {
		const response = axios.put(endpoint, params);
		return response;
	} catch (error) {
		throw error;
	}
};

export const fetchDelete = async (endpoint: string, params: object) => {
	try {
		const response = axios.delete(endpoint, params);
		return response;
	} catch (error) {
		throw error;
	}
};
