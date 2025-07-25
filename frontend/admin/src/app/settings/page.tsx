'use client';

import { DynamicIcon } from '@/components';
import React from 'react';
import styles from './page.module.scss';
import usePlatformSettings from '@/hooks/usePlatformSettings';

const PlatformSettings = () => {
	const { publicForm, privateForm } = usePlatformSettings();

	return (
		<div className={styles.container}>
			{/* Header */}
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Platform Settings</h1>
				<p className={styles.metaInfoValue}>
					Create, Delete, Update general platform settings
				</p>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.leftColumn}>
					{/* Public Settings */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Public Settings</div>
						<div className={styles.cardContent}>
							<form onSubmit={publicForm.handleSubmit(publicForm.onSubmit)}>
								{publicForm.fields.length === 0 && 'No Settings Yet'}
								{publicForm.fields.map((field, index) => (
									<div className={styles.formGroup} key={field.id}>
										<div
											className={`${styles.formRow} ${
												field.newField ? styles.formRowExtended : ''
											} ${
												!field.isEditable ? styles.formRowExtendedEditable : ''
											}`}
										>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Key</label>
												<input
													type="text"
													className={`${styles.formControl} ${
														publicForm.errors.public &&
														publicForm.errors.public[index]?.key
															? styles.inputError
															: ''
													}`}
													disabled={!field.canBeDeleted || !field.isEditable}
													{...publicForm.register(`public.${index}.key`)}
													placeholder="Setting Name"
												/>
											</div>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Value</label>
												{publicForm.watchedValues.public[index].type ===
												'BOOLEAN' ? (
													<div className={styles.checkboxContainer}>
														<input
															type="checkbox"
															className={styles.checkbox}
															disabled={
																!publicForm.watchedValues.public[index]
																	.isEditable
															}
															{...(publicForm.watchedValues.public[index]
																.value === 'false' && { checked: false })}
															{...(publicForm.watchedValues.public[index]
																.value === 'true' && { checked: true })}
															{...publicForm.register(`public.${index}.value`)}
														/>
													</div>
												) : (
													<input
														type="text"
														disabled={
															!publicForm.watchedValues.public[index].isEditable
														}
														className={`${styles.formControl} ${
															publicForm.errors.public &&
															publicForm.errors.public[index]?.value
																? styles.inputError
																: ''
														}`}
														{...publicForm.register(`public.${index}.value`)}
														placeholder="Setting Name"
													/>
												)}
											</div>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Type</label>
												<select
													className={`${styles.formControl} ${
														publicForm.errors.public &&
														publicForm.errors.public[index]?.type
															? styles.inputError
															: ''
													}`}
													disabled={!field.canBeDeleted || !field.isEditable}
													{...publicForm.register(`public.${index}.type`)}
												>
													<option value="STRING">String</option>
													<option value="NUMBER">Number</option>
													<option value="BOOLEAN">Boolean</option>
												</select>
											</div>
											{field.isEditable && (
												<div className={styles.formInputContainer}>
													<label className={styles.formLabel}>Editable?</label>
													<div className={styles.checkboxContainer}>
														<input
															type="checkbox"
															className={styles.checkbox}
															{...publicForm.register(
																`public.${index}.isEditable`
															)}
														/>
													</div>
												</div>
											)}
											{field.canBeDeleted && (
												<div className={styles.formInputContainer}>
													<label className={styles.formLabel}>Deletable?</label>
													<div className={styles.checkboxContainer}>
														<input
															type="checkbox"
															className={styles.checkbox}
															{...publicForm.register(
																`public.${index}.deletable`
															)}
														/>
													</div>
												</div>
											)}
											<div className={styles.inputBtnContainer}>
												{field.canBeDeleted && (
													<button
														className={`${styles.btn} ${styles.btnDanger} ${styles.deleteBtn} `}
														type="button"
														onClick={() =>
															publicForm.removeField(index, field.canBeDeleted)
														}
													>
														<DynamicIcon
															iconName="FaTrash"
															size={16}
															color="#fff"
														/>
													</button>
												)}
											</div>
										</div>
										{publicForm.errors.public &&
											publicForm.errors.public[index]?.key && (
												<span className={styles.fieldError}>
													{publicForm.errors.public[index].message}
												</span>
											)}
									</div>
								))}

								<div className={styles.actionButtons}>
									<button
										type="submit"
										className={`${styles.btn} ${styles.btnPrimary}`}
										disabled={
											publicForm.updatePublicPlatformSettingsMutation.isPending
										}
									>
										{publicForm.updatePublicPlatformSettingsMutation.isPending
											? 'Updating Public Platform Settings...'
											: 'Update Public Platform Settings'}
									</button>
									<button
										type="button"
										className={`${styles.btn}`}
										disabled={
											publicForm.updatePublicPlatformSettingsMutation.isPending
										}
										onClick={publicForm.appendField}
									>
										<DynamicIcon iconName="FaPlus" size={16} />
									</button>
									<button
										type="button"
										className={`${styles.btn}`}
										disabled={
											publicForm.updatePublicPlatformSettingsMutation
												.isPending ||
											!publicForm.fields[publicForm.fields?.length - 1]
												?.canBeDeleted
										}
										onClick={() =>
											publicForm.removeField(
												publicForm.fields.length - 1,
												publicForm.fields[publicForm.fields?.length - 1]
													?.canBeDeleted
											)
										}
									>
										<DynamicIcon iconName="FaMinus" size={16} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className={styles.rightColumn}>
					{/* Private Settings */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Private Settings</div>
						<div className={styles.cardContent}>
							<form onSubmit={privateForm.handleSubmit(privateForm.onSubmit)}>
								{privateForm.fields.length === 0 && 'No Settings Yet'}
								{privateForm.fields.map((field, index) => (
									<div className={styles.formGroup} key={field.id}>
										<div
											className={`${styles.formRow} ${
												field.newField ? styles.formRowExtended : ''
											} ${
												!field.isEditable ? styles.formRowExtendedEditable : ''
											}`}
										>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Key</label>
												<input
													type="text"
													className={`${styles.formControl} ${
														privateForm.errors.private &&
														privateForm.errors.private[index]?.key
															? styles.inputError
															: ''
													}`}
													disabled={!field.canBeDeleted || !field.isEditable}
													{...privateForm.register(`private.${index}.key`)}
													placeholder="Setting Name"
												/>
											</div>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Value</label>
												{privateForm.watchedValues.private[index].type ===
												'BOOLEAN' ? (
													<div className={styles.checkboxContainer}>
														<input
															type="checkbox"
															className={styles.checkbox}
															disabled={
																!privateForm.watchedValues.private[index]
																	.isEditable
															}
															{...(privateForm.watchedValues.private[index]
																.value === 'false' && { checked: false })}
															{...(privateForm.watchedValues.private[index]
																.value === 'true' && { checked: true })}
															{...privateForm.register(
																`private.${index}.value`
															)}
														/>
													</div>
												) : (
													<input
														type="text"
														disabled={
															!privateForm.watchedValues.private[index]
																.isEditable
														}
														className={`${styles.formControl} ${
															privateForm.errors.private &&
															privateForm.errors.private[index]?.value
																? styles.inputError
																: ''
														}`}
														{...privateForm.register(`private.${index}.value`)}
														placeholder="Setting Name"
													/>
												)}
											</div>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Type</label>
												<select
													className={`${styles.formControl} ${
														privateForm.errors.private &&
														privateForm.errors.private[index]?.type
															? styles.inputError
															: ''
													}`}
													disabled={!field.canBeDeleted || !field.isEditable}
													{...privateForm.register(`private.${index}.type`)}
												>
													<option value="STRING">String</option>
													<option value="NUMBER">Number</option>
													<option value="BOOLEAN">Boolean</option>
												</select>
											</div>
											{field.isEditable && (
												<div className={styles.formInputContainer}>
													<label className={styles.formLabel}>Editable?</label>
													<div className={styles.checkboxContainer}>
														<input
															type="checkbox"
															className={styles.checkbox}
															{...privateForm.register(
																`private.${index}.isEditable`
															)}
														/>
													</div>
												</div>
											)}
											{field.canBeDeleted && (
												<div className={styles.formInputContainer}>
													<label className={styles.formLabel}>Deletable?</label>
													<div className={styles.checkboxContainer}>
														<input
															type="checkbox"
															className={styles.checkbox}
															{...privateForm.register(
																`private.${index}.deletable`
															)}
														/>
													</div>
												</div>
											)}
											<div className={styles.inputBtnContainer}>
												{field.canBeDeleted && (
													<button
														className={`${styles.btn} ${styles.btnDanger} ${styles.deleteBtn} `}
														type="button"
														onClick={() =>
															privateForm.removeField(index, field.canBeDeleted)
														}
													>
														<DynamicIcon
															iconName="FaTrash"
															size={16}
															color="#fff"
														/>
													</button>
												)}
											</div>
										</div>
										{privateForm.errors.private &&
											privateForm.errors.private[index]?.key && (
												<span className={styles.fieldError}>
													{privateForm.errors.private[index].message}
												</span>
											)}
									</div>
								))}

								<div className={styles.actionButtons}>
									<button
										type="submit"
										className={`${styles.btn} ${styles.btnPrimary}`}
										disabled={
											privateForm.updatePrivatePlatformSettingsMutation
												.isPending
										}
									>
										{privateForm.updatePrivatePlatformSettingsMutation.isPending
											? 'Updating Private Platform Settings...'
											: 'Update Private Platform Settings'}
									</button>
									<button
										type="button"
										className={`${styles.btn}`}
										disabled={
											privateForm.updatePrivatePlatformSettingsMutation
												.isPending
										}
										onClick={privateForm.appendField}
									>
										<DynamicIcon iconName="FaPlus" size={16} />
									</button>
									<button
										type="button"
										className={`${styles.btn}`}
										disabled={
											privateForm.updatePrivatePlatformSettingsMutation
												.isPending ||
											!privateForm.fields[privateForm.fields?.length - 1]
												?.canBeDeleted
										}
										onClick={() =>
											privateForm.removeField(
												privateForm.fields.length - 1,
												privateForm.fields[privateForm.fields?.length - 1]
													?.canBeDeleted
											)
										}
									>
										<DynamicIcon iconName="FaMinus" size={16} />
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlatformSettings;
