'use client';

import { adminRoutes, publicRoutes } from '@/constants/routes';

import { EditorState } from 'draft-js';
import MultiSelect from '@/components/MultiSelect';
import RichTextEditor from '@/components/RichTextEditor';
import styles from '../banners.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { withAuth } from '@/hoc/withAuth';

const CreateBannerPage = () => {
	const router = useRouter();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [targetWebsite, setTargetWebsite] = useState('public');
	const [pages, setPages] = useState<string[]>([]);
	const [type, setType] = useState('announcement');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [isActive, setIsActive] = useState(true);

	const handleSubmit = async (e: React.FormEvent) => {
		const content = editorState.getCurrentContent().getPlainText('\u0001');
		e.preventDefault();
		await fetch('/banners', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				content,
				targetWebsite,
				pages,
				type,
				startDate,
				endDate,
				isActive
			})
		});
		router.push('/banners');
	};

	const routes = targetWebsite === 'public' ? publicRoutes : adminRoutes;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Create Banner</h1>
			</div>
			<div className={styles.mainContent}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Content</label>
						<RichTextEditor
							editorState={editorState}
							onChange={setEditorState}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Target Website</label>
						<select
							className={styles.formControl}
							value={targetWebsite}
							onChange={(e) => {
								setTargetWebsite(e.target.value);
								setPages([]);
							}}
						>
							<option value="public">Public</option>
							<option value="admin">Admin</option>
						</select>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Pages</label>
						<MultiSelect
							options={routes}
							selected={pages}
							onChange={setPages}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Type</label>
						<select
							className={styles.formControl}
							value={type}
							onChange={(e) => {
								setType(e.target.value);
							}}
						>
							<option value="announcement">Announcement</option>
							<option value="warning">Warning</option>
							<option value="new_feature">New Feature</option>
						</select>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Start Date</label>
						<input
							type="datetime-local"
							className={styles.formControl}
							value={startDate}
							onChange={(e) => {
								setStartDate(e.target.value);
							}}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>End Date</label>
						<input
							type="datetime-local"
							className={styles.formControl}
							value={endDate}
							onChange={(e) => {
								setEndDate(e.target.value);
							}}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Is Active</label>
						<input
							type="checkbox"
							checked={isActive}
							onChange={(e) => {
								setIsActive(e.target.checked);
							}}
						/>
					</div>
					<div className={styles.actionButtons}>
						<button
							type="submit"
							className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withAuth(CreateBannerPage, {
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN']
});
