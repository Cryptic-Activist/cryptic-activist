'use client';

import React, { useState } from 'react';

import { DynamicIcon } from '@/components';
import { getLocaleFullDateString } from '@/utils/date';
import styles from './page.module.scss';
import { useForm } from 'react-hook-form';
import { useSmartContractDeployment } from '@/hooks';

const SmartContractDeploymentPage = () => {
	const {
		errors,
		watchedValues,
		deploymentMutation,
		deploymentStats,
		handleReset,
		handleSubmit,
		onSubmit,
		register
	} = useSmartContractDeployment();

	return (
		<div className={styles.container}>
			{/* Header */}
			<div className={styles.header}>
				<h1 className={styles.pageTitle}>Smart Contract Deployment</h1>
				<div className={styles.statusRow}>
					<span
						className={`${styles.statusBadge} ${
							styles[deploymentMutation.isPending ? 'PENDING' : 'READY']
						}`}
					>
						{deploymentMutation.isPending ? 'DEPLOYING' : 'READY TO DEPLOY'}
					</span>
					<span className={styles.timeStamp}>
						{deploymentStats.data?.lastDeployedSmartContract
							? getLocaleFullDateString(
									deploymentStats.data?.lastDeployedSmartContract
							  )
							: 'No smart contract deployed yet'}
					</span>
				</div>
				<div className={styles.metaInfo}>
					<div className={styles.metaInfoItem}>
						<strong className={styles.metaInfoLabel}>Network:</strong>
						<span className={styles.metaInfoValue}>
							{deploymentStats.data?.chain?.name}
						</span>
					</div>
					<div className={styles.metaInfoItem}>
						<strong className={styles.metaInfoLabel}>Gas Price:</strong>
						<span className={styles.metaInfoValue}>
							{deploymentStats.data?.gasPrice}
						</span>
					</div>
					{/* <div className={styles.metaInfoItem}>
						<strong className={styles.metaInfoLabel}>Estimated Cost:</strong>
						<span className={styles.metaInfoValue}>0.015 ETH</span>
					</div> */}
					<div className={styles.metaInfoItem}>
						<strong className={styles.metaInfoLabel}>Current Version:</strong>
						<span className={styles.metaInfoValue}>
							{deploymentStats.data?.currentVersion
								? deploymentStats.data?.currentVersion
								: 'Unavailable'}
						</span>
					</div>
				</div>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.leftColumn}>
					{/* Deployment Form */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Contract Configuration</div>
						<div className={styles.cardContent}>
							{deploymentMutation.isSuccess && (
								<div className={styles.successMessage}>
									<strong>✅ Deployment Successful!</strong> Your smart contract
									has been deployed successfully.
								</div>
							)}

							{deploymentMutation?.isError && (
								<div className={styles.errorMessage}>
									<strong>❌ Deployment Failed:</strong>{' '}
									{deploymentMutation.data}
								</div>
							)}

							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={styles.formGroup}>
									<label className={styles.formLabel}>Chain</label>
									<select
										className={`${styles.formControl} ${
											errors.defaultFeeRate ? styles.inputError : ''
										}`}
									>
										<option>Ethereum</option>
										<option>Polygon</option>
									</select>

									{errors.defaultFeeRate && (
										<span className={styles.fieldError}>
											{errors.defaultFeeRate.message}
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
											errors.defaultFeeRate ? styles.inputError : ''
										}`}
										{...register('defaultFeeRate', {
											required: 'Fee rate is required',
											min: { value: 0, message: 'Fee rate must be positive' },
											max: {
												value: 100,
												message: 'Fee rate cannot exceed 100%'
											}
										})}
									/>
									{errors.defaultFeeRate && (
										<span className={styles.fieldError}>
											{errors.defaultFeeRate.message}
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
											errors.defaultProfitMargin ? styles.inputError : ''
										}`}
										{...register('defaultProfitMargin', {
											required: 'Profit margin is required',
											min: {
												value: 0,
												message: 'Profit margin must be positive'
											},
											max: {
												value: 100,
												message: 'Profit margin cannot exceed 100%'
											}
										})}
									/>
									{errors.defaultProfitMargin && (
										<span className={styles.fieldError}>
											{errors.defaultProfitMargin.message}
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
											errors.platformWallet ? styles.inputError : ''
										}`}
										{...register('platformWallet', {
											required: 'Platform wallet address is required',
											pattern: {
												value: /^0x[a-fA-F0-9]{40}$/,
												message: 'Invalid Ethereum address format'
											}
										})}
									/>
									{errors.platformWallet && (
										<span className={styles.fieldError}>
											{errors.platformWallet.message}
										</span>
									)}
									<div className={styles.formHelp}>
										Ethereum address where platform fees will be collected
									</div>
								</div>

								<div className={styles.actionButtons}>
									<button
										type="submit"
										className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
										disabled={deploymentMutation.isPending}
									>
										{deploymentMutation.isPending
											? 'Deploying Contract...'
											: 'Deploy Smart Contract'}
									</button>

									<button
										type="button"
										className={`${styles.btn} ${styles.btnSecondary} ${styles.fullWidth}`}
										onClick={handleReset}
										disabled={deploymentMutation.isPending}
									>
										Reset Form
									</button>
								</div>
							</form>
						</div>
					</div>

					{/* Current Configuration Preview */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Configuration Preview</div>
						<div className={styles.cardContent}>
							<div className={styles.configGrid}>
								<div className={styles.configItem}>
									<div className={styles.configLabel}>Fee Rate</div>
									<div className={styles.configValue}>
										{watchedValues.defaultFeeRate}%
									</div>
								</div>
								<div className={styles.configItem}>
									<div className={styles.configLabel}>Profit Margin</div>
									<div className={styles.configValue}>
										{watchedValues.defaultProfitMargin}%
									</div>
								</div>
								<div className={styles.configItem}>
									<div className={styles.configLabel}>Platform Wallet</div>
									<div className={styles.configValue}>
										{watchedValues.platformWallet || 'Not set'}
									</div>
								</div>
								<div className={styles.configItem}>
									<div className={styles.configLabel}>Network</div>
									<div className={styles.configValue}>Ethereum Mainnet</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className={styles.rightColumn}>
					{/* Deployment Result */}
					{deploymentMutation.data && (
						<div className={styles.card}>
							<div className={styles.cardHeader}>Deployment Result</div>
							<div className={styles.cardContent}>
								<div className={styles.deploymentInfo}>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Contract Address
										</label>
										<div className={styles.contractAddress}>
											{deploymentMutation.data.contractAddress}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Transaction Hash
										</label>
										<div className={styles.transactionHash}>
											{deploymentMutation.data.transactionHash}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Block Number
										</label>
										<div className={styles.deploymentValue}>18,645,392</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>Gas Used</label>
										<div className={styles.deploymentValue}>2,456,789</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Network Information */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Network Information</div>
						<div className={styles.cardContent}>
							<div className={styles.deploymentInfo}>
								<div className={styles.deploymentDetail}>
									<label className={styles.deploymentLabel}>Chain ID</label>
									<div className={styles.deploymentValue}>
										{deploymentStats.data?.chain?.chainId}
									</div>
								</div>
								<div className={styles.deploymentDetail}>
									<label className={styles.deploymentLabel}>
										Current Block
									</label>
									<div className={styles.deploymentValue}>
										{deploymentStats.data?.blockHeight}
									</div>
								</div>
								<div className={styles.deploymentDetail}>
									<label className={styles.deploymentLabel}>Gas Price</label>
									<div className={styles.deploymentValue}>
										{deploymentStats.data?.gasPrice}
									</div>
								</div>
								<div className={styles.deploymentDetail}>
									<label className={styles.deploymentLabel}>ETH Price</label>
									<div className={styles.deploymentValue}>
										{deploymentStats.data?.price}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Contract Features */}
					{deploymentStats.data?.lastDeployedSmartContract && (
						<div className={styles.card}>
							<div className={styles.cardHeader}>Contract Deployed</div>
							<div className={styles.cardContent}>
								<div className={styles.featureList}>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>Name</label>
										<div className={styles.deploymentValue}>
											{deploymentStats.data?.lastDeployedSmartContract.name}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Deployed by
										</label>
										<div className={styles.deploymentValue}>
											{
												deploymentStats.data?.lastDeployedSmartContract
													.deployedBy?.username
											}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Deployed At
										</label>
										<div className={styles.deploymentValue}>
											{
												deploymentStats.data?.lastDeployedSmartContract
													.deployedAt
											}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>Version</label>
										<div className={styles.deploymentValue}>
											{deploymentStats.data?.lastDeployedSmartContract.version}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SmartContractDeploymentPage;
