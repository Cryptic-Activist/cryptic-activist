'use client';

import React, { useEffect, useState } from 'react';
import { useSetPassword, useURL } from '@/hooks';

import { DynamicIcon } from '@/components';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import { validatePasswordSetToken } from '@/services/setPassword';

const AdminAccountPasswordSetValidation = () => {
	const { form, onSubmit, setPasswordtokenQuery, setPasswordtokenMutation } =
		useSetPassword();

	const showVerifyingMessage = setPasswordtokenQuery.isPending;
	const showErrorWhileVerifyingMessage = setPasswordtokenQuery.isError;

	console.log({ setPasswordtokenMutation });

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.cardHeader}>Set Your Password</div>
				<div className={styles.cardContent}>
					{setPasswordtokenQuery.isPending && (
						<p>Verifying set password token...</p>
					)}
					{setPasswordtokenQuery.isError && (
						<p>Some error has occurred. Request new token and try again.</p>
					)}

					{!setPasswordtokenMutation.isError}
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className={styles.formGroup}>
							<div className={styles.formInputContainer}>
								<label className={styles.formLabel}>Password</label>
								<input
									type="password"
									placeholder="Password"
									className={styles.formControl}
									disabled={
										setPasswordtokenMutation.isPending ||
										setPasswordtokenMutation.data?.ok
									}
									{...form.register('password')}
								/>
							</div>
						</div>
						<div className={styles.formGroup}>
							<div className={styles.formInputContainer}>
								<label className={styles.formLabel}>Confirm Password</label>
								<input
									type="password"
									placeholder="Confirm Password"
									className={styles.formControl}
									disabled={
										setPasswordtokenMutation.isPending ||
										setPasswordtokenMutation.data?.ok
									}
									{...form.register('confirmPassword')}
								/>
							</div>
						</div>
						<button
							type="submit"
							className={`${styles.btn} ${styles.btnPrimary}`}
							disabled={
								setPasswordtokenMutation.isPending ||
								setPasswordtokenMutation.data?.ok
							}
						>
							Set Password
						</button>
					</form>

					{setPasswordtokenMutation.isError && (
						<p>
							Some error occured while setting your password. Request help from
							support.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminAccountPasswordSetValidation;
