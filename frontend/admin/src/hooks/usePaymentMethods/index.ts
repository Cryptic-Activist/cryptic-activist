'use client';

import { CreatePaymentMethodParams, UsePaymentMethodsParams } from './types';
import { ZodPaymentMethod, paymentMethodResolver } from './zod';
import {
	createPaymentMethod,
	listPaymentMethod,
	paymentMethodCategories,
	paymentMethods
} from '@/stores';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@nanostores/react';

const UsePaymentMethods = (fetchData?: UsePaymentMethodsParams) => {
	const $paymentMethods = useStore(paymentMethods);
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors }
	} = useForm({
		resolver: paymentMethodResolver
	});

	const handleCreatePaymentMethod = async (data: CreatePaymentMethodParams) => {
		await createPaymentMethod(data);
	};

	const handleListPaymentMethod = async () => {
		await listPaymentMethod();
	};

	const onSubmit = (data: any) => {
		handleCreatePaymentMethod(data);
		setValue('name', '');
		setValue('paymentMethodCategory.id', '');
	};

	useEffect(() => {
		if (fetchData) {
			handleListPaymentMethod();
		}
	}, [fetchData]);

	return {
		handleCreatePaymentMethod,
		handleListPaymentMethod,
		paymentMethods: $paymentMethods,
		register,
		handleSubmit,
		onSubmit,
		errors,
		values: {
			name: getValues('name'),
			paymentMethodCategory: {
				id: getValues('paymentMethodCategory.id')
			}
		}
	};
};

export default UsePaymentMethods;
