'use client';

import { FeedbackProps, TradeDetailsProps } from './types';
import React, { FC, useRef, useState } from 'react';
import {
  formatEnum,
  formatTimestamp,
  getDuration,
  getFutureDateByHours,
  getInitials,
  getLocaleFullDateString,
  processFileToUpload,
  toUpperCase,
} from '@/utils';

import { Button } from '@/components';
import { FileUploader } from '@/components/forms';
import { FileUploaderHandle } from '@/components/forms/FileUploader/types';
import Image from 'next/image';
import { getSocket } from '@/services/socket';
import styles from './index.module.scss';
import { uploadFiles } from '@/services/uploads';
import { useNavigationBar } from '@/hooks';

const Feedback: FC<FeedbackProps> = ({ feedback, user }) => {
  const negativeStyle = feedback.type === 'NEGATIVE' ? styles.negative : '';
  const neutralStyle = feedback.type === 'NEUTRAL' ? styles.neutral : '';
  const positiveStyle = feedback.type === 'POSITIVE' ? styles.positive : '';

  return (
    <div className={styles.feedback}>
      <div className={styles.userInfoTypeContainer}>
        <div className={styles.userInfo}>
          <div
            className={styles.avatar}
            style={{ backgroundColor: feedback.trader.profileColor }}
          >
            {getInitials(feedback.trader.firstName, feedback.trader.lastName)}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.usernames}>{`${feedback.trader.firstName} ${
              feedback.trader.lastName
            } ${user.id === feedback.trader.id ? '(you)' : ''}`}</div>
            <span className={styles.username}>{feedback.trader.username}</span>
          </div>
        </div>
        <span className={`${negativeStyle} ${neutralStyle} ${positiveStyle}`}>
          {feedback.type}
        </span>
      </div>
      <p>{feedback.message}</p>
    </div>
  );
};

const TradeDetailsPage: FC<TradeDetailsProps> = ({ trade, app, user }) => {
  const { tradeDetails, chatMessages } = trade;
  const { toggleModal } = useNavigationBar();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const uploaderRef = useRef<FileUploaderHandle>(null);

  const toggleChatView = () => {
    setIsChatOpen((prev) => !prev);
  };

  const isUserTrader = user.id === tradeDetails.trader.id;
  const canLeaveFeedback = isUserTrader && !tradeDetails.feedback;
  const moreEvidenceRequestFiltered =
    tradeDetails.tradeDispute?.disputeEvidenceRequest?.filter(
      (request: any) => request?.requestedFromId === user?.id
    );
  const hasMoreEvidenceRequest = moreEvidenceRequestFiltered.length > 0;

  // const handleEvidenceUpload = () => {
  //   uploaderRef.current?.upload();
  // };

  const onUploadEvidences = async (files: File[]) => {
    const socket = getSocket();
    if (socket.connected && trade.chat?.id && user.id) {
      const formData = await processFileToUpload(files);
      const uploadedFiles = await uploadFiles(formData);

      console.log({ uploadedFiles });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>Trade Details</h1>
          <span className={`${styles.badge} ${styles[tradeDetails.status]}`}>
            {tradeDetails.status}
          </span>
        </div>

        <div className={styles.tradeInfo}>
          <div className={styles.tradeInfoGroup}>
            <div>
              <div className={styles.infoLabel}>Transaction ID</div>
              <div className={styles.infoValue}>{tradeDetails.id}</div>
            </div>

            <div>
              <div className={styles.infoLabel}>Cryptocurrency</div>
              <div
                className={`${styles.infoValue} ${styles.large} ${styles.infoValueCrypto}`}
              >
                {tradeDetails.cryptocurrency?.image && (
                  <Image
                    src={tradeDetails.cryptocurrency?.image ?? null}
                    alt={tradeDetails.cryptocurrency?.name}
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    width={30}
                    height={30}
                  />
                )}
                <span>
                  {`${tradeDetails.cryptocurrencyAmount} ${toUpperCase(
                    tradeDetails.cryptocurrency?.symbol
                  )}`}
                </span>
              </div>
            </div>

            <div>
              <div className={styles.infoLabel}>Fiat Amount</div>
              <div className={`${styles.infoValue} ${styles.large}`}>
                {tradeDetails.fiatAmount}{' '}
                {toUpperCase(tradeDetails.fiat?.symbol)}
              </div>
            </div>

            <div>
              <div className={styles.infoLabel}>Exchange Rate</div>
              <div className={styles.infoValue}>
                {`1 ${toUpperCase(tradeDetails.cryptocurrency?.symbol)} = ${
                  app.currentPrice
                } ${toUpperCase(tradeDetails.fiat?.symbol)}`}
                <span className={styles.priceIndicator}>+2.35%</span>
              </div>
            </div>
          </div>

          <div className={styles.tradeInfoGroup}>
            <div>
              <div className={styles.infoLabel}>Trade Started</div>
              <div className={styles.infoValue}>
                {getLocaleFullDateString(new Date(tradeDetails.startedAt))}
              </div>
            </div>

            <div>
              <div className={styles.infoLabel}>Trade Completed</div>
              <div className={styles.infoValue}>
                {getLocaleFullDateString(new Date(tradeDetails.startedAt))}
              </div>
            </div>

            <div>
              <div className={styles.infoLabel}>Trade Speed</div>
              <div className={styles.infoValue}>
                {tradeDetails.startedAt && tradeDetails.endedAt
                  ? getDuration(
                      new Date(tradeDetails.startedAt),
                      new Date(tradeDetails.endedAt)
                    ).formatted
                  : ''}
              </div>
            </div>

            <div>
              <div className={styles.infoLabel}>Transaction Hash</div>
              <div className={`${styles.infoValue} ${styles.txHash}`}>
                {tradeDetails.blockchainTransactionHash}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.userInfo}>
          <div
            className={styles.avatar}
            style={{ backgroundColor: tradeDetails.vendor.profileColor }}
          >
            {getInitials(
              tradeDetails.vendor.firstName,
              tradeDetails.vendor.lastName
            )}
          </div>
          <div className={styles.userDetails}>
            <div
              className={styles.usernames}
            >{`${tradeDetails.vendor.firstName} ${tradeDetails.vendor.lastName} (Vendor)`}</div>
            <span className={styles.username}>
              {tradeDetails.vendor.username}
            </span>
          </div>
        </div>

        <div className={styles.userInfo}>
          <div
            className={styles.avatar}
            style={{ backgroundColor: tradeDetails.trader.profileColor }}
          >
            {getInitials(
              tradeDetails.trader.firstName,
              tradeDetails.trader.lastName
            )}
          </div>
          <div className={styles.userDetails}>
            <p
              className={styles.usernames}
            >{`${tradeDetails.trader.firstName} ${tradeDetails.trader.lastName} (Trader)`}</p>
            <span className={styles.username}>
              {tradeDetails.trader.username}
            </span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <h3 className={styles.sectionTitle}>Payment Details</h3>
        <div className={styles.paymentDetails}>
          <div>
            <div className={styles.infoLabel}>Payment Method</div>
            <div
              className={styles.infoValue}
            >{`${tradeDetails.paymentMethod.name} - ${tradeDetails.paymentMethod.paymentMethodCategory.name}`}</div>
          </div>

          {/* <div>
            <div className={styles.infoLabel}>Payment Instructions</div>
            <div className={styles.infoValue}>
              Please make the payment to the following bank account:
              <br />
              IBAN: DE89 3704 0044 0532 0130 00
              <br />
              BIC: COBADEFFXXX
              <br />
              Account Holder: Compatible Malay
              <br />
              Reference: TRD-97854632
            </div>
          </div> */}
          {tradeDetails.paymentReceipt && (
            <div>
              <div className={styles.infoLabel}>Payment Receipt</div>
              <div className={styles.infoValue}>
                <a href="#" className={styles.link}>
                  View Receipt
                </a>
              </div>
            </div>
          )}
        </div>

        <div className={styles.divider}></div>
        {/* 
        <h3 className={styles.sectionTitle}>Trade Progress</h3>
        <div className={styles.tradeProgress}>
          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Trade initiated - April 25, 2025 14:32 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              ETH locked in escrow - April 25, 2025 14:33 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Payment sent via SEPA - April 25, 2025 14:40 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Payment confirmed by vendor - April 25, 2025 14:56 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              ETH released from escrow - April 25, 2025 14:57 UTC
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>✓</div>
            <div className={styles.milestoneText}>
              Trade completed successfully - April 25, 2025 14:58 UTC
            </div>
          </div>
        </div> */}

        <div className={styles.chatSection}>
          <h3 className={styles.sectionTitle}>Trade Chat</h3>
          {isChatOpen && chatMessages.length > 0 && (
            <ul className={styles.list}>
              {chatMessages.map((message: any, index: number) => {
                const messageStyle =
                  tradeDetails.trader?.id === message.from
                    ? styles.sender
                    : styles.receiver;
                const isInfoMessage = message.type === 'info';

                if (isInfoMessage) {
                  return (
                    <li key={index} className={styles.listItemChatInfo}>
                      <p className={styles.infoMessage}>{message.message}</p>
                    </li>
                  );
                }

                return (
                  <li
                    key={index}
                    className={`${styles.listItem} ${messageStyle}`}
                  >
                    <div className={styles.message}>
                      <p>{message.message}</p>
                      <span className={styles.time}>
                        {formatTimestamp(message.createdAt)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <button
            type="button"
            className={`${styles.btn} ${styles.btnOutline}`}
            style={{
              width: '100%',
              ...(isChatOpen && { borderRadius: '0 0 0.5rem 0.5rem' }),
            }}
            onClick={toggleChatView}
          >
            {isChatOpen ? 'Close' : 'View'} Chat History
          </button>
        </div>

        {tradeDetails.tradeDispute?.id && <div className={styles.divider} />}

        {tradeDetails.tradeDispute?.id && (
          <div className={styles.chatSection}>
            <h3 className={styles.sectionTitle}>Dispute</h3>
            <div className={styles.tradeInfo}>
              <div className={styles.tradeInfoGroup}>
                <div>
                  <div className={styles.infoLabel}>Dispute ID</div>
                  <div className={styles.infoValue}>
                    {tradeDetails.tradeDispute?.id}
                  </div>
                </div>

                <div>
                  <div className={styles.infoLabel}>Initiated At</div>
                  <div className={styles.infoValue}>
                    {getLocaleFullDateString(
                      new Date(tradeDetails.tradeDispute?.createdAt)
                    )}
                  </div>
                </div>

                <div>
                  <div className={styles.infoLabel}>Raised by</div>
                  <div className={styles.infoValue}>
                    {`${tradeDetails.tradeDispute?.raisedBy?.username} ${
                      user.id === tradeDetails.tradeDispute?.raisedBy?.id
                        ? '(You)'
                        : ''
                    }`}
                  </div>
                </div>

                {tradeDetails.tradeDispute?.winner?.id && (
                  <div>
                    <div className={styles.infoLabel}>Status</div>
                    <div className={styles.infoValue}>
                      {formatEnum(tradeDetails.tradeDispute?.status)}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.tradeInfoGroup}>
                <div>
                  <div className={styles.infoLabel}>Dispute Type</div>
                  <div className={styles.infoValue}>
                    {formatEnum(tradeDetails.tradeDispute?.type)}
                  </div>
                </div>

                {tradeDetails.tradeDispute?.resolvedAt ? (
                  <div>
                    <div className={styles.infoLabel}>Resolved At</div>
                    <div className={styles.infoValue}>
                      {getLocaleFullDateString(
                        new Date(tradeDetails.tradeDispute?.resolvedAt)
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={styles.infoLabel}>SLA Due At</div>
                    <div
                      className={`${styles.infoValue} ${styles.badge} ${
                        getFutureDateByHours(
                          new Date(tradeDetails.tradeDispute?.slaDueAt)
                        ) === '0m'
                          ? styles.overdue
                          : styles.ontime
                      }`}
                    >
                      {getFutureDateByHours(
                        new Date(tradeDetails.tradeDispute?.slaDueAt)
                      )}
                    </div>
                  </div>
                )}

                {tradeDetails.tradeDispute?.winner?.id && (
                  <div>
                    <div className={styles.infoLabel}>Winner</div>
                    <div className={styles.infoValue}>
                      {`${tradeDetails.tradeDispute?.winner?.username} ${
                        tradeDetails.tradeDispute?.winner?.id === user.id
                          ? '(You)'
                          : ''
                      }`}
                    </div>
                  </div>
                )}

                {tradeDetails.tradeDispute?.loser?.id && (
                  <div>
                    <div className={styles.infoLabel}>Loser</div>
                    <div className={styles.infoValue}>
                      {`${tradeDetails.tradeDispute?.loser?.username} ${
                        tradeDetails.tradeDispute?.loser?.id === user.id
                          ? '(You)'
                          : ''
                      }`}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {hasMoreEvidenceRequest && <div className={styles.divider} />}

        {hasMoreEvidenceRequest && (
          <div className={styles.chatSection}>
            <h3 className={styles.sectionTitle}>More Evidences</h3>
            <p className={styles.evidencesStatement}>
              The dispute moderator is requesting more evidences to resolve the
              open dispute.
            </p>
            <FileUploader
              allowMultiple
              allowedFileTypes={[
                'image/jpeg',
                'image/png',
                'image/webp',
                // 'application/pdf',
              ]}
              maxFileSize={2 * 1024 * 1024} // 1MB
              maxFiles={4}
              label="Upload Evidence"
              onUpload={onUploadEvidences}
              ref={uploaderRef}
            />
          </div>
        )}

        {(canLeaveFeedback || tradeDetails.paymentReceipt) && (
          <div className={styles.divider} />
        )}

        {tradeDetails.feedback && (
          <section>
            <div className={styles.divider} />
            <h3 className={styles.sectionTitle}>Feedback</h3>
            <Feedback feedback={tradeDetails.feedback} user={user} />
          </section>
        )}

        <div className={styles.actionButtons}>
          {canLeaveFeedback && (
            <Button
              padding="0.65rem 1rem"
              onClick={() => toggleModal('feedback')}
            >
              Leave Feedback
            </Button>
          )}
          {/* <button className={`${styles.btn} ${styles.btnOutline}`}>
            Report an Issue
          </button> */}
          {tradeDetails.paymentReceipt && (
            <button className={`${styles.btn} ${styles.btnOutline}`}>
              Download Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeDetailsPage;
