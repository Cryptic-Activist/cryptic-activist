import type {
	CreatePaymentMethodCategoryParams,
	PaymentMethodCategoryState
} from './types';
import { fetchGet, fetchPost } from '@/services/axios';

import { BACKEND } from '@/constants/envs';
import { map } from 'nanostores';

export const paymentMethodCategories = map<PaymentMethodCategoryState>({
	data: [],
	loading: false,
	fetched: false,
	errors: []
});

const fetchCreatePaymentMethodCategory = async (
	data: CreatePaymentMethodCategoryParams
) => {
	const response = await fetchPost(
		`${BACKEND}/offers/payment-method/categories/create`,
		data
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const fetchListPaymentMethodCategories = async () => {
	const response = await fetchGet(
		`${BACKEND}/offers/payment-method/categories`
	);

	if (response.status !== 200) {
		return null;
	}

	return response.data;
};

const setter = (
	data: any[],
	loading: boolean,
	fetched: boolean,
	errors: string[]
) => {
	paymentMethodCategories.set({
		data,
		loading,
		fetched,
		errors
	});
};

export const createPaymentMethodCategory = async (
	dataParams: CreatePaymentMethodCategoryParams
) => {
	setter([], true, false, []);
	const created = await fetchCreatePaymentMethodCategory(dataParams);

	if (!created) {
		setter([], false, true, []);
		return null;
	}

	setter([], false, true, []);
};

export const listPaymentMethodCategories = async () => {
	setter([], true, false, []);
	const list = await fetchListPaymentMethodCategories();

	if (!list) {
		setter([], false, true, []);
		return null;
	}

	setter(list, false, true, []);
};
