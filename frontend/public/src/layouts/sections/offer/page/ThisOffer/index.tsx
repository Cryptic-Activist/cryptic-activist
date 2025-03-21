import React, { FC } from 'react';

import { ThisOfferProps } from './types';
import coreStyles from '../index.module.scss';
import styles from './index.module.scss';

const ThisOffer: FC<ThisOfferProps> = ({ offer }) => {
  return (
    <div className={`${coreStyles.container} ${coreStyles.offer}`}>
      <h2 className={coreStyles.heading}>About this offer</h2>
      <div className={styles.content}>
        <h3 className={styles.label}>{offer?.label}</h3>
        <p className={styles.statement}>{offer.terms}</p>
        <p className={styles.statement}>{offer.instructions}</p>
        <span>{offer.fiat?.name}</span>
        <span>{offer.cryptocurrency?.name}</span>
        <span>Limit min: {offer.limitMin}</span>
        <span>Limit max: {offer.limitMax}</span>
        <span>List at: {offer.listAt}</span>
        <span>Offer Type: {offer.offerType}</span>
        <span>Pricing Type: {offer.pricingType}</span>
        <span>Time limit: {offer.timeLimit}</span>

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
