import { getCookie, removeCookie, setCookie } from '@/utils';

import { BACKEND } from '@/constants';
import axios from 'axios';

const api = axios.create({
	baseURL: BACKEND
});

api.interceptors.request.use(
	(config) => {
		const token = getCookie('accessToken');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = getCookie('refreshToken');
			try {
				const response = await axios.post(`${BACKEND}/admins/auth/refresh`, {
					refreshToken
				});
				const { accessToken, refreshToken: newRefreshToken } = response.data;
				setCookie({
					name: 'accessToken',
					value: accessToken,
					expiresInHours: 1
				});
				setCookie({
					name: 'refreshToken',
					value: newRefreshToken,
					expiresInHours: 7
				});
				api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				return api(originalRequest);
			} catch (error) {
				removeCookie('accessToken');
				removeCookie('refreshToken');
				window.location.href = '/?login=1';
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

export default api;
