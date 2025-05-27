'use client';

import { Button, Label, ProgressBar, Tags } from '@/components';

import { CreateOfferTradeInstructionsProps } from './types';
import { FC } from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import Head from 'next/head';
import { TextArea } from '@/components/forms';
import { removeLocalStorage } from '@/utils';
import stylesCore from '../index.module.scss';
import { submitOfferCreate } from '@/services/offers';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const CreateOfferTradeInstructions: FC<CreateOfferTradeInstructionsProps> = ({
  setCreateOfferValue,
  resetCreateOffer,
  toStep,
  saveCreateOfferLocally,
  createOffer,
  step,
  onClickEvents,
  vendorWalletAddress,
}) => {
  const router = useRouter();

  const createOfferMutation = useMutation({
    mutationKey: ['createOffer'],
    mutationFn: submitOfferCreate,
    retry: 3,
    onSuccess: () => {
      resetCreateOffer();
      removeLocalStorage('createOffer');
      router.replace('/account');
    },
  });

  const submitOffer = () => {
    if (createOffer.isTradeInstructionsCompleted && vendorWalletAddress) {
      createOfferMutation.mutate({ ...createOffer, vendorWalletAddress });
    }
  };

  const inputTags = (value: string[]) => {
    setCreateOfferValue({ tags: value }, 'createOffer/setTags');
  };

  const inputLabel = (value: string) => {
    setCreateOfferValue({ label: value }, 'createOffer/setLabel');
  };

  const inputTerms = (value: string) => {
    setCreateOfferValue({ terms: value }, 'createOffer/setTerms');
  };

  const inputInstructions = (value: string) => {
    setCreateOfferValue({ instructions: value }, 'createOffer/Instructions');
  };

  const backToTradePricing = () => {
    saveCreateOfferLocally();
    toStep(1);
  };

  return (
    <>
      <Head>
        <title>Trade Instructions | Create Offer - Cryptic Activist</title>
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
        </div>
        <aside className={stylesCore.aside}>
          <h3 className={stylesCore.asideHeading}>
            About the Trade Instructions
          </h3>
          <section className={stylesCore.horizontalGroup}>
            <p className={stylesCore.asideStatement}>
              In this step you&apos;ll be asked for the payment method of your
              offer
            </p>
            <p className={stylesCore.asideStatement}>
              Make your selection on payment method and move onto the next step.
            </p>
          </section>
          <div className={stylesCore.buttons}>
            <Button padding="1em" type="button" onClick={backToTradePricing}>
              <FaChevronLeft size={18} />
            </Button>
            <Button
              fullWidth
              padding="1em"
              type="button"
              theme={
                createOffer?.isTradeInstructionsCompleted ? 'primary' : 'ghost'
              }
              isDisabled={!createOffer?.isTradeInstructionsCompleted}
              onClick={submitOffer}
            >
              Finish offer creation
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default CreateOfferTradeInstructions;
