'use client';

import { DynamicIcon } from '@/components';
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import useAdmins from '@/hooks/useAdmins';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Role } from '@/stores/admins';

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	roles: z.array(z.string()).min(1, 'At least one role is required')
});

const Admins = () => {
	const { admins, adminsQuery, createAdminMutation, updateAdminMutation, deleteAdminMutation, generatePasswordMutation } = useAdmins();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAdmin, setSelectedAdmin] = useState(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema)
	});

	const onSubmit = (data) => {
		if (selectedAdmin) {
			updateAdminMutation.mutate({ ...data, id: selectedAdmin.id, active: selectedAdmin.active });
		} else {
			createAdminMutation.mutate(data);
		}
		closeModal();
	};

	const openModal = (admin = null) => {
		setSelectedAdmin(admin);
		if (admin) {
			reset(admin);
		} else {
			reset({ name: '', email: '', roles: [] });
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedAdmin(null);
		reset({ name: '', email: '', roles: [] });
	};

	const roles: Role[] = [
		'AUDITOR',
		'DISPUTE_MANAGER',
		'FINANCE_MANAGER',
		'KYC_REVIEWER',
		'MODERATOR',
		'SENIOR_ADMIN',
		'SUPER_ADMIN',
		'SUPPORT_AGENT'
	];

	return (
		<div className={styles.container}>
			{/* Header */}
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Admins</h1>
				<p className={styles.metaInfoValue}>
					Create, Delete, Update admins
				</p>
				<button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal()}>
					<DynamicIcon iconName="FaPlus" size={16} />
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
								<th>Name</th>
								<th>Email</th>
								<th>Roles</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{admins.map((admin) => (
								<tr key={admin.id}>
									<td>{admin.name}</td>
									<td>{admin.email}</td>
									<td>{admin.roles.join(', ')}</td>
									<td>{admin.active ? 'Active' : 'Inactive'}</td>
									<td>
										<button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => openModal(admin)}>
											<DynamicIcon iconName="FaEdit" size={16} />
										</button>
										<button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => deleteAdminMutation.mutate(admin.id)}>
											<DynamicIcon iconName="FaTrash" size={16} />
										</button>
										<button className={`${styles.btn} ${styles.btnWarning}`} onClick={() => updateAdminMutation.mutate({ ...admin, active: !admin.active })}>
											<DynamicIcon iconName={admin.active ? 'FaToggleOff' : 'FaToggleOn'} size={16} />
										</button>
										<button className={`${styles.btn} ${styles.btnSuccess}`} onClick={() => generatePasswordMutation.mutate(admin.id)}>
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
								<DynamicIcon iconName="FaTimes" size={16} />
							</button>
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Name</label>
								<input type="text" {...register('name')} className={styles.formControl} />
								{errors.name && <span className={styles.fieldError}>{errors.name.message}</span>}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Email</label>
								<input type="email" {...register('email')} className={styles.formControl} />
								{errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
							</div>
							<div className={styles.formGroup}>
								<label className={styles.formLabel}>Roles</label>
								<div className={styles.checkboxGroup}>
									{roles.map((role) => (
										<div key={role} className={styles.checkboxContainer}>
											<input type="checkbox" value={role} {...register('roles')} />
											<label>{role}</label>
										</div>
									))}
								</div>
								{errors.roles && <span className={styles.fieldError}>{errors.roles.message}</span>}
							</div>
							<div className={styles.actionButtons}>
								<button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
									{selectedAdmin ? 'Update Admin' : 'Create Admin'}
								</button>
								<button type="button" className={`${styles.btn}`} onClick={closeModal}>
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
