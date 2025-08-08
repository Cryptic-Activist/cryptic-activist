'use client';

import { Input, Select, Submit } from '@/components/form';
import { usePaymentMethodCategories, usePaymentMethods } from '@/hooks';

import { mapPaymentMethodCategories } from '@/utils/map/paymentMethodCategories';
import page from './page.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { withAuth } from '@/hoc/withAuth';

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
					errorMessage={errors['paymentMethodCategory']?.id?.message}
				/>
				<Submit type="submit">Submit</Submit>
			</form>
		</div>
	);
};

export default withAuth(PaymentMethodsCreate, {
	roles: ['SUPER_ADMIN']
});
