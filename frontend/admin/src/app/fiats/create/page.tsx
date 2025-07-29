'use client';

import { Input, Submit } from '@/components/form';

import Button from '@/components/Button';
import React from 'react';
import page from './page.module.scss';
import useFiats from '@/hooks/useFiats';
import { useForm } from 'react-hook-form';
import { withAuth } from '@/hoc/withAuth';

const UsersCreatePage = () => {
	const { register, handleSubmit } = useForm();
	const { handleCreateFiat, handleCreateAllFiats } = useFiats(false);

	const onSubmit = (data: any) => {
		handleCreateFiat(data);
	};

	const createAllFiats = () => {
		handleCreateAllFiats();
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
					name="name"
					register={register}
					label="Name"
					placeholder="Name"
					required
				/>
				<Input
					id="symbol"
					name="symbol"
					register={register}
					label="Symbol"
					placeholder="Symbol"
					required
				/>
				<Submit type="submit">Submit</Submit>
			</form>
			<Button onClick={createAllFiats}>Create All Fiats</Button>
		</div>
	);
};

export default withAuth(UsersCreatePage, {
	roles: ['SUPER_ADMIN']
});
