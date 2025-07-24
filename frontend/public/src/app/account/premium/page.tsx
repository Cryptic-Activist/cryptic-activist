'use client';

import type {
  CalculatorRowProps,
  FaqItemProps,
  FeeCalculatorProps,
  PlanCardProps,
  PricingPlanProps,
  TierCardProps,
} from './types';
import React, { FC, useEffect, useState } from 'react';

import { FaCrown } from 'react-icons/fa6';
import { Period } from '@/hooks/usePremium/types';
import { getLocaleDateString } from '@/utils';
import styles from './page.module.scss';
import { usePremium } from '@/hooks';

// Component: Tier Card
const TierCard: FC<TierCardProps> = ({ tier }) => (
  <div className={styles.tierCard}>
    <div className={styles.tierHeader}>
      <h3 className={styles.tierName}>{tier.name}</h3>
      <div
        className={`${styles.tierBadge} ${styles[tier.name.toLowerCase()]}`}
      ></div>
    </div>
    <p className={styles.tierVolume}>Volume: {tier.volume}</p>
    <p className={styles.tierFee}>Fee: {tier.tradingFee}</p>
  </div>
);

// Component: Calculator Row
const CalculatorRow: FC<CalculatorRowProps> = ({
  label,
  value,
  isHighlighted = false,
  isPremium = false,
}) => (
  <div
    className={`${styles.calculatorRow} ${
      isHighlighted ? styles.calculatorTotal : ''
    } ${isPremium ? styles.calculatorPremium : ''}`}
  >
    <span>{label}:</span>
    <span>{value}</span>
  </div>
);

// Component: FAQ Item
const FaqItem: FC<FaqItemProps> = ({ question, answer }) => (
  <div className={styles.faqItem}>
    <h3 className={styles.faqQuestion}>{question}</h3>
    <p className={styles.faqAnswer}>{answer}</p>
  </div>
);

// Component: Plan Toggle
const PlanToggle: FC<{
  selectedPlan: string;
  onPlanChange: (plan: Period) => void;
}> = ({ selectedPlan, onPlanChange }) => (
  <div className={styles.planToggle}>
    <div className={styles.planToggleContainer}>
      <button
        onClick={() => onPlanChange('MONTHLY')}
        className={`${styles.planToggleButton} ${
          selectedPlan === 'MONTHLY' ? styles.active : ''
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onPlanChange('YEARLY')}
        className={`${styles.planToggleButton} ${
          selectedPlan === 'YEARLY' ? styles.active : ''
        }`}
      >
        Annual
      </button>
    </div>
  </div>
);

// Component: Plan Card
const PlanCard: FC<PlanCardProps> = ({
  plan,
  isProcessing,
  onSubscribe,
  currentPremiumSubscription,
  scheduledPremiumSubscription,
  usdcTokenDetails,
  subscribeToPremiumMutation,
  handleChangeSubscription,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubscribed =
    currentPremiumSubscription === plan.period ||
    subscribeToPremiumMutation.data?.ok;
  const isDifferentSubscriptionScheduled =
    scheduledPremiumSubscription &&
    scheduledPremiumSubscription.period !== currentPremiumSubscription;

  const isDisabled =
    isProcessing ||
    isSubscribed ||
    !usdcTokenDetails.abi ||
    (subscribeToPremiumMutation.data?.ok && !currentPremiumSubscription) ||
    isDifferentSubscriptionScheduled;

  useEffect(() => {
    if (subscribeToPremiumMutation?.data?.error) {
      setErrorMessage(subscribeToPremiumMutation.data.error);
      const timer = setTimeout(() => setErrorMessage(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [subscribeToPremiumMutation]);

  const handleSubscribe = () => {
    if (isDisabled) return;
    if (currentPremiumSubscription) {
      handleChangeSubscription();
    } else {
      onSubscribe();
    }
  };

  const getButtonLabel = () => {
    if (errorMessage) return errorMessage;
    if (isProcessing) return 'Processing...';
    if (isSubscribed) return 'Subscribed';
    if (isDifferentSubscriptionScheduled) {
      return `Starts on ${getLocaleDateString(
        new Date(scheduledPremiumSubscription.startsAt)
      )}`;
    }
    return 'Subscribe Now';
  };

  return (
    <div className={styles.planCard}>
      <div className={styles.planHeader}>
        <h3 className={styles.planName}>Premium</h3>
        <div className={styles.planPrice}>
          ${plan.price}
          <span className={styles.planPeriod}>
            /{plan.period === 'MONTHLY' ? 'month' : 'year'}
          </span>
        </div>
        {plan.savings && (
          <div className={styles.planSavings}>Save {plan.savings}%</div>
        )}
        {plan.billedAnnually && (
          <p className={styles.planBilling}>
            Billed annually (${plan.totalAnnual})
          </p>
        )}
      </div>

      <button
        onClick={handleSubscribe}
        disabled={isDisabled}
        className={`${styles.subscribeButton} ${
          isProcessing ? styles.processing : ''
        }`}
      >
        {getButtonLabel()}
      </button>

      <p className={styles.planDisclaimer}>
        Cancel anytime • 30-day money-back guarantee
      </p>
    </div>
  );
};

// Component: Header Section
const HeaderSection: FC = () => (
  <div className={styles.header}>
    <div className={styles.headerIcon}>
      <FaCrown className={styles.crownIcon} />
    </div>
    <h1 className={styles.headerTitle}>Upgrade to Premium</h1>
    <p className={styles.headerSubtitle}>
      Unlock exclusive benefits and maximize your trading potential with our
      premium subscription
    </p>
  </div>
);

// Component: Current Tier Benefits
const CurrentTierBenefits: FC<{
  formattedTiers: any[];
  premiumDiscount: number | null;
}> = ({ formattedTiers, premiumDiscount }) => (
  <div className={styles.card}>
    <h2 className={styles.cardTitle}>Your Current Tier Benefits</h2>
    <div className={styles.tierGrid}>
      {formattedTiers?.map((tier) => (
        <TierCard key={tier.id} tier={tier} />
      ))}
    </div>
    <div className={styles.premiumBonus}>
      {premiumDiscount && typeof premiumDiscount === 'number' && (
        <p className={styles.premiumBonusText}>
          <strong>Premium Bonus:</strong> Add an extra {premiumDiscount * 100}%
          discount to your current tier rate!
        </p>
      )}
    </div>
  </div>
);

// Component: Pricing Plans
const PricingPlans: FC<PricingPlanProps> = ({
  selectedPlan,
  plans,
  isProcessing,
  onPlanChange,
  onSubscribe,
  currentPremiumSubscription,
  scheduledPremiumSubscription,
  usdcTokenDetails,
  subscribeToPremiumMutation,
  changePremiumSubscriptionMutation,
  handleChangeSubscription,
}) => (
  <div className={styles.card}>
    <h2 className={styles.cardTitleCenter}>Choose Your Plan</h2>
    <PlanToggle selectedPlan={selectedPlan} onPlanChange={onPlanChange} />
    <div className={styles.planContainer}>
      <PlanCard
        plan={plans[selectedPlan]}
        isProcessing={isProcessing}
        onSubscribe={onSubscribe}
        currentPremiumSubscription={currentPremiumSubscription}
        usdcTokenDetails={usdcTokenDetails}
        subscribeToPremiumMutation={subscribeToPremiumMutation}
        handleChangeSubscription={handleChangeSubscription}
        scheduledPremiumSubscription={scheduledPremiumSubscription}
        selectedPlan={selectedPlan}
        changePremiumSubscriptionMutation={changePremiumSubscriptionMutation}
      />
    </div>
  </div>
);

// Component: Fee Calculator
const FeeCalculator: FC<FeeCalculatorProps> = ({
  user,
  baseFee,
  currentRate,
  premiumDiscount,
  totalDiscountPremium,
  amountExample,
  savingExample,
}) => {
  const formatDiscount = (discount: number | undefined) => {
    if (!discount || discount === 0) return '0%';
    return `${discount > 0 ? '-' : ''}${discount}%`;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Fee Calculator</h2>
      <div className={styles.calculatorGrid}>
        <div className={styles.calculatorColumn}>
          <h3 className={styles.calculatorTitle}>
            Current Fees ({user.tier?.name}) Tier
          </h3>
          <div className={styles.calculatorRows}>
            <CalculatorRow label="Base Fee" value={`${baseFee}%`} />
            <CalculatorRow
              label="Tier Discount"
              value={formatDiscount(user.tier?.discount)}
            />
            <CalculatorRow
              label="Current Rate"
              value={`${currentRate}%`}
              isHighlighted
            />
          </div>
        </div>

        <div className={styles.calculatorColumn}>
          <h3 className={styles.calculatorTitle}>With Premium</h3>
          <div className={styles.calculatorRows}>
            <CalculatorRow label="Base Fee" value={`${baseFee}%`} />
            <CalculatorRow
              label="Tier Discount"
              value={formatDiscount(user.tier?.discount)}
            />
            <CalculatorRow
              label="Premium Bonus"
              value={premiumDiscount ? `-${premiumDiscount * 100}%` : '0%'}
              isPremium
            />
            <CalculatorRow
              label="Premium Rate"
              value={
                totalDiscountPremium ? `${totalDiscountPremium * 100}%` : '0%'
              }
              isHighlighted
            />
          </div>
        </div>
      </div>

      {premiumDiscount && user.tier && savingExample && (
        <div className={styles.calculatorExample}>
          <p className={styles.calculatorExampleText}>
            <strong>Savings Example:</strong>
            {` On a $${amountExample} trade, you save $${savingExample} compared to your current rate!`}
          </p>
        </div>
      )}
    </div>
  );
};

// Component: FAQ Section
const FaqSection: FC = () => {
  const faqData = [
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes, you can cancel your subscription at any time. Your premium benefits will remain active until the end of your billing period.',
    },
    {
      question: 'How do the discounts stack?',
      answer:
        'Your premium discount is added to your existing tier discount. For example, if you have a 0.06% tier rate, premium brings it down to 0.04%.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and select cryptocurrencies for subscription payments.',
    },
  ];

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {faqData.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

// Main Component
const PremiumSubscription: FC = () => {
  const {
    baseFee,
    currentRate,
    formattedTiers,
    isProcessing,
    selectedPlan,
    user,
    premiumDiscount,
    setSelectedPlan,
    savingExample,
    amountExample,
    totalDiscountPremium,
    plans,
    subscribeToPremiumMutation,
    currentPremiumSubscription,
    changePremiumSubscriptionMutation,
    account,
    handleSubscribe,
    usdcTokenDetails,
    handleChangeSubscription,
    scheduledPremiumSubscription,
  } = usePremium();

  return (
    <div className={styles.wrapper}>
      <HeaderSection />

      <div className={styles.container}>
        <div className={styles.content}>
          <CurrentTierBenefits
            formattedTiers={formattedTiers}
            premiumDiscount={premiumDiscount}
          />

          <PricingPlans
            selectedPlan={selectedPlan}
            // @ts-ignore
            plans={plans}
            isProcessing={isProcessing}
            onPlanChange={setSelectedPlan}
            onSubscribe={handleSubscribe}
            currentPremiumSubscription={currentPremiumSubscription}
            changePremiumSubscriptionMutation={
              changePremiumSubscriptionMutation
            }
            userId={user.id}
            wallet={account?.address}
            usdcTokenDetails={usdcTokenDetails}
            subscribeToPremiumMutation={subscribeToPremiumMutation}
            handleChangeSubscription={handleChangeSubscription}
            scheduledPremiumSubscription={scheduledPremiumSubscription}
          />

          <FeeCalculator
            user={user}
            baseFee={baseFee}
            currentRate={currentRate}
            premiumDiscount={premiumDiscount}
            totalDiscountPremium={totalDiscountPremium}
            amountExample={amountExample}
            savingExample={savingExample}
          />

          <FaqSection />
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscription;
