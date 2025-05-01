'use client';

import {
  Button,
  Label,
  ListAt,
  PricingType,
  Radio,
  SelectPaymentMethod,
  Selector,
  Tags,
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
    inputInstructions,
    inputTags,
    inputTerms,
    inputLabel,
  } = useEditOffer();

  console.log({ formVaules });

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
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
          {/* {formVaules.paymentMethodId && (
            <TextArea
              id="paymentDetails"
              value={formVaules.paymentDetails ?? ''}
              onChange={inputPaymentDetails}
              name="paymentDetails"
              label="Payment Details"
              info="Describe the payment details such as bank account details"
            />
          )} */}
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
          <Tags createOffer={formVaules} onChange={inputTags} />
          <Label createOffer={formVaules} onChange={inputLabel} />
          <TextArea
            id="terms"
            value={formVaules.terms ?? ''}
            onChange={inputTerms}
            label={`Terms for the ${
              formVaules.offerType === 'buy' ? 'seller' : 'buyer'
            }`}
            info="The offer terms should very clearly outline what the trade partner can
					expect, wheter it's cash receipt or if they are required to visit an
					external site. Shown publicly on your offer listing, this portion is purely
					informational and should not have details on how to complete a trade."
          />

          <TextArea
            id="instructions"
            onChange={inputInstructions}
            label="Trade Instructions"
            info="These instructions are shown to your trade partner once the trade begins.
                Make theme as clear and concise as possible, preferably as a bulleted list,
                and include very clear action items to avoid any confusion."
            value={formVaules.instructions}
          />
          <div className={styles.connectedWallet}>
            <label>Connect Wallet</label>
            <span>{formVaules.vendorWalletAddress}</span>
          </div>
        </form>
      </div>
      <aside className={styles.aside}>
        <h2>Finish editing your offer</h2>
        <p>
          After reviewing your new changes and confirming it, it will be
          immediately available to new trades.
        </p>
        <Button type="submit" size={18} padding="1rem" fullWidth>
          Update Offer
        </Button>
      </aside>
    </div>
  );
};

export default EditOffer;
