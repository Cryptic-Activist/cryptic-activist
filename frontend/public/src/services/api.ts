import { getCookie, removeCookie, setCookie } from '@/utils';

import { BACKEND } from '@/constants';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: BACKEND,
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

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: Error | null, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise(function(resolve, reject) {
					failedQueue.push({ resolve, reject });
				}).then(token => {
					if(originalRequest.headers) {
						originalRequest.headers['Authorization'] = 'Bearer ' + token;
					}
					return api(originalRequest);
				}).catch(err => {
					return Promise.reject(err);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			const refreshToken = getCookie('refreshToken');
			if (!refreshToken) {
				isRefreshing = false;
				removeCookie('accessToken');
				removeCookie('refreshToken');
				window.location.href = '/?login=1';
				return Promise.reject(error);
			}

			return new Promise(function (resolve, reject) {
				axios.post(`${BACKEND}/users/auth/refresh`, { refreshToken })
					.then(response => {
						const { accessToken, refreshToken: newRefreshToken } = response.data;
						setCookie({ name: 'accessToken', value: accessToken, expiresInHours: 1 });
						setCookie({ name: 'refreshToken', value: newRefreshToken, expiresInHours: 7 });
						api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
						if(originalRequest.headers) {
							originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
						}
						processQueue(null, accessToken);
						resolve(api(originalRequest));
					})
					.catch((err) => {
						processQueue(err, null);
						removeCookie('accessToken');
						removeCookie('refreshToken');
						window.location.href = '/?login=1';
						reject(err);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}
    return Promise.reject(error);
  }
);

export default api;
