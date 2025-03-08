import { Button, ProgressBar, Tags } from '@/components';
import React, { FC } from 'react';

import { CreateOfferTradeInstructionsProps } from './types';
import Head from 'next/head';
import stylesCore from '../index.module.scss';

const CreateOfferTradeInstructions: FC<CreateOfferTradeInstructionsProps> = ({
  setCreateOfferValues,
  toStep,
  createOffer,
  step,
  onClickEvents,
}) => {
  const goToNextStep = () => {
    if (createOffer.isTradeInstructionsCompleted) {
      toStep(3);
    }
  };

  const inputTags = (value: string[]) => {
    setCreateOfferValues({ tags: value });
  };

  return (
    <>
      <Head>
        <title>Trade Instructions | Create Offer - Cryptic Activist</title>
      </Head>
      <div className={stylesCore.container}>
        <main className={stylesCore.main}>
          <h1 className={stylesCore.heading}>Create an Offer</h1>
          <ProgressBar
            steps={['Payment Method', 'Trade Pricing', 'Trade Instructions']}
            currentStep={step}
            onClickEvents={onClickEvents}
          />
          <section className={stylesCore.horizontalGroup}>
            <h2 className={stylesCore.groupHeading}>
              Step 3: Trade Instructions
            </h2>
            <Tags
              createOffer={createOffer}
              onChange={inputTags}
              id="tags"
              width="50%"
            />
          </section>
        </main>
        <aside className={stylesCore.aside}>
          <h3 className={stylesCore.asideHeading}>About the Trade Pricing</h3>
          <section className={stylesCore.horizontalGroup}>
            <p className={stylesCore.asideStatement}>
              In this step you'll be asked for the payment method of your offer
            </p>
            <p className={stylesCore.asideStatement}>
              Make your selection on payment method and move onto the next step.
            </p>
          </section>
          <Button
            fullWidth
            padding="1em"
            type="button"
            theme={createOffer?.isTradePricingCompleted ? 'primary' : 'ghost'}
            isDisabled={!createOffer?.isTradePricingCompleted}
            onClick={goToNextStep}
          >
            Go the next step: Trade Instructions
          </Button>
        </aside>
      </div>
    </>
  );
};

export default CreateOfferTradeInstructions;
