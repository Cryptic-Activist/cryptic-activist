import React, { FC } from 'react';

import { DisplayCurrency } from '@/components';
import { ThisOfferProps } from './types';
import { calculatePercentageIncrease } from '@/utils/math';
import coreStyles from '../index.module.scss';
import countryFlags from '@/hooks/useFiats/countryFlags';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const ThisOffer: FC<ThisOfferProps> = ({ offer, currentPrice }) => {
  const buildListAtCalculation = () => {
    if (currentPrice && offer.listAt) {
      const total = calculatePercentageIncrease(currentPrice, offer.listAt);
      return `${currentPrice} ${offer.fiat?.symbol} + ${
        offer.listAt
      }% = ${total.toFixed(2)} ${offer.fiat?.symbol}`;
    }
  };

  return (
    <div className={`${coreStyles.container} ${coreStyles.offer}`}>
      <h2 className={coreStyles.heading}>About this offer</h2>
      <div className={styles.content}>
        <h3 className={styles.label}>{offer?.label}</h3>
        <section className={styles.rowSection}>
          <div className={styles.section}>
            <h4 className={styles.subHeading}>Cryptocurrency</h4>
            {offer.cryptocurrency?.id && (
              <DisplayCurrency
                image={offer.cryptocurrency?.image}
                name={offer.cryptocurrency?.name}
              />
            )}
          </div>
          <div className={styles.section}>
            <h4 className={styles.subHeading}>Fiat</h4>
            {offer.fiat?.id && (
              <DisplayCurrency
                image={countryFlags[offer.fiat?.country]}
                name={offer.fiat?.name}
              />
            )}
          </div>
        </section>
        <section className={styles.rowSection}>
          <div className={styles.section}>
            <h4 className={styles.subHeading}>Minimum Limit</h4>
            <span>{`${offer.limitMin} ${offer.fiat?.symbol}`}</span>
          </div>
          <div className={styles.section}>
            <h4 className={styles.subHeading}>Maximum Limit</h4>
            <span>{`${offer.limitMax} ${offer.fiat?.symbol}`}</span>
          </div>
        </section>
        <section className={styles.section}>
          <h4 className={styles.subHeading}>Pricing Type</h4>
          {offer.pricingType && (
            <span className={styles.statement}>
              {toCapitalize(offer.pricingType)}
            </span>
          )}
        </section>
        <section className={styles.section}>
          <h4 className={styles.subHeading}>List at</h4>

          <span className={styles.statement}>
            {offer.pricingType === 'market' && buildListAtCalculation()}
            {offer.pricingType === 'fixed' && offer.listAt}
          </span>
        </section>
        <section className={styles.section}>
          <h4 className={styles.subHeading}>Offer Type</h4>
          {offer.offerType && (
            <span className={styles.statement}>
              {toCapitalize(offer.offerType)}
            </span>
          )}
        </section>
        <section className={styles.section}>
          <h4 className={styles.subHeading}>Time Limit</h4>
          {offer.timeLimit && (
            <span className={styles.statement}>
              {`${offer.timeLimit} minutes`}
            </span>
          )}
        </section>
        {offer.terms && (
          <section className={styles.section}>
            <h4 className={styles.subHeading}>Terms</h4>
            <p className={styles.statement}>{offer.terms}</p>
          </section>
        )}
        <section className={styles.section}>
          <h4 className={styles.subHeading}>Instructions</h4>
          <p className={styles.statement}>{offer.instructions}</p>
        </section>
        <ul className={styles.tags}>
          {offer.tags?.map((tag, index) => (
            <li key={index} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThisOffer;
