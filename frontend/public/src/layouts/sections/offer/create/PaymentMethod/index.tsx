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
import stylesCore from '../index.module.scss';

const CreateOfferPaymentMethod: FC<CreateOfferPaymentMethodProps> = ({
  setCreateOfferValue,
  toStep,
  saveCreateOfferLocally,
  createOffer,
  step,
  onClickEvents,
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

  const goToNextStep = () => {
    if (createOffer.isPaymentMethodCompleted) {
      saveCreateOfferLocally();
      toStep(1);
    }
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
            <h2 className={stylesCore.groupHeading}>Choose Cryptocurrency</h2>
            <Selector type="cryptocurrency" hasLabel={false} />
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
