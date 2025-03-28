'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
	createPaymentMethod,
	listPaymentMethod,
	paymentMethodCategories,
	paymentMethods
} from '@/stores';
import { useStore } from '@nanostores/react';

import { CreatePaymentMethodParams, UsePaymentMethodsParams } from './types';
import { ZodPaymentMethod, paymentMethodResolver } from './zod';

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
		console.log({ data });
		handleCreatePaymentMethod(data);
		setValue('name', '');
		setValue('paymentMethodCategory.id', '');
	};

	console.log(getValues());

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
