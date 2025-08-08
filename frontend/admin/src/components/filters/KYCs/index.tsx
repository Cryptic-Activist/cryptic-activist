'use client';

import { Input, Select } from '@/components/form';

import Button from '@/components/Button';
import React from 'react';
import styles from './index.module.scss';
import { useKYCs } from '@/hooks';

const KYCsFilters = () => {
	const {
		handleSubmit,
		register,
		onSubmitFilters,
		onResetFilters,
		$kycs,
		statusesQuery
	} = useKYCs();
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Filter KYC Applications</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitFilters)}>
				<Input
					id="username"
					name="username"
					register={register}
					label="Username"
					type="text"
					placeholder="Username"
				/>
				<Select
					register={register}
					name="status"
					id="status"
					label="Status"
					options={[
						{ label: 'All Status', value: '' }
						// ...(statusesQuery.data
						// 	? statusesQuery.data?.map((filter: any) => ({
						// 			label: formatEnum(filter),
						// 			value: filter
						// 	  }))
						// 	: [])
					]}
				/>
				<Button
					type="submit"
					size={16}
					padding="1rem"
					className={styles.submit}
				>
					Apply Filters
				</Button>
				<button
					className={styles.resetBtn}
					type="button"
					onClick={onResetFilters}
				>
					Reset Filters
				</button>
			</form>
		</div>
	);
};

export default KYCsFilters;
