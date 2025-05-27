'use client';

import { ActionButtonsProps, TradeProps } from './types';
import { Button, Chat } from '@/components';
import React, { FC, useEffect } from 'react';
import {
  convertNewlinesToBr,
  formatRemainingTime,
  getLocaleFullDateString,
  toUpperCase,
} from '@/utils';
import { useRouter, useTrade, useTradeSocket, useUser } from '@/hooks';

import styles from './page.module.scss';

const ActionButtons: FC<ActionButtonsProps> = ({
  trade,
  replace,
  setAsCanceled,
  onSetAsPaid,
}) => {
  const isSetAsPaidVisible =
    trade.status === 'IN_PROGRESS' &&
    !trade.paymentConfirmedAt &&
    !trade.paidAt;
  const isRaiseADisputeVisible =
    !trade.dispitedAt &&
    trade.status === 'IN_PROGRESS' &&
    trade.paidAt &&
    !trade.paymentConfirmedAt &&
    !trade.expiredAt &&
    !trade.escrowReleasedAt;
  const isLeaveTradeVisible = trade.escrowReleasedAt;
  const isCancelVisible =
    !trade.escrowReleasedAt &&
    !trade.expiredAt &&
    trade.status !== 'CANCELLED' &&
    !trade.disputedAt;

  return (
    <section className={styles.actionButtons}>
      <div className={styles.actionButtonsGrid}>
        {isRaiseADisputeVisible && (
          <Button type="button" fullWidth padding="1rem">
            Raise a Dispute
          </Button>
        )}
        {isLeaveTradeVisible && (
          <Button onClick={() => replace('/vendors')} fullWidth padding="1rem">
            Leave trade
          </Button>
        )}
        {isCancelVisible && (
          <Button
            onClick={() =>
              setAsCanceled({
                from: trade.trader?.id,
                to: trade.vendor?.id,
              })
            }
            fullWidth
            padding="1rem"
            theme="danger"
          >
            Cancel
          </Button>
        )}
      </div>
      {isSetAsPaidVisible && (
        <Button
          type="button"
          fullWidth
          padding="1rem"
          onClick={() =>
            onSetAsPaid({
              from: trade.trader?.id,
              to: trade.vendor?.id,
            })
          }
        >
          <strong>Set as Paid</strong>
        </Button>
      )}
    </section>
  );
};

const Trade: FC<TradeProps> = ({
  replace,
  setAsCanceled,
  setAsPaid,
  trade,
  tradeRemaingTime,
}) => {
  const hasTimer =
    trade?.status === 'IN_PROGRESS' || trade?.status === 'PENDING';
  return (
    <div className={styles.trade}>
      <section className={styles.tradeSection}>
        <h2>Trade Summary</h2>
        <ul>
          <li>
            <strong>Trade ID:</strong>
            <span>{trade?.id}</span>
          </li>
          <li className={styles.tradeStatus}>
            <strong>Status:</strong>
            <span className={styles[trade?.status]}>{trade?.status}</span>
          </li>
          <li>
            <strong>Trade Created At:</strong>
            <span>
              {trade?.createdAt
                ? getLocaleFullDateString(new Date(trade?.createdAt))
                : null}
            </span>
          </li>
          {trade?.expiredAt && (
            <li>
              <strong>Trade Expired At:</strong>
              <span>{getLocaleFullDateString(new Date(trade?.expiredAt))}</span>
            </li>
          )}
          {hasTimer && (
            <li>
              <strong>Time Left:</strong>
              <span className={styles.remainingTime}>
                {formatRemainingTime(
                  tradeRemaingTime !== null ? tradeRemaingTime : 0
                )}
              </span>
            </li>
          )}
        </ul>
      </section>

      <section className={styles.tradeSectionRow}>
        <div className={styles.tradeSection}>
          <h2>Trade Details</h2>
          <ul>
            <li>
              <strong>Crypto Amount:</strong>
              <span>
                {`${trade?.cryptocurrencyAmount} ${toUpperCase(
                  trade?.offer?.cryptocurrency?.symbol
                )}`}
              </span>
            </li>
            <li>
              <strong>Fiat Total:</strong>
              <span>{`${trade?.fiatAmount} ${trade?.fiat?.symbol}`}</span>
            </li>
            <li>
              <strong>Exchange Rate:</strong>
              <span>{`${trade?.exchangeRate} ${
                trade?.fiat?.symbol
              } / ${toUpperCase(trade?.cryptocurrency?.symbol)}`}</span>
            </li>
            <li>
              <strong>Payment Method:</strong>
              <span>{trade?.paymentMethod?.name}</span>
            </li>
          </ul>
        </div>

        <div className={styles.tradeSection}>
          <h2>Vendor Info</h2>
          <ul>
            <li>
              <strong>Name:</strong>
              <span>{`${trade?.vendor?.firstName} ${trade?.vendor?.lastName}`}</span>
            </li>
            <li>
              <strong>Username:</strong>
              <span>{trade?.vendor?.username}</span>
            </li>
            <li>
              <strong>Reputation:</strong>
              {/* 300 trades, 98% success */}
              <span>{`${trade?.trader?._count?.tradeTrader} trades`}</span>
            </li>
            <li>
              <strong>KYC Status:</strong>
              <span>{`${
                trade?.trader?.kyc !== null ? 'Verified' : 'Not Verified'
              }`}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.tradeSection}>
        <h2>Payment Instructions</h2>
        {trade?.offer?.paymentDetails?.instructions && (
          <div
            dangerouslySetInnerHTML={{
              __html: convertNewlinesToBr(
                trade?.offer?.paymentDetails?.instructions
              ),
            }}
            className={styles.paymentDetails}
          />
        )}
        <p>{trade?.instructions}</p>
      </section>

      {/* <section className={styles.tradeSection}>
          <h2>Payment Action</h2>
          <ul>
            <li>
              After sending the payment, mark the trade as paid and upload your
              proof.
            </li>
          </ul>
          <button className="btn btn-primary">Mark as Paid</button>
          <button className="btn btn-warning">Upload Payment Proof</button>
          <button className="btn btn-danger">Cancel Trade</button>
        </section> */}

      <section className={styles.tradeSectionRow}>
        <div className={styles.tradeSection}>
          <h2>Escrow Status</h2>
          <ul>
            <li>
              <strong>Funded:</strong>
              <span>{`${trade?.fundedAt ? 'Yes' : 'No'}`}</span>
            </li>
            <li>
              <strong>Released on:</strong>
              <span>{`${
                trade?.escrowReleasedAt
                  ? ` ${getLocaleFullDateString(
                      new Date(trade?.escrowReleasedAt)
                    )}`
                  : 'Not yet released'
              }`}</span>
            </li>
          </ul>
        </div>
        <div className={styles.tradeSection}>
          <h2>Dispute</h2>
          <ul>
            <li>
              <strong>Dispute Status:</strong>
              <span>{`${
                trade?.tradeDispute?.id
                  ? trade?.tradeDispute?.id
                  : 'No disputes'
              }`}</span>
            </li>
            <li>
              <strong>Moderator:</strong>
              <span>
                {trade?.tradeDispute?.id
                  ? `${trade?.tradeDispute?.moderator?.firstName} ${trade?.tradeDispute?.moderator?.lastName}`
                  : 'No moderator assigned'}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.tradeSection}>
        <h2>Security Reminders</h2>
        <ul className={styles.warningList}>
          <li>
            Never release funds before verifying that payment has been received
          </li>
          <li>Avoid off-platform communication</li>
          <li>Watch for fake payment proofs</li>
        </ul>
      </section>
      <ActionButtons
        trade={trade}
        replace={replace}
        setAsCanceled={setAsCanceled}
        onSetAsPaid={setAsPaid}
      />
    </div>
  );
};

export default function TradePage() {
  const { trade, setPaid, setCanceled, setPaymentConfirmed, setTradeCreated } =
    useTrade();
  const { user, query } = useUser();
  const { replace } = useRouter();

  const {
    sendMessage,
    messages,
    receiverStatus,
    tradeRemaingTime,
    setAsPaid,
    setAsCanceled,
  } = useTradeSocket({
    chatId: trade.chat?.id,
    user: trade.trader,
    timeLimit: trade.offer?.timeLimit,
    tradePaid: trade.paidAt,
    trade,
    onSetPaid: setPaid,
    onSetCanceled: setCanceled,
    onSetPaymentConfirmed: setPaymentConfirmed,
    onSetTradeCreated: setTradeCreated,
  });

  // useEffect(() => {
  //   if (trade.offer?.timeLimit) {
  //     const miliseconds = trade.offer?.timeLimit * 1000 * 60;
  //     startCountDown(miliseconds);
  //   }
  // }, [trade.offer?.timeLimit]);

  useEffect(() => {
    // if (query.isSuccess && !user.id) {
    //   router.back();
    //   return;
    // }
    // if (trade.trader?.id && user.id && trade.trader?.id !== user.id) {
    //   router.back();
    // }
  }, [trade.trader?.id, user.id, query.isSuccess]);

  return (
    <div className={styles.container}>
      <Trade
        replace={replace}
        setAsCanceled={setAsCanceled}
        setAsPaid={setAsPaid}
        trade={trade}
        tradeRemaingTime={tradeRemaingTime}
      />
      <div>
        {trade.id &&
        trade.vendor &&
        trade.trader &&
        (trade?.status === 'IN_PROGRESS' || trade?.status === 'PENDING') ? (
          <Chat
            receiver={trade.vendor}
            sender={trade.trader}
            receiverStatus={receiverStatus}
            onSendMessage={sendMessage}
            messages={messages}
          />
        ) : (
          <div className={styles.noChat}>
            <p>Chat no longer available</p>
          </div>
        )}
      </div>
    </div>
  );
}
