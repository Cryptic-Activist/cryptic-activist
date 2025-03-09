'use client';

import { Button, Label, ProgressBar, Tags } from '@/components';
import React, { FC } from 'react';

import { CreateOfferTradeInstructionsProps } from './types';
import Head from 'next/head';
import { TextArea } from '@/components/forms';
import stylesCore from '../index.module.scss';
import { submitOfferCreate } from '@/services/offers';
import { useMutation } from '@tanstack/react-query';

const CreateOfferTradeInstructions: FC<CreateOfferTradeInstructionsProps> = ({
  setCreateOfferValues,
  toStep,
  createOffer,
  step,
  onClickEvents,
}) => {
  const mutation = useMutation({
    mutationKey: ['createOffer'],
    mutationFn: submitOfferCreate,
  });
  const goToNextStep = () => {
    if (createOffer.isTradeInstructionsCompleted) {
      console.log();
      mutation.mutate(createOffer);
    }
  };

  const inputTags = (value: string[]) => {
    setCreateOfferValues({ tags: value });
  };

  const inputLabel = (value: string) => {
    setCreateOfferValues({ label: value });
  };

  const inputTerms = (value: string) => {
    setCreateOfferValues({ terms: value });
  };

  const inputInstructions = (value: string) => {
    setCreateOfferValues({ instructions: value });
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
            <Tags createOffer={createOffer} onChange={inputTags} />
          </section>
          <section className={stylesCore.horizontalGroup}>
            <Label createOffer={createOffer} onChange={inputLabel} />
          </section>
          <section className={stylesCore.horizontalGroup}>
            <TextArea
              id="terms"
              value={createOffer.terms ?? ''}
              onChange={inputTerms}
              label={`Terms for the ${
                createOffer.offerType === 'buy' ? 'seller' : 'buyer'
              }`}
              info="The offer terms should very clearly outline what the trade partner can
					expect, wheter it's cash receipt or if they are required to visit an
					external site. Shown publicly on your offer listing, this portion is purely
					informational and should not have details on how to complete a trade."
            />
          </section>
          <section className={stylesCore.horizontalGroup}>
            <TextArea
              id="instructions"
              value={createOffer.instructions ?? ''}
              onChange={inputInstructions}
              label="Trade Instructions"
              info="These instructions are shown to your trade partner once the trade begins.
				Make theme as clear and concise as possible, preferably as a bulleted list,
				and include very clear action items to avoid any confusion."
            />
          </section>
        </main>
        <aside className={stylesCore.aside}>
          <h3 className={stylesCore.asideHeading}>
            About the Trade Instructions
          </h3>
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
            theme={
              createOffer?.isTradeInstructionsCompleted ? 'primary' : 'ghost'
            }
            isDisabled={!createOffer?.isTradeInstructionsCompleted}
            onClick={goToNextStep}
          >
            Finish offer creation
          </Button>
        </aside>
      </div>
    </>
  );
};

export default CreateOfferTradeInstructions;
