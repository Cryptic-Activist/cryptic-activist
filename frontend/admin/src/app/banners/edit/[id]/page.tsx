'use client';

import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { JSX, useEffect, useState } from 'react';
import { adminRoutes, publicRoutes } from '@/constants/routes';
import { useParams, useRouter } from 'next/navigation';

import MultiSelect from '@/components/MultiSelect';
import React from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { formatDatetimeLocal } from '@/utils/date';
import styles from '../../banners.module.scss';
import { useEditBanner } from '@/hooks/useEditBanner';
import { withAuth } from '@/hoc/withAuth';

const EditBannerPage = () => {
	const params = useParams();
	const id = params?.id as string;
	const { banner, isUpdating, form, onSubmit } = useEditBanner(id);
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

	useEffect(() => {
		if (banner) {
			const blocksFromHTML = convertFromHTML(banner.content);
			const state = ContentState.createFromBlockArray(
				blocksFromHTML.contentBlocks,
				blocksFromHTML.entityMap
			);
			setEditorState(EditorState.createWithContent(state));

			const newStartDate = formatDatetimeLocal(banner.startDate);
			const newEndDate = formatDatetimeLocal(banner.endDate);
			form.reset({
				...banner,
				startDate: newStartDate,
				endDate: banner.endDate ? newEndDate : ''
			});
		}
	}, [banner, form]);

	const routes = targetWebsite === 'public' ? publicRoutes : adminRoutes;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Edit Banner</h1>
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
							<p className={styles.error}>
								{errors.content.message.toString()}
							</p>
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
							disabled={isUpdating}
						>
							{isUpdating ? 'Updating...' : 'Update'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withAuth(EditBannerPage, {
	roles: ['SUPER_ADMIN', 'SENIOR_ADMIN']
});
