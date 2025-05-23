'use client';

import { Button, Chat } from '@/components';
import React, { FC, useEffect } from 'react';
import { convertNewlinesToBr, toUpperCase } from '@/utils';
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
  escrowReleased,
  replace,
}) => {
  return (
    <div className={styles.trade}>
      <h1 className={styles.heading}>Negatiation has started</h1>
      <span className={styles.warning}>
        If anyone ask you to trade outside of the Cryptic Activist Catalog
        platform does not accept such request.
      </span>

      <section>
        <h2>Trade Summary</h2>
        <p>Trade ID: {trade?.id}</p>
        <p>Trade Status: {trade?.status}</p>
        <p>Trade Created At: {trade?.createdAt}</p>
        <p>IMPORTANT: Timer HERE</p>
      </section>
      <section>
        <h2>Trade Details</h2>
        <p>
          {`Trade Type: ${
            trade?.offer?.offerType === 'buy' ? 'Buying' : 'Selling'
          } ${toUpperCase(trade?.cryptocurrency?.symbol)}`}
        </p>
        <p>
          {`Amount: ${trade?.cryptocurrencyAmount} ${toUpperCase(
            trade?.cryptocurrency?.symbol
          )}`}
        </p>
        <p>{`Fiat Amount: ${trade?.fiatAmount} ${trade?.fiat?.symbol}`}</p>
        <p>{`Exchange Rate: `}</p>
        <p>{`Payment Method: ${trade?.paymentMethod?.name}`}</p>
      </section>
      <section>
        <h2>Trader Information</h2>
        <p>{`Name: ${trade?.trader?.firstName} ${trade?.trader?.lastName}`}</p>
        <p>{`Username: ${trade?.trader?.username}`}</p>
        <p>{`Trade History / Rating: ${trade?.trader?._count?.tradeTrader} trades`}</p>
        <p>
          {`KYC Status: ${
            trade?.trader?.kyc !== null ? 'Verified' : 'Not Verified'
          }`}
        </p>
        <p>Communication history</p>
      </section>
      <section>
        <h2>Payment Instructions</h2>
        {trade?.offer?.paymentDetails?.instructions && (
          <p
            dangerouslySetInnerHTML={{
              __html: convertNewlinesToBr(
                trade?.offer?.paymentDetails?.instructions
              ),
            }}
          />
        )}
      </section>
      <section>
        <h2>Escrow Status</h2>
        <p>
          {`Funded: ${
            trade?.funded && trade?.escrowReleaseDate === null ? 'Yes' : 'No'
          }`}
        </p>
        <p>
          {`Released on: ${
            trade?.escrowReleaseDate
              ? ` ${trade?.escrowReleaseDate}`
              : 'Not release yet'
          }`}
        </p>
        <p>
          <strong>Warning:</strong> Only release once you&apos;ve confirmed
          receiving funds in your bank!
        </p>
      </section>
      <section>
        <h2>Dispute Mechanism</h2>
        <Button type="button">Dispute</Button>
        <p>Status if trade is already disputed</p>
        <p>Show if a moderator is assigned</p>
      </section>
      <section>
        <Button type="button">Report User</Button>
      </section>
      <section>
        <h2>Activity Log</h2>
        <p>{`Trade Started: ${trade?.startedAt}`}</p>
        <p>
          Timestamped actions (e.g., escrow locked, payment marked, released,
          disputed)
        </p>
        <p>{`Escrow locked: ${trade?.startAt}`}</p>
      </section>
      <section>
        <h2>Security Reminders</h2>
        <p>Never release funds before verifying payment</p>
        <p>Avoid off-platform communication</p>
        <p>Watch for fake payment proofs</p>
      </section>

      <section>
        <h2>Advanced</h2>
        <p>Show multisig escrow participants</p>
        <p>Transaction hash (on-chain lock or release)</p>
        <p>Smart contract status (if applicable)</p>
      </section>
      {trade.paid && !trade.paymentConfirmed && (
        <Button
          type="button"
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
      {!escrowReleased && (
        <Button
          onClick={() =>
            setAsCanceled({
              from: trade.trader?.id,
              to: trade.vendor?.id,
            })
          }
        >
          Cancel
        </Button>
      )}
      {escrowReleased && (
        <Button onClick={() => replace('/vendors')}>Leave trade</Button>
      )}
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
    escrowReleased,
  } = useTradeSocket({
    chatId: trade.chat?.id,
    user: trade.vendor,
    timeLimit: trade.offer?.timeLimit,
    tradePaid: trade.paid,
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
        escrowReleased={escrowReleased}
        replace={replace}
        setAsCanceled={setAsCanceled}
        setAsPaymentConfirmed={setAsPaymentConfirmed}
        trade={trade}
      />
      <div>
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
