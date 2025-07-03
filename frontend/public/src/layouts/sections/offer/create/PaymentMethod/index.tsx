import {
  Button,
  ProgressBar,
  Radio,
  SelectPaymentMethod,
  Selector,
} from '@/components';
import React, { FC } from 'react';

import { CreateOfferPaymentMethodProps } from './types';
import Head from 'next/head';
import type { Item } from '@/components/Radio/types';
import { TextArea } from '@/components/forms';
import { convertNewlinesToBr } from '@/utils';
import styles from './index.module.scss';
import stylesCore from '../index.module.scss';

const CreateOfferPaymentMethod: FC<CreateOfferPaymentMethodProps> = ({
  setCreateOfferValue,
  toStep,
  saveCreateOfferLocally,
  createOffer,
  step,
  onClickEvents,
  paymentDetailsQuery,
}) => {
  const selectOfferType = (value: Item) => {
    setCreateOfferValue({ offerType: value.value }, 'createOffer/setOfferType');
  };

  const selectPaymentMethod = (id: string) => {
    setCreateOfferValue(
      { paymentMethodId: id },
      'createOffer/setPaymentMethodId'
    );
  };

  const inputPaymentDetails = (value: string) => {
    setCreateOfferValue(
      { paymentDetails: value },
      'createOffer/setPaymentDetails'
    );
  };

  const goToNextStep = () => {
    if (createOffer.isPaymentMethodCompleted) {
      saveCreateOfferLocally();
      toStep(1);
    }
  };

  const onClickPaymentDetails = (id: string) => {
    setCreateOfferValue(
      {
        paymentDetails: {
          id,
        },
      },
      'createOffer/setPaymentDetails'
    );
  };

  return (
    <>
      <Head>
        <title>Payment Method | Create Offer - Cryptic Activist</title>
      </Head>
      <div className={stylesCore.container}>
        <div className={stylesCore.main}>
          <h1 className={stylesCore.heading}>Create an Offer</h1>
          <ProgressBar
            steps={['Payment Method', 'Trade Pricing', 'Trade Instructions']}
            currentStep={step}
            onClickEvents={onClickEvents}
          />
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Choose Fiat</h2>
            <Selector type="fiat" hasLabel={false} />
          </section>
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Choose Wallet</h2>
            <Selector
              type="wallet"
              hasLabel={false}
              selected={createOffer.vendorWalletAddress}
            />
          </section>
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Choose Cryptocurrency</h2>
            <Selector type="cryptocurrency" hasLabel={false} />
          </section>
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>Choose Chain</h2>
            <Selector type="chain" hasLabel={false} />
          </section>
          {createOffer?.cryptocurrency && (
            <section className={stylesCore.horizontalGroup}>
              <h2 className={stylesCore.groupHeading}>
                What would like to do?
              </h2>
              <Radio
                items={[
                  { label: 'Buy', value: 'buy' },
                  { label: 'Sell', value: 'sell' },
                ]}
                onChange={selectOfferType}
                value={createOffer.offerType}
              />
            </section>
          )}
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>
              Step 1: Select a payment method
            </h2>
            <SelectPaymentMethod
              handlePaymentMethod={selectPaymentMethod}
              paymentMethodId={createOffer.paymentMethodId}
            />
          </section>
          {createOffer.paymentMethodId && (
            <section className={stylesCore.horizontalGroup}>
              <TextArea
                id="paymentDetails"
                value={
                  typeof createOffer.paymentDetails === 'string'
                    ? createOffer.paymentDetails
                    : ''
                }
                onChange={inputPaymentDetails}
                label="New Payment Details"
                info="Describe the payment details such as bank account details"
              />
              {paymentDetailsQuery.data?.length > 0 && (
                <ul className={styles.paymentDetails}>
                  {paymentDetailsQuery.data.map((pd: any) => {
                    const isSelected =
                      typeof createOffer.paymentDetails === 'object' &&
                      createOffer.paymentDetails !== null &&
                      'id' in createOffer.paymentDetails &&
                      (createOffer.paymentDetails as { id: string }).id ===
                        pd.id;
                    return (
                      <li key={pd.id}>
                        <button
                          type="button"
                          className={`${isSelected ? styles.selected : ''}`}
                          dangerouslySetInnerHTML={{
                            __html: convertNewlinesToBr(pd.instructions),
                          }}
                          onClick={() => onClickPaymentDetails(pd.id)}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </div>
        <aside className={stylesCore.aside}>
          <h3 className={stylesCore.asideHeading}>About the Payment Method</h3>
          <section className={stylesCore.horizontalGroup}>
            <p className={stylesCore.asideStatement}>
              In this step you&apos;ll be asked for the payment method of your
              offer
            </p>
            <p className={stylesCore.asideStatement}>
              Make your selection on payment method and move onto the next step.
            </p>
          </section>
          <Button
            fullWidth
            padding="1em"
            type="button"
            theme={createOffer?.isPaymentMethodCompleted ? 'primary' : 'ghost'}
            isDisabled={!createOffer?.isPaymentMethodCompleted}
            onClick={goToNextStep}
          >
            Go the next step: Trade pricing
          </Button>
        </aside>
      </div>
    </>
  );
};

export default CreateOfferPaymentMethod;
