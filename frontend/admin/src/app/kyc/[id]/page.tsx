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
import { withAuthAdvanced } from '@/hoc/withAuth';

const KYCDetaisPage = () => {
	const { $kyc, approveKYCMutation, rejectKYCMutation } = useKYC();

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

	const timeline = [
		{
			time: $kyc?.submittedAt ? getLocaleFullDateString($kyc?.submittedAt) : '',
			event: `KYC Application submitted by ${$kyc.user?.username}`
		},
		...($kyc.reviewedAt && $kyc.reviewedBy
			? [
					{
						time: getLocaleFullDateString($kyc.reviewedAt),
						event: `Was reviewed by ${$kyc.reviewedBy.username}`
					}
			  ]
			: [])
	];

	const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
		<div className={styles.statusRow}>
			<span className={`${styles.statusBadge} ${styles[status]}`}>
				{toUpperCase($kyc.status)}
			</span>
		</div>
	);

	const TimelineItem: FC<TimelineItemProps> = ({ time, event }) => (
		<div className={styles.timelineItem}>
			<div className={styles.timelineTime}>{time}</div>
			<div className={styles.timelineContent}>{event}</div>
		</div>
	);

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
						<strong>Submitted At:</strong>{' '}
						<span>
							{$kyc.submittedAt
								? getLocaleFullDateString($kyc.submittedAt)
								: ''}
						</span>
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
								<div className={styles.tradeDetail}>
									<label>Document Type</label>
									<div className={styles.value}>
										{$kyc.documentType ? formatEnum($kyc.documentType) : ''}
									</div>
								</div>
								<div className={styles.tradeDetail}>
									<label>Document Number</label>
									<div className={styles.value}>
										{$kyc.documentNumber ? $kyc.documentNumber : ''}
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

export default withAuthAdvanced(KYCDetaisPage, {
	roles: ['SUPER_ADMIN', 'KYC_REVIEWER', 'SENIOR_ADMIN']
});
