'use client';

import { Button, InputNumber } from '@/components';
import React, { FC, useEffect, useState } from 'react';

import { HowMuchProps } from './types';
import coreStyles from '../index.module.scss';
import styles from './index.module.scss';
import { toUpperCase } from '@/utils';

const HowMuch: FC<HowMuchProps> = ({
  user,
  offer,
  queryOffer,
  onChange,
  onSubmit,
  blockchain,
  mutationStartTrade,
  createTrade: {
    cryptocurrencyAmount,
    receivingFiatAmount,
    isTradingAvailable,
  },
  isLoggedIn,
}) => {
  const [submitButtonLabel, setSubmitButtonLabel] = useState('');
  useEffect(() => {
    const getSubmitButtonLabel = () => {
      if (!isLoggedIn()) {
        return 'Login to start trading';
      }
      if (user.id === offer.vendor?.id) {
        return "Can't trade with yourself";
      }
      if (mutationStartTrade.isPending) {
        return 'Starting trade...';
      }
      if (mutationStartTrade.isError) {
        return 'Some error occurred';
      }
      if (!blockchain.account?.address) {
        return 'Connect your wallet before trading';
      }

      return 'Start trading';
    };
    const label = getSubmitButtonLabel();
    setSubmitButtonLabel(label);
  }, [
    isLoggedIn,
    user.id,
    offer.vendor?.id,
    isLoggedIn,
    mutationStartTrade.isPending,
    mutationStartTrade.isError,
  ]);

  return (
    <form
      className={`${coreStyles.container} ${coreStyles.howMuch} ${styles.container}`}
      onSubmit={onSubmit}
    >
      <div className={styles.row}>
        <section className={coreStyles.section}>
          <h2 className={coreStyles.heading}>How Much do you want to buy</h2>

          <div className={styles.form}>
            <div className={styles.inputContainer}>
              <div className={styles.inputSymbolContainer}>
                {offer.limitMin && (
                  <InputNumber
                    id="howMuch"
                    onChange={onChange}
                    value={offer.limitMin}
                    isDisabled={!offer.limitMin}
                    min={offer.limitMin}
                    max={offer.limitMax}
                    width="7rem"
                    label="Will Pay"
                    symbol={offer.fiat?.symbol}
                  />
                )}
              </div>
              {!user?.id && <p>You must logged in to see the rates</p>}
              {user?.id && receivingFiatAmount && (
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
          </div>
        </section>
      </div>
      <Button
        padding="1rem"
        fullWidth
        type="submit"
        theme={isTradingAvailable ? 'primary' : 'ghost'}
      >
        {submitButtonLabel}
      </Button>
    </form>
  );
};

export default HowMuch;
