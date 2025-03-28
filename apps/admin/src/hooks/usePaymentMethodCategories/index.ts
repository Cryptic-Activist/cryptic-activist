'use client';

import {
	CreatePaymentMethodCategoryParams,
	UsePaymentMethodCategoriesParams
} from './types';
import {
	createPaymentMethodCategory,
	listPaymentMethodCategories,
	paymentMethodCategories
} from '@/stores';

import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

const UsePaymentMethodCategories = (
	fetchData?: UsePaymentMethodCategoriesParams
) => {
	const $paymentMethodCategories = useStore(paymentMethodCategories);

	const handleCreatePaymentMethodCategory = async (
		data: CreatePaymentMethodCategoryParams
	) => {
		await createPaymentMethodCategory(data);
	};

	const handleListPaymentMethodCategories = async () => {
		await listPaymentMethodCategories();
	};

	useEffect(() => {
		if (fetchData) {
			handleListPaymentMethodCategories();
		}
	}, [fetchData]);

	return {
		handleCreatePaymentMethodCategory,
		handleListPaymentMethodCategories,
		paymentMethodCategories: $paymentMethodCategories
	};
};

export default UsePaymentMethodCategories;
