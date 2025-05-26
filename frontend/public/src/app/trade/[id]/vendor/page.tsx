'use client';

import { Button, Chat } from '@/components';
import React, { FC, useEffect } from 'react';
import {
  convertNewlinesToBr,
  formatRemainingTime,
  getLocaleFullDateString,
  toUpperCase,
} from '@/utils';
import {
  useBlockchain,
  useRouter,
  useTrade,
  useTradeSocket,
  useUser,
} from '@/hooks';

import { TradeProps } from './types';
import styles from './page.module.scss';

const Trade: FC<TradeProps> = ({
  trade,
  setAsCanceled,
  setAsPaymentConfirmed,
  replace,
  tradeRemaingTime,
}) => {
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
            <strong>Trade Status:</strong>
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
          {trade?.expiredAt ? (
            <li>
              <strong>Trade Expired At:</strong>
              <span>{getLocaleFullDateString(new Date(trade?.expiredAt))}</span>
            </li>
          ) : (
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
      <section className={styles.tradeSection}>
        <h2>Trade Details</h2>
        <ul>
          <li>
            <strong>Trade Type:</strong>
            <span>
              {`${
                trade?.offer?.offerType === 'buy' ? 'Buying' : 'Selling'
              } ${toUpperCase(trade?.cryptocurrency?.symbol)}`}
            </span>
          </li>
          <li>
            <strong>Cryptocurrency Amount:</strong>
            <span>
              {`${trade?.cryptocurrencyAmount} ${toUpperCase(
                trade?.cryptocurrency?.symbol
              )}`}
            </span>
          </li>
          <li>
            <strong>Fiat Amount:</strong>
            <span>{`${trade?.fiatAmount} ${trade?.fiat?.symbol}`}</span>
          </li>
          <li>
            <strong>Exchange Rate:</strong>
            <span>{`${trade.exchangeRate} ${trade?.fiat?.symbol}`}</span>
          </li>
          <li>
            <strong>Payment Method:</strong>
            <span>{`${trade?.paymentMethod?.name}`}</span>
          </li>
        </ul>
      </section>
      <section className={styles.tradeSection}>
        <h2>Trader Information</h2>
        <ul>
          <li>
            <strong>Name:</strong>
            <span>{`${trade?.trader?.firstName} ${trade?.trader?.lastName}`}</span>
          </li>
          <li>
            <strong>Username:</strong>
            <span>{trade?.trader?.username}</span>
          </li>
          <li>
            <strong>Trade History / Rating:</strong>
            <span>{`${trade?.trader?._count?.tradeTrader} trades`}</span>
          </li>
          <li>
            <strong>KYC Status:</strong>
            <span>{`${
              trade?.trader?.kyc !== null ? 'Verified' : 'Not Verified'
            }`}</span>
          </li>
        </ul>
        {/* <p>Communication history</p> */}
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
      </section>
      <section className={styles.tradeSection}>
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
                ? ` ${trade?.escrowReleasedAt}`
                : 'Not yet released'
            }`}</span>
          </li>
        </ul>
        <p className={styles.warning}>
          <strong>Warning:</strong> Only release once you&apos;ve confirmed
          receiving funds in your bank!
        </p>
      </section>
      <section className={styles.tradeSection}>
        <h2>Dispute</h2>
        <ul>
          <li>
            <strong>Dispute Status:</strong>
            <span>{`${
              trade?.tradeDispute?.id ? trade?.tradeDispute?.id : 'No disputes'
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
      </section>
      <section className={styles.tradeSection}>
        <h2>Activity Log</h2>
        <ul>
          <li>
            <strong>Trade Started:</strong>
            <span>{`${
              trade?.startedAt
                ? getLocaleFullDateString(new Date(trade?.startedAt))
                : 'Has not yet start'
            }`}</span>
          </li>
          <li>
            <strong>Escrow Locked:</strong>
            <span>
              {trade?.startedAt
                ? getLocaleFullDateString(new Date(trade?.startedAt))
                : 'Not yet locked'}
            </span>
          </li>
          <li>
            <strong>Set as Paid:</strong>
            <span>
              {trade?.paidAt
                ? getLocaleFullDateString(new Date(trade?.paidAt))
                : 'Not paid yet'}
            </span>
          </li>
          <li>
            <strong>Escrow Release:</strong>
            <span>
              {trade?.escrowReleasedAt
                ? getLocaleFullDateString(new Date(trade?.escrowReleasedAt))
                : 'Not yet released'}
            </span>
          </li>
          <li>
            <strong>Dispute Raised:</strong>
            <span>
              {trade?.tradeDispute
                ? getLocaleFullDateString(
                    new Date(trade?.tradeDispute?.createdAt)
                  )
                : 'No dispute raised'}
            </span>
          </li>
        </ul>
      </section>
      <section className={styles.tradeSection}>
        <h2>Security Reminders</h2>
        <ul className={styles.warningList}>
          <li>Never release funds before verifying payment</li>
          <li>Avoid off-platform communication</li>
          <li>Watch for fake payment proofs</li>
        </ul>
      </section>

      {/* <section>
        <h2>Advanced</h2>
        <p>Show multisig escrow participants</p>
        <p>Transaction hash (on-chain lock or release)</p>
        <p>Smart contract status (if applicable)</p>
      </section> */}

      <section className={styles.actionButtons}>
        <Button type="button" fullWidth padding="1rem">
          Report User
        </Button>
        {!trade.dispitedAt &&
          trade.status === 'IN_PROGRESS' &&
          !trade.paymentConfirmedAt &&
          trade.paidAt && (
            <Button
              type="button"
              fullWidth
              padding="1rem"
              onClick={() =>
                setAsPaymentConfirmed({
                  from: trade.trader?.id,
                  to: trade.vendor?.id,
                })
              }
            >
              <strong>Set as Payment Received</strong>
            </Button>
          )}
        {!trade.dispitedAt &&
          trade.status !== 'IN_PROGRESS' &&
          !trade.expiredAt &&
          !trade.escrowReleasedAt && (
            <Button type="button" fullWidth padding="1rem">
              Raise a Dispute
            </Button>
          )}
        {trade.escrowReleasedAt && (
          <Button onClick={() => replace('/vendors')} fullWidth padding="1rem">
            Leave trade
          </Button>
        )}
        {!trade.escrowReleasedAt &&
          !trade.expiredAt &&
          trade.status !== 'CANCELLED' &&
          !trade.disputedAt && (
            <Button
              onClick={() =>
                setAsCanceled({
                  from: trade.trader?.id,
                  to: trade.vendor?.id,
                })
              }
              fullWidth
              padding="1rem"
            >
              Cancel
            </Button>
          )}
      </section>
    </div>
  );
};

const TradeVendor = () => {
  const {
    trade,
    setPaid,
    setCanceled,
    setPaymentConfirmed,
    setVendorWalletAddress,
    setTradeCreated,
  } = useTrade();
  const { user, query } = useUser();
  // const { addToast } = useApp();
  const { blockchain } = useBlockchain();
  const { replace } = useRouter();

  const {
    sendMessage,
    setAsCanceled,
    setAsPaymentConfirmed,
    messages,
    receiverStatus,
    tradeRemaingTime,
  } = useTradeSocket({
    chatId: trade.chat?.id,
    user: trade.vendor,
    timeLimit: trade.offer?.timeLimit,
    tradePaid: trade.paidAt,
    trade: trade,
    walletAddress: blockchain.account?.address,
    onSetPaid: setPaid,
    onSetCanceled: setCanceled,
    onSetPaymentConfirmed: setPaymentConfirmed,
    onSetUpdateVendorWalletAddress: setVendorWalletAddress,
    onSetTradeCreated: setTradeCreated,
  });

  useEffect(() => {
    // if (query.isSuccess && !user.id) {
    //   back();
    //   return;
    // }
    // if (trade.vendor?.id && user.id && trade.vendor?.id !== user.id) {
    //   back();
    //   return;
    // }
    // if (!blockchain.account?.address) {
    //   addToast('error', 'You must have a wallet connected to trade', 10000);
    //   back();
    //   return;
    // }
    // if (
    //   trade.vendorWalletAddress &&
    //   blockchain.account?.address !== trade.vendorWalletAddress
    // ) {
    //   addToast(
    //     'error',
    //     'The current connected wallet must be the same one used to create the offer',
    //     10000
    //   );
    //   back();
    // }
  }, [trade.vendor?.id, user.id, query.isSuccess]);

  console.log({ trade });

  return (
    <div className={styles.container}>
      <Trade
        replace={replace}
        setAsCanceled={setAsCanceled}
        setAsPaymentConfirmed={setAsPaymentConfirmed}
        trade={trade}
        tradeRemaingTime={tradeRemaingTime}
      />
      <div className={styles.chatContainer}>
        {trade.id && trade.vendor && trade.trader && (
          <Chat
            receiver={trade.trader}
            sender={trade.vendor}
            receiverStatus={receiverStatus}
            onSendMessage={sendMessage}
            messages={messages}
          />
        )}
      </div>
    </div>
  );
};

export default TradeVendor;
