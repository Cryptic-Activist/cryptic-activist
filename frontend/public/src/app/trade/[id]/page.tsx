'use client';

import { ActionButtonsProps, TradeProps } from './types';
import { Button, Chat } from '@/components';
import React, { FC } from 'react';
import {
  convertNewlinesToBr,
  formatRemainingTime,
  getLocaleFullDateString,
  toUpperCase,
} from '@/utils';
import {
  useBlockchain,
  useNavigationBar,
  useRouter,
  useTrade,
  useTradeSocket,
  useUser,
} from '@/hooks';

import styles from './page.module.scss';
import { validateWithAuthToken } from '@/services/user';
import { withAuthAdvanced } from '@/hoc/withAuth';

const ActionButtons: FC<ActionButtonsProps> = ({
  user,
  trade,
  replace,
  setAsCanceled,
  onSetAsPaid,
  toggleModal,
  fundTrade,
}) => {
  const {
    blockchain: { account, chain },
  } = useBlockchain();

  const isSetAsPaidVisible =
    trade.status === 'IN_PROGRESS' &&
    !trade.vendorRejectedFunding &&
    !trade.traderRejectedFunding &&
    trade.buyerFundedAt &&
    trade.sellerFundedAt &&
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
    !trade.disputedAt &&
    !trade.paidAt;
  const isTradeDetailsVisible =
    trade.status !== 'PENDING' && trade.status !== 'IN_PROGRESS';

  const isUserSeller = user?.id === trade?.sellerId;
  const userFundedAt = isUserSeller
    ? trade.sellerFundedAt
    : trade.buyerFundedAt;
  const isFundTradeVisible =
    trade.status === 'IN_PROGRESS' &&
    !trade.fundedAt &&
    (trade.traderRejectedFunding || userFundedAt === undefined);
  const isFundTradeButtonActive =
    account?.address === trade?.traderWalletAddress &&
    chain?.id === trade?.offer?.chain?.chainId;

  return (
    <section className={styles.actionButtons}>
      <div className={styles.actionButtonsGrid}>
        {isRaiseADisputeVisible && (
          <Button
            type="button"
            fullWidth
            padding="1rem"
            theme="alert"
            onClick={() => toggleModal('disputeRequest')}
          >
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
      {isTradeDetailsVisible && (
        <Button
          type="button"
          fullWidth
          padding="1rem"
          href={`/trade/${trade.id}/details`}
        >
          <strong>See Trade Details</strong>
        </Button>
      )}
      {isFundTradeVisible && (
        <Button
          fullWidth
          theme={isFundTradeButtonActive ? 'gradient' : 'ghost'}
          padding="1rem"
          size={18}
          onClick={fundTrade}
          isDisabled={!isFundTradeButtonActive}
        >
          {isFundTradeButtonActive
            ? 'Approve and Fund trade'
            : `Your wallet must be connected to ${trade?.offer?.chain?.name} to fund the trade`}
        </Button>
      )}
    </section>
  );
};

const Trade: FC<TradeProps> = ({
  user,
  replace,
  setAsCanceled,
  setAsDisputed,
  setAsPaid,
  trade,
  tradeRemaingTime,
  ref,
  toggleModal,
  fundTrade,
}) => {
  const hasTimer =
    trade?.status === 'IN_PROGRESS' || trade?.status === 'PENDING';
  return (
    <div className={styles.trade} ref={ref}>
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
          <li>
            Never release funds before verifying that payment has been received
          </li>
          <li>Avoid off-platform communication</li>
          <li>Watch for fake payment proofs</li>
        </ul>
      </section>
      <ActionButtons
        user={user}
        trade={trade}
        replace={replace}
        setAsCanceled={setAsCanceled}
        onSetAsPaid={setAsPaid}
        setAsDisputed={setAsDisputed}
        toggleModal={toggleModal}
        fundTrade={fundTrade}
      />
    </div>
  );
};

function TradePage() {
  const {
    queryTrade,
    trade,
    setPaid,
    setCanceled,
    setPaymentConfirmed,
    setTradeCreated,
    setDisputed,
  } = useTrade();
  const { user } = useUser();
  const { replace } = useRouter();
  const { toggleModal } = useNavigationBar();
  const { blockchain } = useBlockchain();

  const {
    sendMessage,
    messages,
    receiverStatus,
    tradeRemaingTime,
    setAsPaid,
    setAsCanceled,
    setAsDisputed,
    fundTradeAsBuyer,
    fundTradeAsSeller,
    tradeContainerRef,
  } = useTradeSocket({
    chatId: trade.chat?.id,
    user: trade.trader,
    timeLimit: trade.offer?.timeLimit,
    tradePaid: trade.paidAt,
    trade,
    blockchain,
    onSetPaid: setPaid,
    onSetCanceled: setCanceled,
    onSetPaymentConfirmed: setPaymentConfirmed,
    onSetTradeCreated: setTradeCreated,
    onSetDisputed: setDisputed,
    refetchTrade: queryTrade.refetch,
  });

  return (
    <div className={styles.container}>
      <Trade
        user={user}
        replace={replace}
        setAsCanceled={setAsCanceled}
        setAsPaid={setAsPaid}
        setAsDisputed={setAsDisputed}
        trade={trade}
        tradeRemaingTime={tradeRemaingTime}
        ref={tradeContainerRef}
        toggleModal={toggleModal}
        fundTrade={
          user?.id === trade?.sellerId ? fundTradeAsSeller : fundTradeAsBuyer
        }
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

export default withAuthAdvanced(TradePage, {
  validateToken: validateWithAuthToken,
});
