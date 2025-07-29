'use client';

import { Input, Submit } from '@/components/form';

import page from './page.module.scss';
import { useForm } from 'react-hook-form';
import { usePaymentMethodCategories } from '@/hooks';
import { withAuth } from '@/hoc/withAuth';

const PaymentMethodCategoriesPage = () => {
	const { register, handleSubmit } = useForm();
	const { handleCreatePaymentMethodCategory } = usePaymentMethodCategories();

	const onSubmit = (data: any) => {
		const { name } = data.category;
		handleCreatePaymentMethodCategory({ name });
	};

	return (
		<div className={page.container}>
			<form
				action="POST"
				className={page.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					id="name"
					name="category.name"
					register={register}
					label="Category Name"
					required
				/>
				<Submit type="submit">Submit</Submit>
			</form>
		</div>
	);
};

export default withAuth(PaymentMethodCategoriesPage, {
	roles: ['SUPER_ADMIN']
});
