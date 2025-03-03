import { USER_API } from '@constants/envs';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGet } from '@services/axios';

import { AxiosResponse } from 'axios';

import { GetVendorParams, GetVendorReturn } from './types';

const fetchVendor = async (
	username: string
): Promise<AxiosResponse<GetVendorReturn>> => {
	const response = await fetchGet(
		`${USER_API}/users/username/${username}`
	);

	if (response.status !== 200) {
		return null;
	}

	return response;
};

export const getVendor = createAsyncThunk(
	'vendor/getVendor',
	async (userData: GetVendorParams) => {
		try {
			const vendor = await fetchVendor(userData.username);

			if (!vendor) {
				return null;
			}

			return vendor.data.results;
		} catch (err) {}
	}
);
