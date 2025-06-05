'use client';

import { Input, Submit } from '@/components/form';

import React from 'react';
import page from './page.module.scss';
import { useForm } from 'react-hook-form';
import useUsers from '@/hooks/useUsers';

const UsersCreatePage = () => {
	const { register, handleSubmit } = useForm();
	const { handleCreateUser } = useUsers();

	const onSubmit = (data: any) => {
		handleCreateUser(data);
	};

	return (
		<div className={page.container}>
			<form
				action="POST"
				className={page.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					id="names.firstName"
					name="names.firstName"
					register={register}
					label="First Name"
					placeholder="First Name"
					required
				/>
				<Input
					id="names.lastName"
					name="names.lastName"
					register={register}
					label="Last Name"
					placeholder="Last Name"
					required
				/>
				<Input
					id="username"
					name="username"
					register={register}
					label="Username"
					placeholder="Username"
					required
				/>
				<Input
					id="Password"
					name="password"
					register={register}
					label="Password"
					placeholder="Password"
					type="password"
					required
				/>
				<Input
					id="Password2"
					name="password2"
					register={register}
					label="Confirm Password"
					placeholder="Confirm Password"
					type="password"
					required
				/>
				<Submit type="submit">Submit</Submit>
			</form>
		</div>
	);
};

export default UsersCreatePage;
