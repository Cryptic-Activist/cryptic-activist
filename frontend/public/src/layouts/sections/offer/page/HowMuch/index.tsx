import { Button, InputNumber } from '@/components';
import { Form, Input } from '@/components/forms';
import React, { FC } from 'react';

import { HowMuchProps } from './types';
import coreStyles from '../index.module.scss';
import styles from './index.module.scss';
import { toUpperCase } from '@/utils';

const HowMuch: FC<HowMuchProps> = ({
  offer,
  queryOffer,
  onChange,
  onSubmit,
  createTrade: {
    cryptocurrencyAmount,
    fiatAmount,
    receivingFiatAmount,
    isTradeAvailability,
  },
}) => {
  return (
    <div
      className={`${coreStyles.container} ${coreStyles.howMuch} ${styles.container}`}
    >
      <div className={styles.row}>
        <section className={coreStyles.section}>
          <h2 className={coreStyles.heading}>How Much do you want to buy</h2>

          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <div className={styles.inputSymbolContainer}>
                <InputNumber
                  id="howMuch"
                  onChange={onChange}
                  value={fiatAmount}
                  width="7rem"
                  label="Will Pay"
                />
                {offer.fiat?.symbol && <span>{offer.fiat.symbol}</span>}
              </div>
              {receivingFiatAmount && (
                <p>
                  You will receive{' '}
                  <strong>
                    {queryOffer.isPending
                      ? '...'
                      : `${receivingFiatAmount} ${offer.fiat?.symbol}`}
                  </strong>{' '}
                  in{' '}
                  <strong>
                    {queryOffer.isPending ? '...' : offer.cryptocurrency?.name}
                  </strong>
                </p>
              )}
            </div>
            <div className={styles.willReceiveContainer}>
              <label className={coreStyles.label}>Will receive</label>
              {queryOffer.isPending ? (
                <p>......</p>
              ) : (
                offer.cryptocurrency?.symbol && (
                  <div className={styles.willReceive}>
                    <span>{cryptocurrencyAmount}</span>
                    <strong>{toUpperCase(offer.cryptocurrency?.symbol)}</strong>
                  </div>
                )
              )}
            </div>
          </form>
        </section>
      </div>
      <Button padding="1rem" fullWidth>
        Start Trade
      </Button>
    </div>
  );
};

export default HowMuch;
