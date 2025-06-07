'use client';

import React, { useEffect, useState } from 'react';
import { formatEnum, getInitials, toCapitalize, toUpperCase } from '@/utils';
import {
	formatTimestamp,
	getLocaleFullDateString,
	timeSince
} from '@/utils/date';

import styles from './page.module.scss';
import { useDispute } from '@/hooks';

const DisputeDetailsPage = () => {
	const { $dispute } = useDispute();

	// console.log({ $dispute });

	const [adminNotes, setAdminNotes] = useState('');
	const [resolutionType, setResolutionType] = useState('');
	const [resolutionNotes, setResolutionNotes] = useState('');
	const [buyerAction, setBuyerAction] = useState('No action');
	const [sellerAction, setSellerAction] = useState('No action');

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
		{ time: 'Dec 15, 2024 14:30', event: 'Trade initiated by john_crypto24' },
		{
			time: 'Dec 15, 2024 14:32',
			event: 'Payment instructions provided by mike_trader'
		},
		{ time: 'Dec 15, 2024 14:45', event: 'Buyer marked payment as sent' },
		{ time: 'Dec 15, 2024 15:15', event: 'Buyer uploaded payment receipt' },
		{ time: 'Dec 15, 2024 17:30', event: 'Dispute opened by john_crypto24' },
		{ time: 'Dec 15, 2024 17:35', event: 'Dispute assigned to Sarah Chen' }
	];

	const messages = [
		{
			user: 'john_crypto24',
			role: 'buyer',
			time: '14:46',
			message: 'Payment sent! Reference: BT240456789'
		},
		{
			user: 'mike_trader',
			role: 'seller',
			time: '15:20',
			message: "Haven't received it yet. Can you send bank statement?"
		},
		{
			user: 'john_crypto24',
			role: 'buyer',
			time: '15:22',
			message: 'Statement uploaded. Please check!'
		},
		{
			user: 'john_crypto24',
			role: 'buyer',
			time: '17:25',
			message: "It's been 3 hours. Please release the BTC or I'll open dispute."
		}
	];

	const evidence = [
		{ type: 'Bank Receipt', file: 'buyer_receipt.pdf', icon: '📄' },
		{ type: 'Bank Statement', file: 'statement_dec15.pdf', icon: '💳' },
		{ type: 'Transfer Screenshot', file: 'transfer_proof.jpg', icon: '📸' },
		{ type: 'Chat History', file: 'Exported automatically', icon: '💬' }
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

	const handleSaveNote = () => {
		alert('Note saved successfully!');
	};

	const handleSubmitResolution = () => {
		if (!resolutionType || !resolutionNotes) {
			alert('Please select a resolution type and add notes.');
			return;
		}
		if (window.confirm('Are you sure you want to submit this resolution?')) {
			alert('Resolution submitted successfully!');
		}
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
		console.log({ user });
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
						<h4>{user.username}</h4>
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

	const MessageItem = ({ user, role, time, message }) => (
		<div className={`${styles.message} ${styles[role]}`}>
			<div className={styles.messageHeader}>
				<span>
					{user} ({role.charAt(0).toUpperCase() + role.slice(1)})
				</span>
				<span>{time}</span>
			</div>
			<div>{message}</div>
		</div>
	);

	const EvidenceItem = ({ type, file, icon }) => (
		<div className={styles.evidenceItem}>
			<div className={styles.evidenceIcon}>{icon}</div>
			<div>{type}</div>
			<small>{file}</small>
		</div>
	);

	return (
		<div className={styles.container}>
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
							<div className={styles.alertWarning}>
								<strong>Reason:</strong> Buyer claims payment was sent but
								seller hasn't released crypto after 3 hours.
							</div>
							<p>
								<strong>Buyer's Statement:</strong>
							</p>
							<p>
								I sent the bank transfer at 2:30 PM today with reference number
								BT240456789. I have provided the receipt and bank confirmation.
								The seller is not responding to messages and hasn't released the
								Bitcoin. This is taking too long and I'm concerned about my
								payment.
							</p>

							<p style={{ marginTop: '16px' }}>
								<strong>Seller's Statement:</strong>
							</p>
							<p>
								I haven't received any payment in my account yet. The buyer
								provided a screenshot but I need to see the actual money in my
								account before releasing crypto. Bank transfers can take time
								and I want to be sure.
							</p>
						</div>
					</div>

					{/* Evidence */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Evidence Submitted</div>
						<div className={styles.cardContent}>
							<div className={styles.evidenceGrid}>
								{evidence.map((item, index) => (
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
								{messages.map((msg, index) => (
									<MessageItem key={index} {...msg} />
								))}
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
									onClick={() => handleQuickAction("Resolve in Buyer's Favor")}
								>
									Resolve in Buyer's Favor
								</button>
								<button
									className={`${styles.btn} ${styles.btnDanger}`}
									onClick={() => handleQuickAction("Resolve in Seller's Favor")}
								>
									Resolve in Seller's Favor
								</button>
							</div>
							<div className={styles.actionButtons}>
								<button
									className={`${styles.btn} ${styles.btnPrimary}`}
									onClick={() => handleQuickAction('Request More Evidence')}
								>
									Request More Evidence
								</button>
								<button
									className={`${styles.btn} ${styles.btnSecondary}`}
									onClick={handleEscalate}
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
						</div>
					</div>

					{/* Admin Notes */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Admin Notes</div>
						<div className={styles.cardContent}>
							<div className={styles.adminNotes}>
								<h4>Previous Notes:</h4>
								<p>
									Buyer has good track record. Payment receipt looks legitimate.
									Waiting for seller's bank to confirm receipt.
								</p>
							</div>
							<div className={styles.formGroup}>
								<label>Add New Note:</label>
								<textarea
									className={styles.formControl}
									placeholder="Enter your notes here..."
									value={adminNotes}
									onChange={(e) => setAdminNotes(e.target.value)}
								/>
							</div>
							<button
								className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
								onClick={handleSaveNote}
							>
								Save Note
							</button>
						</div>
					</div>

					{/* Blockchain Info */}
					<div className={styles.card}>
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
					</div>

					{/* Resolution Form */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Resolution Decision</div>
						<div className={styles.cardContent}>
							<div className={styles.formGroup}>
								<label>Resolution Type:</label>
								<select
									className={styles.formControl}
									value={resolutionType}
									onChange={(e) => setResolutionType(e.target.value)}
								>
									<option value="">Select resolution...</option>
									<option value="release">Release crypto to buyer</option>
									<option value="return">Return crypto to seller</option>
									<option value="partial">Partial refund</option>
									<option value="extend">Extend trade time</option>
								</select>
							</div>
							<div className={styles.formGroup}>
								<label>Resolution Notes:</label>
								<textarea
									className={styles.formControl}
									rows={4}
									placeholder="Explain your decision..."
									value={resolutionNotes}
									onChange={(e) => setResolutionNotes(e.target.value)}
								/>
							</div>
							<div className={styles.formGroup}>
								<label>
									<input type="checkbox" /> Notify both users
								</label>
							</div>
							<div className={styles.formGroup}>
								<label>
									<input type="checkbox" /> Log admin action
								</label>
							</div>
							<button
								className={`${styles.btn} ${styles.btnPrimary} ${styles.fullWidth}`}
								onClick={handleSubmitResolution}
							>
								Submit Resolution
							</button>
						</div>
					</div>

					{/* User Actions */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>User Management</div>
						<div className={styles.cardContent}>
							<div className={styles.formGroup}>
								<label>Actions for {disputeData.buyer.username}:</label>
								<select
									className={styles.formControl}
									value={buyerAction}
									onChange={(e) => setBuyerAction(e.target.value)}
								>
									<option>No action</option>
									<option>Send warning</option>
									<option>Temporary suspension</option>
									<option>Account review</option>
								</select>
							</div>
							<div className={styles.formGroup}>
								<label>Actions for {disputeData.seller.username}:</label>
								<select
									className={styles.formControl}
									value={sellerAction}
									onChange={(e) => setSellerAction(e.target.value)}
								>
									<option>No action</option>
									<option>Send warning</option>
									<option>Temporary suspension</option>
									<option>Account review</option>
								</select>
							</div>
							<button
								className={`${styles.btn} ${styles.btnSecondary} ${styles.fullWidth}`}
								onClick={() => alert('User actions applied successfully!')}
							>
								Apply User Actions
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DisputeDetailsPage;
