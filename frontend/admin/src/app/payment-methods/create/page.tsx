'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input, Select, Submit } from '@/components/Form';
import { usePaymentMethodCategories, usePaymentMethods } from '@/hooks';
import { mapPaymentMethodCategories } from '@/utils/map/paymentMethodCategories';

import page from './page.module.scss';

const PaymentMethodsCreate = () => {
	const { paymentMethodCategories } = usePaymentMethodCategories(true);
	const {
		handleCreatePaymentMethod,
		handleSubmit,
		onSubmit,
		register,
		errors,
		values
	} = usePaymentMethods();
	const categories = mapPaymentMethodCategories(paymentMethodCategories.data);

	return (
		<div className={page.container}>
			<form
				action="POST"
				className={page.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					id="name"
					name="name"
					register={register}
					label="Name"
					placeholder="Name"
					required
					errorMessage={errors['name']?.message}
				/>
				<Select
					id="paymentMethodCategory.id"
					name="paymentMethodCategory.id"
					options={categories}
					register={register}
					label="Payment Method Category"
					required
					// @ts-ignore
					errorMessage={errors['paymentMethodCategory']?.id?.message}
				/>
				<Submit type="submit">Submit</Submit>
			</form>
		</div>
	);
};

export default PaymentMethodsCreate;
