'use client';

import {
  ListAt,
  PricingType,
  Radio,
  SelectPaymentMethod,
  Selector,
  TradeLimit,
  TradeTime,
} from '@/components';

import React from 'react';
import { TextArea } from '@/components/forms';
import styles from './page.module.scss';
import { useEditOffer } from '@/hooks';

const EditOffer = () => {
  const {
    query,
    formVaules,
    handleSubmit,
    onSubmit,
    selectOfferType,
    selectPaymentMethod,
    selectRateType,
    inputListAt,
    inputMaxTradeAmount,
    inputMinTradeAmount,
    inputTradeTimeLimit,
  } = useEditOffer();

  console.log({ formVaules });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit your Offer: {query.data?.id}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Selector type="fiat" hasLabel={true} />
        <Selector type="cryptocurrency" hasLabel={true} />
        <Radio
          items={[
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
          ]}
          onChange={selectOfferType}
          value={formVaules.offerType}
        />
        <SelectPaymentMethod
          handlePaymentMethod={selectPaymentMethod}
          paymentMethodId={formVaules.paymentMethodId}
        />
        {formVaules.paymentMethodId && (
          <TextArea
            id="paymentDetails"
            value={formVaules.paymentDetails ?? ''}
            name="paymentDetails"
            label="Payment Details"
            info="Describe the payment details such as bank account details"
          />
        )}
        <PricingType onChange={selectRateType} createOffer={formVaules} />
        {(formVaules?.pricingType === 'fixed' ||
          formVaules?.pricingType === 'market') && (
          <ListAt onChange={inputListAt} createOffer={formVaules} />
        )}
        <TradeLimit
          createOffer={formVaules}
          inputMinTradeAmount={inputMinTradeAmount}
          inputMaxTradeAmount={inputMaxTradeAmount}
        />
        <TradeTime
          createOffer={formVaules}
          inputTradeTimeLimit={inputTradeTimeLimit}
        />
      </form>
    </div>
  );
};

export default EditOffer;
