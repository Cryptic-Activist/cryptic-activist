'use client';

import { Button, Chat } from '@/components';
import React, { FC, useEffect } from 'react';
import {
  TradeCancelationProps,
  TradeInstructionsProps,
  TradePaymentInstructionsProps,
  TradeStatementProps,
} from './types';
import {
  useCountDown,
  useRouter,
  useTrade,
  useTradeSocket,
  useUser,
} from '@/hooks';

import styles from './page.module.scss';
import { toUpperCase } from '@/utils';

const TradePaymentInstructions: FC<TradePaymentInstructionsProps> = ({
  trade,
}) => {
  return (
    <section className={styles.section}>
      {trade.offer?.offerType === 'buy' && (
        <p className={styles.statement}>
          Make the payment of{' '}
          <strong>
            {trade.fiatAmount} {toUpperCase(trade.fiat?.symbol ?? '')}
          </strong>{' '}
          to{' '}
          <strong>{`${trade.vendor?.firstName} ${trade.vendor?.lastName}`}</strong>
          .
        </p>
      )}
      {trade.offer?.offerType === 'sell' && (
        <p className={styles.statement}>
          Transfer {trade.cryptocurrencyAmount}{' '}
          {toUpperCase(trade.cryptocurrency?.symbol ?? '')} to the
        </p>
      )}
    </section>
  );
};

const TradeStatement: FC<TradeStatementProps> = ({ trade }) => {
  return (
    <section className={styles.section}>
      <p>
        Once the vendor confirms that the payment has arived, the vendor will
        allow the{' '}
        <strong>{`${trade.cryptocurrencyAmount} ${
          trade.cryptocurrency?.symbol &&
          toUpperCase(trade.cryptocurrency?.symbol)
        }`}</strong>{' '}
        to go to your wallet.
      </p>
    </section>
  );
};

const TradeCancelation: FC<TradeCancelationProps> = ({
  trade,
  timeLeft,
  escrowReleased,
  status,
  onSetAsPaid,
  onSetAsCanceled,
}) => {
  const { replace } = useRouter();
  return (
    <section className={styles.section}>
      {status === 'IN_PROGRESS' && !trade.paidAt && (
        <Button
          onClick={() =>
            onSetAsPaid({ from: trade.trader?.id, to: trade.vendor?.id })
          }
        >
          <div className={styles.paidButton}>
            <strong>
              {trade.paidAt === undefined && 'Set as Paid'}
              {trade.paidAt && 'Paid'}
            </strong>
            <div className={styles.remainingTime}>
              <span>Remaining time: </span>
              <span className={styles.time}>{timeLeft}</span>
            </div>
          </div>
        </Button>
      )}
      {escrowReleased && (
        <Button onClick={() => replace('/vendors')}>Leave trade</Button>
      )}
      <p>
        After the payment is made do not forget to click on{' '}
        <strong>Paid</strong> within the stipulated negotiation time frame. If
        you do not do this, the negotiation will end and the{' '}
        {trade.cryptocurrency?.name} trading amount will return to the
        vendor&apos;s wallet.
      </p>
      <div className={styles.row}>
        {!escrowReleased && (
          <Button
            size={18}
            onClick={() => {
              onSetAsCanceled({ from: trade.trader?.id, to: trade.vendor?.id });
            }}
          >
            Cancel
          </Button>
        )}
        <p className={styles.statement}>
          Click on <strong>Cancel</strong> if you don&apos;t want to continue
          negotiating with this vendor
        </p>
      </div>
    </section>
  );
};

const TradeInstructions: FC<TradeInstructionsProps> = ({ trade }) => {
  return (
    <section className={styles.section}>
      <div className={styles.labelContentContainer}>
        <h3 className={styles.subHeading}>
          Follow the{' '}
          <strong>{`${trade.vendor?.firstName} ${trade.vendor?.lastName}`}</strong>{' '}
          instructions
        </h3>
        <p className={styles.instructions}>{trade.offer?.instructions}</p>
      </div>
      <div className={styles.labelContentContainer}>
        <h3 className={styles.subHeading}>Trade terms</h3>
        <p className={styles.instructions}>{trade.offer?.terms}</p>
      </div>
      <div className={styles.labelContentContainer}>
        <h3 className={styles.subHeading}>Tags</h3>
        <ul className={styles.tags}>
          {trade.offer?.tags?.map((tag, index) => (
            <li key={index} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default function TradePage() {
  const { trade, setPaid, setCanceled, setPaymentConfirmed, setTradeCreated } =
    useTrade();
  const { user, query } = useUser();
  const { timeLeftInMinutes, startCountDown: _startCountDown } = useCountDown();

  const {
    sendMessage,
    messages,
    receiverStatus,
    escrowReleased,
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
      <div className={styles.trade}>
        <h1 className={styles.heading}>Negotiation has started</h1>
        <span className={styles.warning}>
          If anyone ask you to trade outside of the Cryptic Activist Catalog
          platform does not accept such request.
        </span>
        <TradePaymentInstructions trade={trade} />
        <TradeStatement trade={trade} />
        <TradeCancelation
          trade={trade}
          timeLeft={timeLeftInMinutes}
          onSetAsPaid={setAsPaid}
          onSetAsCanceled={setAsCanceled}
          escrowReleased={escrowReleased}
          status={trade.status}
        />
        <TradeInstructions trade={trade} />

        <h1>Trade #ABC456</h1>
        <div className="section">
          <div className="row">
            <div>
              <strong>Status:</strong> Waiting for your payment
            </div>
            <div>
              <strong>Time Left:</strong> 14:35
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Trade Details</h2>
          <p>
            <span className="label">Crypto Amount:</span> 0.003 BTC
          </p>
          <p>
            <span className="label">Fiat Total:</span> $90 USD
          </p>
          <p>
            <span className="label">Exchange Rate:</span> $30,000 / BTC
          </p>
          <p>
            <span className="label">Payment Method:</span> Bank Transfer
          </p>
        </div>

        <div className="section">
          <h2>Vendor Info</h2>
          <p>
            <span className="label">Username:</span> trustSeller
          </p>
          <p>
            <span className="label">Reputation:</span> 300 trades, 98% success
          </p>
          <p>
            <span className="label">KYC:</span> Verified ✅
          </p>
        </div>

        <div className="section">
          <h2>Payment Instructions</h2>
          <p>
            <span className="label">Bank Name:</span> Example Bank
          </p>
          <p>
            <span className="label">Account Number:</span> ****1234
          </p>
          <p>
            <span className="label">Reference:</span> ABC456
          </p>
          <p>
            <strong>
              ⚠️ Do not mention crypto in the payment description!
            </strong>
          </p>
        </div>

        <div className="section">
          <h2>Payment Action</h2>
          <p>
            After sending the payment, mark the trade as paid and upload your
            proof.
          </p>
          <button className="btn btn-primary">Mark as Paid</button>
          <button className="btn btn-warning">Upload Payment Proof</button>
          <button className="btn btn-danger">Cancel Trade</button>
        </div>

        <div className="section">
          <h2>Escrow Status</h2>
          <p>
            <span className="label">Status:</span> Crypto is locked in escrow ✅
          </p>
          <p>Vendor will release the crypto once your payment is confirmed.</p>
        </div>

        <div className="section">
          <h2>Dispute</h2>
          <p>
            If you have paid but the vendor hasn&apos;t released the crypto, you
            can open a dispute.
          </p>
          <button className="btn btn-danger">Open Dispute</button>
        </div>

        <div className="section">
          <h2>Activity Log</h2>
          <ul>
            <li>Trade opened</li>
            <li>Escrow funded</li>
            <li>Awaiting your payment</li>
          </ul>
        </div>
      </div>
      <div>
        {trade.id && trade.vendor && trade.trader && (
          <Chat
            receiver={trade.vendor}
            sender={trade.trader}
            receiverStatus={receiverStatus}
            onSendMessage={sendMessage}
            messages={messages}
          />
        )}
      </div>
    </div>
  );
}
