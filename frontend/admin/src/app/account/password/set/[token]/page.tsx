'use client';

import { Button, DynamicIcon } from '@/components';

import React from 'react';
import styles from './page.module.scss';
import useSetPassword from '@/hooks/useSetPassword';
import { withAuth } from '@/hoc/withAuth';

const SetPassword = () => {
	const { form, setPasswordtokenQuery, setPasswordtokenMutation, onSubmit } =
		useSetPassword();

	if (setPasswordtokenQuery.isPending) {
		return (
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.cardContent}>
						<p>Verifying set password token...</p>
					</div>
				</div>
			</div>
		);
	}

	if (setPasswordtokenQuery.isError) {
		return (
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.cardContent}>
						<p>Some error has occurred. Request new token and try again.</p>
					</div>
				</div>
			</div>
		);
	}

	if (setPasswordtokenMutation.isSuccess) {
		return (
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.cardContent}>
						<p className={styles.successMessage}>Password set successfully!</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.cardHeader}>Set Your Password</div>
				<div className={styles.cardContent}>
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
										// @ts-expect-error: The type of setPasswordtokenMutation.data.ok is not directly compatible with boolean, but it will be converted to boolean by React.
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
										// @ts-expect-error: The type of setPasswordtokenMutation.data.ok is not directly compatible with boolean, but it will be converted to boolean by React.
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
								// @ts-expect-error: The type of setPasswordtokenMutation.data.ok is not directly compatible with boolean, but it will be converted to boolean by React.
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

export default SetPassword;
