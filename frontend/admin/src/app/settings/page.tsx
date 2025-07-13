'use client';

import { useChains, useSmartContractDeployment } from '@/hooks';

import { DynamicIcon } from '@/components';
import React from 'react';
import { getLocaleFullDateString } from '@/utils/date';
import { humanizeCamelCase } from '@/utils';
import styles from './page.module.scss';
import usePlatformSettings from '@/hooks/usePlatformSettings';

const PlatformSettings = () => {
	const { escrow, premium, deploymentStats, handleResetAllForms } =
		useSmartContractDeployment();
	const { chains } = useChains();
	const {
		platformSettings,
		fieldsPrivate,
		fieldsPublic,
		errorsPrivate,
		errorsPublic,
		handleSubmitPrivate,
		handleSubmitPublic,
		onSubmitPrivate,
		onSubmitPublic,
		registerPrivate,
		registerPublic,
		currentPrivateIndex,
		currentPublicIndex,
		appendPrivateField,
		appendPublicField,
		removePrivateField,
		removePublicField,
		updatePublicPlatformSettingsMutation
	} = usePlatformSettings();

	const chainId =
		escrow.watchedValues.type === 'Escrow'
			? escrow.watchedValues.chainId
			: premium.watchedValues.chainId;
	const currentChain =
		chains.data && chains.data.length > 0 && chainId && chainId?.length > 0
			? chains.data?.filter((chain) => chain.id === chainId)
			: null;

	console.log({ errorsPublic });

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
							<form onSubmit={handleSubmitPublic(onSubmitPublic)}>
								{/* {fieldsPublic.pu} */}
								{fieldsPublic.map((field, index) => (
									<div className={styles.formGroup} key={field.id}>
										<div className={styles.formRow}>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Key</label>
												<input
													type="text"
													className={`${styles.formControl} ${
														errorsPublic.public &&
														errorsPublic.public[index]?.key
															? styles.inputError
															: ''
													}`}
													disabled={!field.canBeDeleted}
													{...registerPublic(`public.${index}.key`)}
													placeholder="Setting Name"
												/>
											</div>
											<div className={styles.formInputContainer}>
												<label className={styles.formLabel}>Value</label>
												<input
													type="text"
													className={`${styles.formControl} ${
														errorsPublic.public &&
														errorsPublic.public[index]?.value
															? styles.inputError
															: ''
													}`}
													{...registerPublic(`public.${index}.value`)}
													placeholder="Setting Name"
												/>
											</div>
											<div className={styles.inputBtnContainer}>
												<div className={styles.formInputContainer}>
													<label className={styles.formLabel}>Type</label>
													<select
														className={`${styles.formControl} ${
															errorsPublic.public &&
															errorsPublic.public[index]?.type
																? styles.inputError
																: ''
														}`}
														disabled={!field.canBeDeleted}
														{...registerPublic(`public.${index}.type`)}
													>
														<option value="STRING">String</option>
														<option value="NUMBER">Number</option>
														<option value="BOOLEAN">Boolean</option>
													</select>
												</div>
												{field.canBeDeleted && (
													<button
														className={`${styles.btn} ${styles.btnDanger} ${styles.deleteBtn} `}
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
										{errorsPublic.public && errorsPublic.public[index]?.key && (
											<span className={styles.fieldError}>
												{errorsPublic.public[index].message}
											</span>
										)}
									</div>
								))}

								<div className={styles.actionButtons}>
									<button
										type="submit"
										className={`${styles.btn} ${styles.btnPrimary}`}
										disabled={updatePublicPlatformSettingsMutation.isPending}
									>
										{updatePublicPlatformSettingsMutation.isPending
											? 'Updating Public Platform Settings...'
											: 'Update Public Platform Settings'}
									</button>
									<button
										type="button"
										className={`${styles.btn}`}
										disabled={updatePublicPlatformSettingsMutation.isPending}
										onClick={appendPublicField}
									>
										<DynamicIcon iconName="FaPlus" size={16} />
									</button>
									<button
										type="button"
										className={`${styles.btn}`}
										disabled={updatePublicPlatformSettingsMutation.isPending}
										onClick={removePublicField}
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
							<form onSubmit={handleSubmitPrivate(onSubmitPrivate)}>
								<div className={styles.formGroup}>
									<label className={styles.formLabel}>
										Default Fee Rate (%)
									</label>
									<input
										type="number"
										step="0.01"
										min="0"
										max="100"
										className={`${styles.formControl} ${
											escrow.errors.defaultFeeRate ? styles.inputError : ''
										}`}
										{...escrow.register('defaultFeeRate')}
									/>
									{escrow.errors.defaultFeeRate && (
										<span className={styles.fieldError}>
											{escrow.errors.defaultFeeRate.message}
										</span>
									)}
									<div className={styles.formHelp}>
										The default fee rate charged on trades (0-100%)
									</div>
								</div>

								{escrow.watchedValues.type === 'Escrow' && (
									<>
										<div className={styles.formGroup}>
											<label className={styles.formLabel}>Chain</label>
											<select
												className={`${styles.formControl} ${
													escrow.errors.chainId ? styles.inputError : ''
												}`}
												{...escrow.register('chainId')}
											>
												<option value="">Select Chain</option>
												{chains.data &&
													chains.data?.length > 0 &&
													chains.data?.map((chain) => (
														<option key={chain.id} value={chain.id}>
															{chain.name}
														</option>
													))}
											</select>

											{escrow.errors.chainId && (
												<span className={styles.fieldError}>
													{escrow.errors.chainId.message}
												</span>
											)}
											<div className={styles.formHelp}>
												The blockchain network to be deployed
											</div>
										</div>

										<div className={styles.formGroup}>
											<label className={styles.formLabel}>
												Default Fee Rate (%)
											</label>
											<input
												type="number"
												step="0.01"
												min="0"
												max="100"
												className={`${styles.formControl} ${
													escrow.errors.defaultFeeRate ? styles.inputError : ''
												}`}
												{...escrow.register('defaultFeeRate')}
											/>
											{escrow.errors.defaultFeeRate && (
												<span className={styles.fieldError}>
													{escrow.errors.defaultFeeRate.message}
												</span>
											)}
											<div className={styles.formHelp}>
												The default fee rate charged on trades (0-100%)
											</div>
										</div>

										<div className={styles.formGroup}>
											<label className={styles.formLabel}>
												Default Profit Margin (%)
											</label>
											<input
												type="number"
												step="0.01"
												min="0"
												max="100"
												className={`${styles.formControl} ${
													escrow.errors.defaultProfitMargin
														? styles.inputError
														: ''
												}`}
												{...escrow.register('defaultProfitMargin')}
											/>
											{escrow.errors.defaultProfitMargin && (
												<span className={styles.fieldError}>
													{escrow.errors.defaultProfitMargin.message}
												</span>
											)}
											<div className={styles.formHelp}>
												The default profit margin for market makers (0-100%)
											</div>
										</div>

										<div className={styles.formGroup}>
											<label className={styles.formLabel}>
												Platform Wallet Address
											</label>
											<input
												type="text"
												placeholder="0x..."
												className={`${styles.formControl} ${
													escrow.errors.platformWallet ? styles.inputError : ''
												}`}
												{...escrow.register('platformWallet')}
											/>
											{escrow.errors.platformWallet && (
												<span className={styles.fieldError}>
													{escrow.errors.platformWallet.message}
												</span>
											)}
											<div className={styles.formHelp}>
												Ethereum address where platform fees will be collected
											</div>
										</div>
									</>
								)}

								<div className={styles.actionButtons}>
									<button
										type="submit"
										className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
										disabled={escrow.deploymentEscrowMutation.isPending}
									>
										{escrow.deploymentEscrowMutation.isPending
											? 'Updating Public Platform Settings...'
											: 'Update Public Platform Settings'}
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
