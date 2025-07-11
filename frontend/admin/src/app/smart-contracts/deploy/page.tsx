'use client';

import { useChains, useSmartContractDeployment } from '@/hooks';

import { DynamicIcon } from '@/components';
import React from 'react';
import { getLocaleFullDateString } from '@/utils/date';
import { humanizeCamelCase } from '@/utils';
import styles from './page.module.scss';

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
	const { chains } = useChains();

	const currentChain =
		chains.data &&
		chains.data.length > 0 &&
		watchedValues.chainId &&
		watchedValues.chainId?.length > 0
			? chains.data?.filter((chain) => chain.id === watchedValues.chainId)
			: null;

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
						{deploymentStats.data?.lastDeployedSmartContract?.deployedAt
							? getLocaleFullDateString(
									deploymentStats.data?.lastDeployedSmartContract?.deployedAt
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
							{deploymentStats.data?.lastDeployedSmartContract?.version
								? deploymentStats.data?.lastDeployedSmartContract?.version
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
									<label className={styles.formLabel}>Smart Contract</label>
									<select
										className={`${styles.formControl} ${
											errors.type ? styles.inputError : ''
										}`}
										{...register('type', {
											required: 'Smart Contract is required',
											minLength: 2
										})}
									>
										<option value="">Select Smart Contract</option>
										<option value="Escrow">Escrow</option>
										<option value="Premium">Premium Subscription</option>
									</select>

									{errors.type && (
										<span className={styles.fieldError}>
											{errors.type.message}
										</span>
									)}
									<div className={styles.formHelp}>
										The smart contract to be deployed to the blockchain
									</div>
								</div>

								{watchedValues.type === 'Escrow' && (
									<>
										<div className={styles.formGroup}>
											<label className={styles.formLabel}>Chain</label>
											<select
												className={`${styles.formControl} ${
													errors.chainId ? styles.inputError : ''
												}`}
												{...register('chainId')}
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

											{errors.chainId && (
												<span className={styles.fieldError}>
													{errors.chainId.message}
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
												{...register('defaultFeeRate')}
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
												{...register('defaultProfitMargin')}
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
												{...register('platformWallet')}
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
									</>
								)}

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
									<div className={styles.configValue}>
										{currentChain ? currentChain[0].name : 'Not set'}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className={styles.rightColumn}>
					{/* Deployment Result */}
					{deploymentMutation.data?.deployed && (
						<div className={styles.card}>
							<div className={styles.cardHeader}>Deployment Result</div>
							<div className={styles.cardContent}>
								<div className={styles.deploymentInfo}>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Contract Address
										</label>
										<div className={styles.contractAddress}>
											{deploymentMutation.data?.deployed?.address}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Deployment Hash
										</label>
										<div className={styles.transactionHash}>
											{deploymentMutation.data?.deployed?.deploymentHash}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Block Number
										</label>
										<div className={styles.deploymentValue}>
											{deploymentMutation.data?.deployed?.deploymentBlockHeight}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>Gas Used</label>
										<div className={styles.deploymentValue}>
											{deploymentMutation.data?.deployed?.gasUsed}
										</div>
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

					{/* Contract Deployed */}
					{deploymentStats.data?.lastDeployedSmartContract && (
						<div className={styles.card}>
							<div className={styles.cardHeader}>Contract Deployed</div>
							<div className={styles.cardContent}>
								<div className={styles.featureList}>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Deployed by
										</label>
										<div className={styles.deploymentValue}>
											{deploymentStats.data?.lastDeployedSmartContract
												.deployedBy?.username &&
												deploymentStats.data?.lastDeployedSmartContract
													.deployedBy?.username}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>
											Deployed At
										</label>
										<div className={styles.deploymentValue}>
											{deploymentStats.data?.lastDeployedSmartContract
												?.deployedAt &&
												getLocaleFullDateString(
													deploymentStats.data?.lastDeployedSmartContract
														?.deployedAt
												)}
										</div>
									</div>
									<div className={styles.deploymentDetail}>
										<label className={styles.deploymentLabel}>Version</label>
										<div className={styles.deploymentValue}>
											{deploymentStats.data?.lastDeployedSmartContract?.version}
										</div>
									</div>
									{deploymentStats.data?.lastDeployedSmartContract?.metadata
										?.parameters && (
										<>
											<label className={styles.deploymentLabel}>
												Parameters
											</label>
											<div className={styles.deploymentDetailRow}>
												{Object.entries(
													deploymentStats.data?.lastDeployedSmartContract
														?.metadata?.parameters
												).map(([key, value]: [string, any], index) => (
													<div className={styles.deploymentDetail} key={index}>
														<label className={styles.deploymentLabel}>
															{humanizeCamelCase(key)}
														</label>
														<div className={styles.deploymentValue}>
															{value}
														</div>
													</div>
												))}
											</div>
										</>
									)}
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
