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

const ActionButtons: FC<ActionButtonsProps> = ({
  user,
  trade,
  replace,
  setAsCanceled,
  setAsPaymentConfirmed,
  toggleModal,
  fundTrade,
}) => {
  const {
    blockchain: { account, chain },
  } = useBlockchain();

  const isSetPaymentReceivedVisible =
    !trade.dispitedAt &&
    trade.status === 'IN_PROGRESS' &&
    !trade.paymentConfirmedAt &&
    trade.paidAt;
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
    (trade.vendorRejectedFunding || userFundedAt === undefined);
  const isFundTradeButtonActive =
    account?.address === trade.vendorWalletAddress &&
    chain?.id === trade?.offer?.chain?.chainId;

  return (
    <section className={styles.actionButtons}>
      <div className={styles.actionButtonsGrid}>
        {isRaiseADisputeVisible && (
          <Button
            type="button"
            fullWidth
            theme="alert"
            padding="1rem"
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
      {isSetPaymentReceivedVisible && (
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
            ? 'Funding trade'
            : `Your wallet must be connected to ${trade?.offer?.chain?.name} to fund the trade`}
        </Button>
      )}
    </section>
  );
};

const Trade: FC<TradeProps> = ({
  user,
  trade,
  setAsCanceled,
  setAsDisputed,
  setAsPaymentConfirmed,
  replace,
  tradeRemaingTime,
  ref,
  vendorHasEnoughFunds,
  toggleModal,
  fundTrade,
}) => {
  const hasTimer =
    trade?.status === 'IN_PROGRESS' || trade?.status === 'PENDING';
  return (
    <div className={styles.trade} ref={ref}>
      <section className={styles.tradeSection}>
        <h2>Trade Summary</h2>
        {!vendorHasEnoughFunds && <h1>Not enough funds</h1>}
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
              <span>{`${trade?.exchangeRate} ${
                trade?.fiat?.symbol
              } / ${toUpperCase(trade?.cryptocurrency?.symbol)}`}</span>
            </li>
            <li>
              <strong>Payment Method:</strong>
              <span>{`${trade?.paymentMethod?.name}`}</span>
            </li>
          </ul>
        </div>
        <div className={styles.tradeSection}>
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

      {/* <section>
        <h2>Advanced</h2>
        <p>Show multisig escrow participants</p>
        <p>Transaction hash (on-chain lock or release)</p>
        <p>Smart contract status (if applicable)</p>
      </section> */}

      <ActionButtons
        user={user}
        trade={trade}
        replace={replace}
        setAsCanceled={setAsCanceled}
        setAsPaymentConfirmed={setAsPaymentConfirmed}
        setAsDisputed={setAsDisputed}
        toggleModal={toggleModal}
        fundTrade={fundTrade}
      />
    </div>
  );
};

const TradeVendor = () => {
  const {
    trade,
    queryTrade,
    setPaid,
    setCanceled,
    setPaymentConfirmed,
    setVendorWalletAddress,
    setTradeCreated,
    setDisputed,
  } = useTrade();
  const { user } = useUser();
  const { toggleModal } = useNavigationBar();
  const { blockchain } = useBlockchain();
  const { replace } = useRouter();

  const {
    sendMessage,
    setAsCanceled,
    setAsPaymentConfirmed,
    setAsDisputed,
    fundTradeAsSeller,
    fundTradeAsBuyer,
    messages,
    receiverStatus,
    tradeRemaingTime,
    tradeContainerRef,
    vendorHasEnoughFunds,
  } = useTradeSocket({
    chatId: trade.chat?.id,
    user: trade.vendor,
    timeLimit: trade.offer?.timeLimit,
    tradePaid: trade.paidAt,
    trade: trade,
    blockchain,
    walletAddress: blockchain.account?.address,
    onSetPaid: setPaid,
    onSetCanceled: setCanceled,
    onSetPaymentConfirmed: setPaymentConfirmed,
    onSetUpdateVendorWalletAddress: setVendorWalletAddress,
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
        setAsPaymentConfirmed={setAsPaymentConfirmed}
        trade={trade}
        tradeRemaingTime={tradeRemaingTime}
        ref={tradeContainerRef}
        setAsDisputed={setAsDisputed}
        toggleModal={toggleModal}
        vendorHasEnoughFunds={vendorHasEnoughFunds}
        fundTrade={
          user?.id === trade?.sellerId ? fundTradeAsSeller : fundTradeAsBuyer
        }
      />

      {trade?.id &&
      trade?.vendor &&
      trade?.trader &&
      (trade?.status === 'IN_PROGRESS' || trade?.status === 'PENDING') &&
      vendorHasEnoughFunds ? (
        <Chat
          receiver={trade.trader}
          sender={trade.vendor}
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
  );
};

export default TradeVendor;
