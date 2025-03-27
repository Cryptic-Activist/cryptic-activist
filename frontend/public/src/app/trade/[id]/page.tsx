'use client';

import { Button, Chat } from '@/components';
import React, { FC, useEffect } from 'react';
import {
  TradeCancelationProps,
  TradeInstructionsProps,
  TradePaymentInstructionsProps,
  TradeStatementProps,
} from './types';
import { useCountDown, useTrade } from '@/hooks';

import styles from './index.module.scss';
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

const TradeCancelation: FC<TradeCancelationProps> = ({ trade, timeLeft }) => {
  return (
    <section className={styles.section}>
      <Button>
        <div className={styles.paidButton}>
          <strong>Paid</strong>
          <div className={styles.remainingTime}>
            <span>Remaining time: </span>
            <span className={styles.time}>{timeLeft}</span>
          </div>
        </div>
      </Button>
      <p>
        After the payment is made do not forget to click on{' '}
        <strong>Paid</strong> within the stipulated negotiation time frame. If
        you do not do this, the negotiation will end and the{' '}
        {trade.cryptocurrency?.name} trading amount will return to the
        vendor&apos;s wallet.
      </p>
      <div className={styles.row}>
        <Button size={18}>Cancel</Button>
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
          <strong>{`${trade.vendor?.firstName} ${trade.vendor?.firstName}`}</strong>{' '}
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

const TradePage = () => {
  const { trade } = useTrade();
  const { timeLeftInMinutes, startCountDown } = useCountDown();

  useEffect(() => {
    if (trade.offer?.timeLimit) {
      const miliseconds = trade.offer?.timeLimit * 1000 * 60;
      startCountDown(miliseconds);
    }
  }, [trade.offer?.timeLimit]);

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
        <TradeCancelation trade={trade} timeLeft={timeLeftInMinutes} />
        <TradeInstructions trade={trade} />
      </div>
      <div>
        {trade.id && trade.vendor && trade.trader && (
          <Chat receiver={trade.vendor} sender={trade.trader} trade={trade} />
        )}
      </div>
    </div>
  );
};

export default TradePage;
