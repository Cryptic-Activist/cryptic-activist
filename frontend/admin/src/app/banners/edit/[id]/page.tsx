'use client';

import React, { useEffect, useState } from 'react';
import { adminRoutes, publicRoutes } from '@/constants/routes';
import { useParams, useRouter } from 'next/navigation';

import MultiSelect from '@/components/MultiSelect';
import RichTextEditor from '@/components/RichTextEditor';
import { formatDatetimeLocal } from '@/utils/date';
import styles from '../../banners.module.scss';
import { useEditBanner } from '@/hooks/useEditBanner';
import { withAuth } from '@/hoc/withAuth';
import { Descendant } from 'slate';

// Basic HTML to Slate converter (for simple HTML content)
const htmlToSlate = (html: string): Descendant[] => {
  // This is a very basic conversion. For complex HTML, consider a dedicated library.
  return [
    {
      type: 'paragraph',
      children: [{ text: html.replace(/<[^>]*>?/gm, '') }], // Strip HTML tags for plain text
    },
  ];
};

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
	const [content, setContent] = useState<Descendant[]>([
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	]);

	const targetWebsite = watch('targetWebsite');
	const pages = watch('pages');

	useEffect(() => {
		if (banner) {
			// Convert existing HTML content to Slate format
			setContent(htmlToSlate(banner.content));

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
							initialValue={content}
							onChange={(newValue) => {
								setContent(newValue);
								// Convert Slate Descendant[] to plain text for form submission
								const plainText = newValue.map(node => {
									if ('children' in node && Array.isArray(node.children)) {
										return node.children.map(child => 'text' in child ? child.text : '').join('');
									}
									return '';
								}).join('\n');
								setValue('content', plainText);
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