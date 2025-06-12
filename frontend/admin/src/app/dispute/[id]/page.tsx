'use client';

import { DynamicIcon, Viewer } from '@/components';
import { Evidence, Message } from './types';
import React, { useState } from 'react';
import { formatEnum, getInitials, toCapitalize, toUpperCase } from '@/utils';
import { getLocaleFullDateString, timeSince } from '@/utils/date';
import { useDispute, useOutsideClick } from '@/hooks';

import styles from './page.module.scss';

const DisputeDetailsPage = () => {
	const {
		$dispute,
		previousDisputePartyNotes,
		resolutionTypesQuery,
		userManagementActionsQuery,
		cancelTradeByModeratorMutation,
		requestMoreEvidencesMutation,
		resolveInTraderFavorMutation,
		resolveInVendorFavorMutation,
		escalateToSeniorAdminMutation,
		registerDisputeNotes,
		handleSubmitDisputeNotes,
		onSubmitDisputeNotes,
		registerResolution,
		handleSubmitResolution,
		onSubmitResolutionNotes,
		registerUserManagement,
		handleSubmitUserManagement,
		onSubmitUserManagement
	} = useDispute();

	const [adminNotes, setAdminNotes] = useState('');
	const [resolutionNotes, setResolutionNotes] = useState('');
	const [buyerAction, setBuyerAction] = useState('No action');
	const [sellerAction, setSellerAction] = useState('No action');
	const [fileSrc, setFileSrc] = useState<string>();
	const [fileOpen, setFileOpen] = useState(false);

	const openFileViewer = (src: string) => {
		setFileOpen(true);
		setFileSrc(src);
	};
	const closeFileViewer = () => {
		setFileOpen(false);
		setFileSrc(undefined);
	};

	// Mock dispute data
	const disputeData = {
		id: 'DSP-2024-1573',
		tradeId: 'TRD-2024-89456',
		status: 'open',
		priority: 'high',
		category: 'Payment Not Received',
		assignedAdmin: 'Sarah Chen',
		createdAt: '2 hours ago',
		lastUpdated: '15 minutes ago',
		trade: {
			cryptoAmount: '0.15 BTC',
			fiatAmount: '$6,750.00 USD',
			exchangeRate: '$45,000.00',
			type: 'Buy BTC',
			paymentMethod: 'Bank Transfer',
			startedAt: 'Dec 15, 2024 14:30'
		},
		buyer: {
			username: 'john_crypto24',
			avatar: 'JD',
			rating: 4.9,
			trades: 127,
			successRate: 98
		},
		seller: {
			username: 'mike_trader',
			avatar: 'MT',
			rating: 4.7,
			trades: 89,
			successRate: 95
		},
		blockchain: {
			escrowAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
			txHash: 'a1b2c3d4e5f6789...xyz',
			confirmations: '6/6'
		}
	};

	const timeline = [
		{
			time: $dispute?.trade?.createdAt
				? getLocaleFullDateString(new Date($dispute?.trade?.createdAt))
				: '',
			event: `Trade initiated by ${$dispute.trade?.trader?.username}`
		},
		{
			time: $dispute.trade?.fundedAt
				? getLocaleFullDateString(new Date($dispute?.trade?.fundedAt))
				: '',
			event: 'Trade was funded'
		},
		{
			time: $dispute.trade?.paidAt
				? getLocaleFullDateString(new Date($dispute?.trade?.paidAt))
				: '',
			event: `${$dispute.trade?.trader?.username} marked payment as sent`
		},
		...($dispute.trade?.paymentReceipt?.createdAt
			? [
					{
						time: $dispute.trade?.paymentReceipt?.createdAt,
						event: `${$dispute.trade?.trader?.username} uploaded payment receipt`
					}
			  ]
			: []),

		{
			time: $dispute?.createdAt
				? getLocaleFullDateString(new Date($dispute?.createdAt))
				: '',
			event: `Dispute opened by ${$dispute.raisedBy?.username}`
		},
		{
			time: $dispute?.updatedAt
				? getLocaleFullDateString(new Date($dispute?.updatedAt))
				: '',
			event: `Dispute assigned to ${$dispute.moderator?.firstName} ${$dispute.moderator?.lastName}`
		}
	];
	const handleQuickAction = (action) => {
		const confirmMessage = `Are you sure you want to ${action.toLowerCase()}?`;
		if (window.confirm(confirmMessage)) {
			alert(`${action} submitted successfully!`);
		}
	};

	const handleEscalate = () => {
		alert('Dispute escalated to senior admin.');
	};

	const handleContactUsers = () => {
		alert('Messages sent to both users.');
	};

	const StatusBadge = ({ status, priority }) => (
		<div className={styles.statusRow}>
			<span
				className={`${styles.statusBadge} ${
					styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]
				}`}
			>
				{toUpperCase($dispute.status)}
			</span>
			<span
				className={`${styles.statusBadge} ${
					styles[
						`priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`
					]
				}`}
			>
				{toUpperCase($dispute.priority)} PRIORITY
			</span>
			<span className={styles.timeStamp}>
				Created {timeSince($dispute.createdAt)}
			</span>
		</div>
	);

	const UserCard = ({ user, role }) => {
		return (
			<div className={styles.userCard}>
				<div className={styles.userHeader}>
					<div
						className={styles.userAvatar}
						style={{ backgroundColor: user?.profileColor }}
					>
						{user && getInitials(user?.firstName, user?.lastName)}
					</div>
					<div className={styles.userInfo}>
						<h4>{user?.username}</h4>
						<div className={styles.userRole}>{role}</div>
					</div>
				</div>
				{/* <div className={styles.userStats}>
				<div className={styles.stat}>
					<div className={styles.statValue}>{user.rating}</div>
					<div className={styles.statLabel}>Rating</div>
				</div>
				<div className={styles.stat}>
					<div className={styles.statValue}>{user.trades}</div>
					<div className={styles.statLabel}>Trades</div>
				</div>
				<div className={styles.stat}>
					<div className={styles.statValue}>{user.successRate}%</div>
					<div className={styles.statLabel}>Success</div>
				</div>
			</div> */}
			</div>
		);
	};

	const TimelineItem = ({ time, event }) => (
		<div className={styles.timelineItem}>
			<div className={styles.timelineTime}>{time}</div>
			<div className={styles.timelineContent}>{event}</div>
		</div>
	);

	const MessageItem = (message: Message) => {
		if (message.type === 'info') return null;

		const username =
			message.from === $dispute.trade?.trader?.id
				? $dispute.trade?.trader?.username
				: $dispute.trade?.vendor?.username;

		return (
			<div className={`${styles.message}`}>
				<div className={styles.messageHeader}>
					<span>{username}</span>
					<span>
						{message.createdAt
							? getLocaleFullDateString(new Date(message.createdAt))
							: ''}
					</span>
				</div>
				<div>{message.message}</div>
			</div>
		);
	};

	const EvidenceItem = (evidence: Evidence) => {
		const split = evidence.fileUrl.split('/');
		const filename = split[split.length - 1];
		const fileExt = filename.split('.')[1];
		const fileType = fileExt === 'pdf' ? 'PDF' : 'Image';
		return (
			<button
				className={styles.evidenceItem}
				onClick={() => openFileViewer(evidence.fileUrl)}
			>
				{fileType === 'PDF' ? (
					<DynamicIcon iconName="MdPictureAsPdf" size={45} color="#000" />
				) : (
					<div
						className={styles.evidenceImage}
						style={{
							backgroundImage: `url(${evidence.fileUrl})`
						}}
					/>
				)}
				<div>{fileType}</div>
			</button>
		);
	};

	const viewerRef = useOutsideClick(closeFileViewer);

	return (
		<div className={styles.container}>
			{fileOpen && (
				<Viewer src={fileSrc} ref={viewerRef} onClose={closeFileViewer} />
			)}
			{/* Header */}
			<div className={styles.header}>
				<h1 className={styles.disputeId}>Dispute {$dispute.id}</h1>
				<StatusBadge
					status={disputeData.status}
					priority={disputeData.priority}
				/>
				<div className={styles.metaInfo}>
					<div>
						<strong>Trade ID:</strong> <span>{$dispute.trade?.id}</span>
					</div>
					<div>
						<strong>Type:</strong> {formatEnum($dispute.type)}
					</div>
					<div>
						<strong>Assigned Admin:</strong>{' '}
						{`${$dispute.moderator?.firstName} ${$dispute.moderator?.lastName}`}
					</div>
					<div>
						<strong>Last Updated:</strong> {timeSince($dispute.updatedAt)}
					</div>
				</div>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.leftColumn}>
					{/* Trade Overview */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Trade Overview</div>
						<div className={styles.cardContent}>
							<div className={styles.tradeOverview}>
								<div className={styles.tradeDetail}>
									<label>Crypto Amount</label>
									<div className={`${styles.value} ${styles.cryptoAmount}`}>
										{`${$dispute.trade?.cryptocurrencyAmount} ${toUpperCase(
											$dispute.trade?.cryptocurrency.symbol
										)}`}
									</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Fiat Amount</label>
									<div className={`${styles.value} ${styles.fiatAmount}`}>
										{`${$dispute.trade?.fiatAmount} ${toUpperCase(
											$dispute.trade?.fiat.symbol
										)}`}
									</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Exchange Rate</label>
									<div className={styles.value}>
										{`${$dispute.trade?.exchangeRate} ${toUpperCase(
											$dispute.trade?.fiat.symbol
										)}`}
									</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Trade Type</label>
									<div className={styles.value}>
										{`${toCapitalize(
											$dispute.trade?.offer?.offerType ?? ''
										)} ${toUpperCase($dispute.trade?.cryptocurrency?.symbol)}`}
									</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Payment Method</label>
									<div className={styles.value}>
										{$dispute.trade?.offer?.paymentMethod?.name}
									</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Trade Started</label>
									<div className={styles.value}>
										{$dispute.trade?.startedAt &&
											getLocaleFullDateString(
												new Date($dispute.trade?.startedAt)
											)}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Users Involved */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Users Involved</div>
						<div className={styles.cardContent}>
							<div className={styles.userCards}>
								<UserCard user={$dispute.trade?.trader} role="Trader" />
								<UserCard user={$dispute.trade?.vendor} role="Vendor" />
							</div>
						</div>
					</div>

					{/* Dispute Details */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Dispute Details</div>
						<div className={styles.cardContent}>
							{/* <div className={styles.alertWarning}>
								<strong>Reason:</strong> Buyer claims payment was sent but
								seller hasn't released crypto after 3 hours.
							</div> */}
							<p>
								<strong>Trader's Statement:</strong>
							</p>
							<p>
								{$dispute?.traderStatement
									? $dispute?.traderStatement
									: 'No statement found'}
							</p>

							<p style={{ marginTop: '16px' }}>
								<strong>Vendor's Statement:</strong>
							</p>
							<p>
								{$dispute?.vendorStatement
									? $dispute?.vendorStatement
									: 'No statement found'}
							</p>
						</div>
					</div>

					{/* Evidence */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Evidence Submitted</div>
						<div className={styles.cardContent}>
							<div className={styles.evidenceGrid}>
								{$dispute.evidences &&
									$dispute.evidences?.map((item, index) => (
										<EvidenceItem key={index} {...item} />
									))}
							</div>
						</div>
					</div>

					{/* Timeline */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Timeline</div>
						<div className={styles.cardContent}>
							<div className={styles.timeline}>
								{timeline.map((item, index) => (
									<TimelineItem
										key={index}
										time={item.time}
										event={item.event}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Chat Messages */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Recent Chat Messages</div>
						<div className={styles.cardContent}>
							<div className={styles.chatMessages}>
								{$dispute.trade?.chat?.messages &&
								$dispute.trade?.chat?.messages?.length > 0 ? (
									<>
										{$dispute.trade?.chat?.messages?.map((msg, index) => (
											<MessageItem key={index} {...msg} />
										))}
									</>
								) : (
									<span>No chat messages</span>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className={styles.rightColumn}>
					{/* Quick Actions */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Quick Actions</div>
						<div className={styles.cardContent}>
							<div className={styles.actionButtons}>
								<button
									className={`${styles.btn} ${styles.btnSuccess}`}
									onClick={() => resolveInTraderFavorMutation.mutate()}
								>
									Resolve in Trader's Favor
								</button>
								<button
									className={`${styles.btn} ${styles.btnDanger}`}
									onClick={() => resolveInVendorFavorMutation.mutate()}
								>
									Resolve in Vendor's Favor
								</button>
							</div>
							<div className={styles.actionButtons}>
								<button
									className={`${styles.btn} ${styles.btnPrimary}`}
									onClick={() => requestMoreEvidencesMutation.mutate()}
								>
									Request More Evidence
								</button>
								<button
									className={`${styles.btn} ${styles.btnSecondary}`}
									onClick={() => escalateToSeniorAdminMutation.mutate()}
								>
									Escalate to Senior Admin
								</button>
							</div>
							<button
								className={`${styles.btn} ${styles.btnSecondary} ${styles.fullWidth}`}
								onClick={handleContactUsers}
							>
								Contact Both Users
							</button>
							<button
								className={`${styles.btn} ${styles.btnDanger} ${styles.fullWidth}`}
								style={{ marginTop: '12px' }}
								onClick={() => cancelTradeByModeratorMutation.mutate()}
							>
								Cancel Trade
							</button>
						</div>
					</div>

					{/* Admin Notes */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Admin Notes</div>
						<div className={styles.cardContent}>
							<h4>Previous Notes:</h4>
							<div className={styles.adminNotes}>
								<h4>{$dispute.trade?.trader?.username} notes:</h4>
								<p>
									{console.log(previousDisputePartyNotes)}
									{previousDisputePartyNotes?.trader !== null
										? previousDisputePartyNotes?.trader?.content
										: 'No previous notes found'}
								</p>
							</div>
							<div className={styles.adminNotes}>
								<h4>{$dispute.trade?.vendor?.username} notes:</h4>
								<p>
									{previousDisputePartyNotes?.vendor !== null
										? previousDisputePartyNotes?.vendor?.content
										: 'No previous notes found'}
								</p>
							</div>
							<form onSubmit={handleSubmitDisputeNotes(onSubmitDisputeNotes)}>
								<div className={styles.formGroup}>
									<label>New Note To:</label>
									<select
										className={styles.formControl}
										{...registerDisputeNotes('userId', {
											required: true
										})}
									>
										<option value="">Select user...</option>
										<option value={$dispute.trade?.trader?.id}>
											{$dispute.trade?.trader?.username}
										</option>
										<option value={$dispute.trade?.vendor?.id}>
											{$dispute.trade?.vendor?.username}
										</option>
									</select>
								</div>
								<div className={styles.formGroup}>
									<label>Add New Note:</label>
									<textarea
										className={styles.formControl}
										placeholder="Enter your notes here..."
										{...registerDisputeNotes('content', {
											required: true
										})}
									/>
								</div>
								<button
									className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
									type="submit"
								>
									Save Note
								</button>
							</form>
						</div>
					</div>

					{/* Blockchain Info */}
					{/* <div className={styles.card}>
						<div className={styles.cardHeader}>Blockchain Information</div>
						<div className={styles.cardContent}>
							<div className={styles.blockchainInfo}>
								<h4>Escrow Address:</h4>
								<div className={styles.hash}>
									{disputeData.blockchain.escrowAddress}
								</div>

								<h4>Transaction Hash:</h4>
								<div className={styles.hash}>
									{disputeData.blockchain.txHash}
								</div>

								<h4>Confirmations:</h4>
								<div>{disputeData.blockchain.confirmations} Confirmed ✅</div>
							</div>
						</div>
					</div> */}

					{/* Resolution Form */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Resolution Decision</div>
						<div className={styles.cardContent}>
							<form onSubmit={handleSubmitResolution(onSubmitResolutionNotes)}>
								<div className={styles.formGroup}>
									<label>Resolution Type:</label>
									<select
										className={styles.formControl}
										{...registerResolution('resolutionType', {
											required: true
										})}
									>
										<option value="">Select resolution...</option>
										{resolutionTypesQuery?.data?.map(
											(filter: any, index: number) => (
												<option value={filter} key={index}>
													{formatEnum(filter)}
												</option>
											)
										)}
									</select>
								</div>
								<div className={styles.formGroup}>
									<label>Resolution Notes:</label>
									<textarea
										className={styles.formControl}
										rows={4}
										placeholder="Explain your decision..."
										{...registerResolution('resolutionNote', {
											required: true
										})}
									/>
								</div>
								<div className={styles.formGroup}>
									<label>
										<input
											type="checkbox"
											{...registerResolution('notifyBothUsers', {
												required: true
											})}
										/>{' '}
										Notify both users
									</label>
								</div>
								<div className={styles.formGroup}>
									<label>
										<input
											type="checkbox"
											{...registerResolution('logAdminAction', {
												required: true
											})}
										/>{' '}
										Log admin action
									</label>
								</div>
								<button
									className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
									type="submit"
								>
									Submit Resolution
								</button>
							</form>
						</div>
					</div>

					{/* User Actions */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>User Management</div>
						<div className={styles.cardContent}>
							<form
								onSubmit={handleSubmitUserManagement(onSubmitUserManagement)}
							>
								<div className={styles.formGroup}>
									<label>Actions for {$dispute.trade?.vendor?.username}:</label>
									<select
										className={styles.formControl}
										{...registerUserManagement('actionForVendor', {
											required: true
										})}
									>
										{userManagementActionsQuery?.data?.map(
											(filter: any, index: number) => (
												<option value={filter} key={index}>
													{formatEnum(filter)}
												</option>
											)
										)}
									</select>
								</div>
								<div className={styles.formGroup}>
									<label>Actions for {$dispute.trade?.trader?.username}:</label>
									<select
										className={styles.formControl}
										{...registerUserManagement('actionForTrader', {
											required: true
										})}
									>
										{userManagementActionsQuery?.data?.map(
											(filter: any, index: number) => (
												<option value={filter} key={index}>
													{formatEnum(filter)}
												</option>
											)
										)}
									</select>
								</div>
								<button
									className={`${styles.btn} ${styles.btnSecondary} ${styles.fullWidth}`}
									type="submit"
								>
									Apply User Actions
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DisputeDetailsPage;
