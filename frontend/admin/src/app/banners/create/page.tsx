'use client';

import { adminRoutes, publicRoutes } from '@/constants/routes';

import { EditorState } from 'draft-js';
import MultiSelect from '@/components/MultiSelect';
import RichTextEditor from '@/components/RichTextEditor';
import styles from '../banners.module.scss';
import { useBanner } from '@/hooks/useBanner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { withAuth } from '@/hoc/withAuth';

const CreateBannerPage = () => {
	const { onSubmit, isCreating, form } = useBanner();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = form;
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const targetWebsite = watch('targetWebsite');
	const pages = watch('pages');

	const routes = targetWebsite === 'public' ? publicRoutes : adminRoutes;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Create Banner</h1>
			</div>
			<div className={styles.mainContent}>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Content</label>
						<RichTextEditor
							editorState={editorState}
							onChange={(editorState) => {
								setEditorState(editorState);
								setValue(
									'content',
									editorState.getCurrentContent().getPlainText('\u0001')
								);
							}}
						/>
						{errors.content?.message && (
							<p className={styles.error}>{errors.content.message}</p>
						)}
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Target Website</label>
						<select
							className={styles.formControl}
							{...register('targetWebsite')}
							onChange={(e) => {
								setValue('targetWebsite', e.target.value);
								setValue('pages', []);
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
							onChange={(selected) => {
								setValue('pages', selected);
							}}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Type</label>
						<select className={styles.formControl} {...register('type')}>
							<option value="ANNOUNCEMENT">Announcement</option>
							<option value="WARNING">Warning</option>
							<option value="NEW_FEATURE">New Feature</option>
						</select>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Start Date</label>
						<input
							type="datetime-local"
							className={styles.formControl}
							{...register('startDate')}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>End Date</label>
						<input
							type="datetime-local"
							className={styles.formControl}
							{...register('endDate')}
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>Is Active</label>
						<input type="checkbox" {...register('isActive')} />
					</div>
					<div className={styles.actionButtons}>
						<button
							type="submit"
							className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
							disabled={isCreating}
						>
							{isCreating ? 'Creating...' : 'Create'}
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
