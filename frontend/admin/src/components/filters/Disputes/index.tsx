'use client';

import type { Input, Select } from '@/components/form';

import Button from '@/components/Button';
import React from 'react';
import { formatEnum } from '@/utils';
import styles from './index.module.scss';
import { useDisputes } from '@/hooks';

const DisputesFilters = () => {
	const {
		handleSubmit,
		register,
		onSubmitFilters,
		onResetFilters,
		$disputes,
		typesQuery,
		statusesQuery,
		moderatorsQuery,
		servertiesQuery
	} = useDisputes();
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Filter Disputes</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitFilters)}>
				<Select
					register={register}
					name="status"
					id="status"
					label="Status"
					options={[
						{ label: 'All Statuses', value: '' },
						...(statusesQuery.data
							? statusesQuery.data?.map((filter: any) => ({
									label: formatEnum(filter),
									value: filter
							  }))
							: [])
					]}
				/>
				<Select
					register={register}
					name="severity"
					id="severity"
					label="Severity"
					options={[
						{ label: 'All Severities', value: '' },
						...(servertiesQuery.data
							? servertiesQuery.data?.map((filter: any) => ({
									label: formatEnum(filter),
									value: filter
							  }))
							: [])
					]}
				/>
				<Select
					register={register}
					name="type"
					id="type"
					label="Type"
					options={[
						{ label: 'All Types', value: '' },
						...(typesQuery.data
							? typesQuery.data?.map((filter: any) => ({
									label: formatEnum(filter),
									value: filter
							  }))
							: [])
					]}
				/>
				<Input
					id="amount"
					name="amount"
					register={register}
					label="Amount"
					type="number"
				/>
				<Select
					register={register}
					name="moderatorId"
					id="moderatorId"
					label="Moderator"
					options={[
						{ label: 'All Moderators', value: '' },
						...(moderatorsQuery.data
							? moderatorsQuery.data?.map((filter: any) => ({
									label: filter.username,
									value: filter.username
							  }))
							: [])
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

export default DisputesFilters;
