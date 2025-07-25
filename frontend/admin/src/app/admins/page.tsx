'use client';

import React, { useEffect, useState } from 'react';

import { DynamicIcon } from '@/components';
import { Role } from '@/stores/admins';
import { SelectedAdmin } from './types';
import styles from './page.module.scss';
import useAdmins from '@/hooks/useAdmins';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	username: z.string().min(1, 'Username is required'),
	email: z.string().email('Invalid email address'),
	roles: z.array(z.string()).min(1, 'At least one role is required')
});

const Admins = () => {
	const {
		admins,
		adminsQuery,
		createAdminMutation,
		updateAdminMutation,
		deleteAdminMutation,
		generatePasswordMutation,
		getRandomCredentialsMutation
	} = useAdmins();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState<SelectedAdmin | null>(
		null
	);

	console.log({ admins });

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	});

	const onSubmit = (data: any) => {
		console.log({ data, selectedAdmin });

		if (selectedAdmin) {
			updateAdminMutation.mutate({
				...data,
				id: selectedAdmin.id,
				active: selectedAdmin.active
			});
		} else {
			createAdminMutation.mutate(data);
		}
		// closeModal();
	};

	const openModal = (admin = null) => {
		setSelectedAdmin(admin);
		if (admin) {
			reset(admin);
		} else {
			reset({
				firstName: '',
				lastName: '',
				username: '',
				email: '',
				roles: []
			});
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedAdmin(null);
		reset({ firstName: '', lastName: '', username: '', email: '', roles: [] });
	};

	const handleGenerateCredentials = async () => {
		const credentials = await getRandomCredentialsMutation.mutateAsync();
		console.log({ credentials });
		setValue('firstName', credentials.names[0]);
		setValue('lastName', credentials.names[1]);
		setValue('username', credentials.username);
	};

	const roles: Role[] = [
		'AUDITOR',
		'DISPUTE_MANAGER',
		'FINANCE_MANAGER',
		'KYC_REVIEWER',
		'MODERATOR',
		'SENIOR_ADMIN',
		'SUPPORT_AGENT'
	];

	return (
		<div className={styles.container}>
			{/* Header */}
			<div className={styles.header}>
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
							{admins.map((admin) => (
								<tr key={admin.id}>
									<td>{admin.firstName}</td>
									<td>{admin.lastName}</td>
									<td>{admin.username}</td>
									<td>{admin.email}</td>
									<td>{admin.roles.join(', ')}</td>
									<td>
										<button
											className={`${styles.btn} ${styles.btnSecondary}`}
											onClick={() => openModal(admin)}
										>
											<DynamicIcon iconName="FaPen" size={16} />
										</button>
										<button
											className={`${styles.btn} ${styles.btnDanger}`}
											onClick={() => deleteAdminMutation.mutate(admin.id)}
										>
											<DynamicIcon iconName="FaTrash" size={16} />
										</button>
										{/* <button
											className={`${styles.btn} ${styles.btnWarning}`}
											onClick={() =>
												updateAdminMutation.mutate({
													...admin,
													active: !admin.active
												})
											}
										>
											<DynamicIcon
												iconName={admin.active ? 'FaToggleOff' : 'FaToggleOn'}
												size={16}
											/>
										</button> */}
										<button
											className={`${styles.btn} ${styles.btnSuccess}`}
											onClick={() => generatePasswordMutation.mutate(admin.id)}
										>
											<DynamicIcon iconName="FaKey" size={16} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h2>{selectedAdmin ? 'Edit Admin' : 'Create Admin'}</h2>
							<button onClick={closeModal}>
								<DynamicIcon iconName="FaPlus" size={16} />
							</button>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.formGroup}>
								<button
									type="button"
									className={`${styles.btn} ${styles.btnPrimary}`}
									onClick={handleGenerateCredentials}
								>
									Generate Credentials
								</button>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>First Name</label>
								<input
									type="text"
									{...register('firstName')}
									className={styles.formControl}
									readOnly
									disabled
								/>
								{errors.firstName && (
									<span className={styles.fieldError}>
										{errors.firstName.message}
									</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Last Name</label>
								<input
									type="text"
									{...register('lastName')}
									className={styles.formControl}
									readOnly
									disabled
								/>
								{errors.lastName && (
									<span className={styles.fieldError}>
										{errors.lastName.message}
									</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Username</label>
								<input
									type="text"
									{...register('username')}
									className={styles.formControl}
									readOnly
									disabled
								/>
								{errors.username && (
									<span className={styles.fieldError}>
										{errors.username.message}
									</span>
								)}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Email</label>
								<input
									type="email"
									{...register('email')}
									className={styles.formControl}
								/>
								{errors.email && (
									<span className={styles.fieldError}>
										{errors.email.message}
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
												{...register('roles')}
											/>
											<label htmlFor={role}>{role}</label>
										</div>
									))}
								</div>
								{errors.roles && (
									<span className={styles.fieldError}>
										{errors.roles.message}
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
