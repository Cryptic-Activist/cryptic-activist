'use client';

import { Button, DynamicIcon } from '@/components';
import React, { useEffect, useState } from 'react';

import { Admin } from '@/stores/admin/types';
import { Role } from '@/stores/admins';
import { SelectedAdmin } from './types';
import { adminResolver } from './zod';
import styles from './page.module.scss';
import useAdmins from '@/hooks/useAdmins';
import { useForm } from 'react-hook-form';

const Admins = () => {
	const {
		admins,
		deleteAdminMutation,
		generatePasswordMutation,
		toggleAdminActivationMutation,
		forms,
		isModalOpen,
		modalType,
		handleGenerateCredentials,
		onSubmit,
		openModal,
		closeModal,
		roles,
		selectedAdmin
	} = useAdmins();

	return (
		<div className={styles.container}>
			{/* Header */}
			<header className={styles.header}>
				<div>
					<h1 className={styles.pageTitle}>Admins</h1>
					<p className={styles.metaInfoValue}>Create, Delete, Update admins</p>
					<button
						className={`${styles.btn} ${styles.btnPrimary}`}
						onClick={() => openModal()}
					>
						<DynamicIcon iconName="FaPlus" size={16} color="#fff" />
						Create Admin
					</button>
				</div>
				<Button theme="primary">
					<DynamicIcon iconName="FaTrash" size={16} color="#ffcd2b" />
					<span>Delete Admins</span>
				</Button>
			</header>

			{/* Admins Table */}
			<div className={styles.card}>
				<div className={styles.cardHeader}>Admins</div>
				<div className={styles.cardContent}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
								<th>Email</th>
								<th>Roles</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{admins.map((admin) => {
								const disabledStyle = !admin.isActive
									? styles.disabledAdmin
									: '';
								return (
									<tr key={admin.id} className={disabledStyle}>
										<td>{admin.firstName}</td>
										<td>{admin.lastName}</td>
										<td>{admin.username}</td>
										<td>{admin.email}</td>
										<td>{admin.roles.join(', ')}</td>
										<td className={styles.btns}>
											<button
												className={`${styles.btn} ${styles.btnSecondary}`}
												onClick={() =>
													openModal({
														...admin,
														roles: admin.roles
													})
												}
											>
												<DynamicIcon iconName="FaPen" size={16} />
											</button>
											{admin.isActive && (
												<button
													className={`${styles.btn} ${styles.btnDanger}`}
													onClick={() => deleteAdminMutation.mutate(admin.id)}
												>
													<DynamicIcon iconName="FaTrash" size={16} />
												</button>
											)}
											<button
												className={`${styles.btn} ${styles.btnWarning}`}
												onClick={() =>
													toggleAdminActivationMutation.mutate({
														...admin,
														isActive: !admin.isActive
													})
												}
											>
												<DynamicIcon
													iconName={
														admin.isActive ? 'FaToggleOff' : 'FaToggleOn'
													}
													size={16}
												/>
											</button>
											{admin.isActive && (
												<button
													className={`${styles.btn} ${styles.btnSuccess}`}
													onClick={() =>
														generatePasswordMutation.mutate(admin.id)
													}
												>
													<DynamicIcon iconName="FaKey" size={16} />
												</button>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h2>{modalType === 'edit' ? 'Edit Admin' : 'Create Admin'}</h2>
							<button onClick={closeModal}>
								<DynamicIcon iconName="FaPlus" size={16} />
							</button>
						</div>
						<form onSubmit={forms.handleSubmit(onSubmit)}>
							{modalType === 'create' && (
								<div className={styles.formGroup}>
									<button
										type="button"
										className={`${styles.btn} ${styles.btnPrimary}`}
										onClick={handleGenerateCredentials}
									>
										Generate Credentials
									</button>
								</div>
							)}

							<div className={styles.formGroup}>
								<label className={styles.formLabel}>First Name</label>
								<input
									type="text"
									{...forms.register('firstName')}
									className={styles.formControl}
									readOnly
									disabled
								/>
								{forms.errors.firstName && (
									<span className={styles.fieldError}>
										{forms.errors.firstName.message}
									</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Last Name</label>
								<input
									type="text"
									{...forms.register('lastName')}
									className={styles.formControl}
									readOnly
									disabled
								/>
								{forms.errors.lastName && (
									<span className={styles.fieldError}>
										{forms.errors.lastName.message}
									</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Username</label>
								<input
									type="text"
									{...forms.register('username')}
									className={styles.formControl}
									readOnly
									disabled
								/>
								{forms.errors.username && (
									<span className={styles.fieldError}>
										{forms.errors.username.message}
									</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Email</label>
								<input
									type="email"
									{...forms.register('email')}
									className={styles.formControl}
									{...(modalType === 'edit' && {
										readOnly: true,
										disabled: true
									})}
								/>
								{forms.errors.email && (
									<span className={styles.fieldError}>
										{forms.errors.email.message}
									</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Roles</label>
								<div
									className={`${styles.checkboxGroup} ${styles.rolesScrollContainer}`}
								>
									{roles.map((role) => (
										<div key={role} className={styles.checkboxContainer}>
											<input
												type="checkbox"
												value={role}
												id={role}
												{...forms.register('roles')}
											/>
											<label htmlFor={role}>{role}</label>
										</div>
									))}
								</div>
								{forms.errors.roles && (
									<span className={styles.fieldError}>
										{forms.errors.roles.message}
									</span>
								)}
							</div>
							<div className={styles.actionButtons}>
								<button
									type="submit"
									className={`${styles.btn} ${styles.btnPrimary}`}
								>
									{selectedAdmin ? 'Update Admin' : 'Create Admin'}
								</button>
								<button
									type="button"
									className={`${styles.btn}`}
									onClick={closeModal}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Admins;
