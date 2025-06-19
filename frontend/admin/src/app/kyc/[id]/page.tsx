'use client';

import {
	Document,
	Message,
	StatusBadgeProps,
	TimelineItemProps,
	UserCardProps
} from './types';
import { DynamicIcon, Viewer } from '@/components';
import React, { FC, useRef, useState } from 'react';
import { formatEnum, getInitials, toCapitalize, toUpperCase } from '@/utils';
import {
	formatFullDate,
	getLocaleFullDateString,
	timeSince
} from '@/utils/date';
import { useDispute, useKYC, useOutsideClick } from '@/hooks';

import styles from './page.module.scss';

const KYCDetaisPage = () => {
	const { $kyc, approveKYCMutation, rejectKYCMutation } = useKYC();

	console.log({ $kyc });

	const [fileSrc, setFileSrc] = useState<string>();
	const [fileOpen, setFileOpen] = useState(false);

	// const requestEvidencesFromRef = useOutsideClick(toggleRequestedFrom);

	const openFileViewer = (src?: string) => {
		setFileOpen(true);
		setFileSrc(src);
	};
	const closeFileViewer = () => {
		setFileOpen(false);
		setFileSrc(undefined);
	};

	// const hasResolutionNote =
	// 	$kyc?.resolutionType &&
	// 	$kyc?.resolutionType?.length > 0 &&
	// 	$kyc?.resolutionNote &&
	// 	$kyc.resolutionNote?.length > 0;

	// const timeline = [
	// 	{
	// 		time: $kyc?.trade?.createdAt
	// 			? getLocaleFullDateString(new Date($kyc?.trade?.createdAt))
	// 			: '',
	// 		event: `Trade initiated by ${$kyc.trade?.trader?.username}`
	// 	},
	// 	{
	// 		time: $kyc.trade?.fundedAt
	// 			? getLocaleFullDateString(new Date($kyc?.trade?.fundedAt))
	// 			: '',
	// 		event: 'Trade was funded'
	// 	},
	// 	{
	// 		time: $kyc.trade?.paidAt
	// 			? getLocaleFullDateString(new Date($kyc?.trade?.paidAt))
	// 			: '',
	// 		event: `${$kyc.trade?.trader?.username} marked payment as sent`
	// 	},
	// 	...($kyc.trade?.paymentReceipt?.createdAt
	// 		? [
	// 				{
	// 					time: $kyc.trade?.paymentReceipt?.createdAt,
	// 					event: `${$kyc.trade?.trader?.username} uploaded payment receipt`
	// 				}
	// 		  ]
	// 		: []),

	// 	{
	// 		time: $kyc?.createdAt
	// 			? getLocaleFullDateString(new Date($kyc?.createdAt))
	// 			: '',
	// 		event: `Dispute opened by ${$kyc.raisedBy?.username}`
	// 	},
	// 	{
	// 		time: $kyc?.updatedAt
	// 			? getLocaleFullDateString(new Date($kyc?.updatedAt))
	// 			: '',
	// 		event: `Dispute assigned to ${$kyc.moderator?.firstName} ${$kyc.moderator?.lastName}`
	// 	}
	// ];

	const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
		<div className={styles.statusRow}>
			<span className={`${styles.statusBadge} ${styles[status]}`}>
				{toUpperCase($kyc.status)}
			</span>
		</div>
	);

	// const UserCard: FC<UserCardProps> = ({ user, role, winner, loser }) => {
	// 	return (
	// 		<div className={styles.userCard}>
	// 			<div className={styles.userHeader}>
	// 				<div
	// 					className={styles.userAvatar}
	// 					style={{ backgroundColor: user?.profileColor }}
	// 				>
	// 					{user && getInitials(user?.firstName, user?.lastName)}
	// 				</div>
	// 				<div className={styles.userInfo}>
	// 					<div className={styles.usernameRole}>
	// 						<h4>{user?.username}</h4>
	// 						<div className={styles.userRole}>{role}</div>
	// 					</div>
	// 					{winner?.id && winner?.id === user?.id && (
	// 						<span
	// 							className={`${styles.statusBadge} ${styles.statusResolved}`}
	// 						>
	// 							Winner
	// 						</span>
	// 					)}
	// 					{loser?.id && loser?.id === user?.id && (
	// 						<span className={`${styles.statusBadge} ${styles.priorityHigh}`}>
	// 							Loser
	// 						</span>
	// 					)}
	// 				</div>
	// 			</div>
	// 			{/* <div className={styles.userStats}>
	// 			<div className={styles.stat}>
	// 				<div className={styles.statValue}>{user.rating}</div>
	// 				<div className={styles.statLabel}>Rating</div>
	// 			</div>
	// 			<div className={styles.stat}>
	// 				<div className={styles.statValue}>{user.trades}</div>
	// 				<div className={styles.statLabel}>Trades</div>
	// 			</div>
	// 			<div className={styles.stat}>
	// 				<div className={styles.statValue}>{user.successRate}%</div>
	// 				<div className={styles.statLabel}>Success</div>
	// 			</div>
	// 		</div> */}
	// 		</div>
	// 	);
	// };

	// const TimelineItem: FC<TimelineItemProps> = ({ time, event }) => (
	// 	<div className={styles.timelineItem}>
	// 		<div className={styles.timelineTime}>{time}</div>
	// 		<div className={styles.timelineContent}>{event}</div>
	// 	</div>
	// );

	// const RequestEvidencesFrom = () => {
	// 	const canRequestEvidenceToTraderFilter =
	// 		$kyc.disputeEvidenceRequest?.filter(
	// 			(request) => request.requestedFromId === $kyc.trade?.trader.id
	// 		);
	// 	const canRequestEvidenceToVendorFilter =
	// 		$kyc.disputeEvidenceRequest?.filter(
	// 			(request) => request.requestedFromId === $kyc.trade?.vendor.id
	// 		);
	// 	const canRequestEvidenceToTrader =
	// 		canRequestEvidenceToTraderFilter &&
	// 		canRequestEvidenceToTraderFilter.length === 0;
	// 	const canRequestEvidenceToVendor =
	// 		canRequestEvidenceToVendorFilter &&
	// 		canRequestEvidenceToVendorFilter.length === 0;

	// 	return (
	// 		<div
	// 			className={styles.requestEvidencesFrom}
	// 			ref={requestEvidencesFromRef}
	// 		>
	// 			{!canRequestEvidenceToTrader && !canRequestEvidenceToVendor && (
	// 				<span>Can not request more evidences</span>
	// 			)}
	// 			{canRequestEvidenceToTrader && (
	// 				<button
	// 					className={styles.trader}
	// 					onClick={() => requestMoreEvidencesMutation.mutate('trader')}
	// 				>
	// 					Trader
	// 				</button>
	// 			)}
	// 			{canRequestEvidenceToVendor && (
	// 				<button
	// 					className={styles.vendor}
	// 					onClick={() => requestMoreEvidencesMutation.mutate('vendor')}
	// 				>
	// 					Vendor
	// 				</button>
	// 			)}
	// 		</div>
	// 	);
	// };

	// const MessageItem = (message: Message) => {
	// 	if (message.type === 'info') return null;

	// 	const username =
	// 		message.from === $kyc.trade?.trader?.id
	// 			? $kyc.trade?.trader?.username
	// 			: $kyc.trade?.vendor?.username;

	// 	return (
	// 		<div className={`${styles.message}`}>
	// 			<div className={styles.messageHeader}>
	// 				<span>{username}</span>
	// 				<span>
	// 					{message.createdAt
	// 						? getLocaleFullDateString(new Date(message.createdAt))
	// 						: ''}
	// 				</span>
	// 			</div>
	// 			<div>{message.message}</div>
	// 		</div>
	// 	);
	// };

	const SubmittedDocumentItem = (document: Document) => {
		const split = document.file?.key?.split('/');
		const filename = split ? split[split.length - 1] : '';
		const fileExt = filename.split('.')[1];
		const fileType = fileExt === 'pdf' ? 'PDF' : 'Image';
		return (
			<button
				className={styles.evidenceItem}
				onClick={() => openFileViewer(document?.file?.key)}
			>
				{fileType === 'PDF' ? (
					<DynamicIcon iconName="MdPictureAsPdf" size={45} color="#000" />
				) : (
					<div
						className={styles.evidenceImage}
						style={{
							backgroundImage: `url(${document.file?.key})`
						}}
					/>
				)}
				<div>{document.type}</div>
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
				<h1 className={styles.disputeId}>KYC Application</h1>
				{$kyc.status && <StatusBadge status={$kyc.status} />}
				<div className={styles.metaInfo}>
					<div>
						<strong>KYC ID:</strong> <span>{$kyc?.id}</span>
					</div>
					<div>
						<strong>Submitted At:</strong> <span>{$kyc?.submittedAt}</span>
					</div>
				</div>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.leftColumn}>
					{/* Trade Overview */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Customer Information</div>
						<div className={styles.cardContent}>
							<div className={styles.tradeOverview}>
								<div className={styles.tradeDetail}>
									<label>Full Name</label>
									<div className={styles.value}>{$kyc.fullName}</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Email Address</label>
									<div className={styles.value}>{$kyc.user?.email}</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Date of Birth</label>
									<div className={styles.value}>
										{$kyc.dateOfBirth ? formatFullDate($kyc.dateOfBirth) : ''}
									</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Nationality</label>
									<div className={styles.value}>
										{$kyc.nationality ? $kyc.nationality : ''}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Evidence */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Submitted Documents</div>
						<div className={styles.cardContent}>
							<div className={styles.evidenceGrid}>
								{$kyc?.documentFront && (
									<SubmittedDocumentItem
										file={$kyc.documentFront}
										type="Document Front"
									/>
								)}
								{$kyc?.documentBack && (
									<SubmittedDocumentItem
										file={$kyc.documentBack}
										type="Document Back"
									/>
								)}
								{$kyc?.selfie && (
									<SubmittedDocumentItem file={$kyc.selfie} type="Selfie" />
								)}
								{$kyc?.utilityBill && (
									<SubmittedDocumentItem
										file={$kyc.utilityBill}
										type="Bank Statement"
									/>
								)}
								{$kyc?.bankStatement && (
									<SubmittedDocumentItem
										file={$kyc.bankStatement}
										type="Bank Statement"
									/>
								)}
							</div>
						</div>
					</div>

					{/* Timeline */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>Verification Timeline</div>
						<div className={styles.cardContent}>
							<div className={styles.timeline}>
								{/* {timeline.map((item, index) => (
									<TimelineItem
										key={index}
										time={item.time}
										event={item.event}
									/>
								))} */}
							</div>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className={styles.rightColumn}>
					{/* Quick Actions */}
					{!$kyc.reviewedAt && (
						<div className={styles.card}>
							<div className={styles.cardHeader}>Quick Actions</div>
							<div className={styles.cardContent}>
								<div className={styles.actionButtonFlex}>
									<div className={styles.actionButtonsGrid}>
										<button
											className={`${styles.btn} ${styles.btnSuccess}`}
											onClick={() => approveKYCMutation.mutate()}
										>
											Approve Application
										</button>
										<button
											className={`${styles.btn} ${styles.btnDanger}`}
											onClick={() => rejectKYCMutation.mutate()}
										>
											Reject Application
										</button>
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

export default KYCDetaisPage;
