'use client';

import { DatePicker, Input, Select } from '@/components/form';

import Button from '@/components/Button';
import React from 'react';
import styles from './index.module.scss';
import { toUpperCase } from '@/utils';
import { useTrades } from '@/hooks';

const TradesFilters = () => {
	const {
		handleSubmit,
		register,
		onSubmitFilters,
		onSelectDateEndFilter,
		onSelectDateStartFilter,
		onResetFilters,
		cryptocurrencyFilters,
		$trades
	} = useTrades();
	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>Filter Trades</h2>
			<form className={styles.form} onSubmit={handleSubmit(onSubmitFilters)}>
				<Select
					register={register}
					name="status"
					id="status"
					label="Status"
					options={[
						{ label: 'All Statuses', value: '' },
						{ label: 'Pending', value: 'PENDING' },
						{ label: 'In Progress', value: 'IN_PROGRESS' },
						{ label: 'Completed', value: 'COMPLETED' },
						{ label: 'Cancelled', value: 'CANCELLED' },
						{ label: 'Disputed', value: 'DISPUTED' },
						{ label: 'Expired', value: 'EXPIRED' },
						{ label: 'Failed', value: 'FAILED' }
					]}
				/>
				<Select
					register={register}
					name="cryptocurrencyId"
					id="cryptocurrencyId"
					label="Cryptocurrency"
					options={[
						{ label: 'All Crypto', value: '' },
						...(cryptocurrencyFilters.data
							? cryptocurrencyFilters.data?.map((filter: any) => ({
									label: `${filter.name} (${toUpperCase(filter.symbol)})`,
									value: filter.id
							  }))
							: [])
					]}
				/>
				<DatePicker
					selectedDate={$trades.filters?.dateRageStart}
					label="Date Rage Start"
					placeholder="Select Start Date"
					onSelect={onSelectDateStartFilter}
				/>
				<DatePicker
					selectedDate={$trades.filters?.dateRageEnd}
					label="Date Rage End"
					placeholder="Select End Date"
					onSelect={onSelectDateEndFilter}
				/>
				<Input
					id="amount"
					name="amount"
					register={register}
					label="Amount"
					type="number"
				/>
				<Input
					id="username"
					name="username"
					register={register}
					label="Username"
					type="text"
					placeholder="user-example"
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

export default TradesFilters;
