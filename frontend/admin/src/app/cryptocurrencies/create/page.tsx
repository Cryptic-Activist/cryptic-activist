'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { Input, Submit } from '@/components/Form';
import useCryptocurrencies from '@/hooks/useCryptocurrencies';

import page from './page.module.scss';

const CryptocurrenciesCreatePage = () => {
	const { register, handleSubmit } = useForm();
	const { handleCreateAllCryptocurrencies, handleCreateCryptocurrency } =
		useCryptocurrencies();

	const onSubmit = (data: any) => {
		handleCreateCryptocurrency(data);
	};

	const createAllCryptocurrencies = () => {
		handleCreateAllCryptocurrencies();
	};

	return (
		<div className={page.container}>
			<form
				action="POST"
				className={page.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					id="coingeckoId"
					name="coingeckoId"
					register={register}
					label="Coingecko Id"
					placeholder="Coingecko Id"
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
				<Input
					id="name"
					name="name"
					register={register}
					label="Name"
					placeholder="Name"
					required
				/>
				<Submit type="submit">Submit</Submit>
			</form>
			<Button onClick={createAllCryptocurrencies}>
				Create All Cryptocurrencies
			</Button>
		</div>
	);
};

export default CryptocurrenciesCreatePage;
