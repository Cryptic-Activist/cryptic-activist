'use client';

import { FaCrown } from 'react-icons/fa6';
import React from 'react';
import styles from './page.module.scss';
import { usePremium } from '@/hooks';

const PremiumSubscription = () => {
  const {
    baseFee,
    currentRate,
    // subscribeToPremiumMutation,
    // tiers,
    formattedTiers,
    isProcessing,
    selectedPlan,
    user,
    premiumDiscount,
    // setIsProcessing,
    setSelectedPlan,
    savingExample,
    amountExample,
    totalDiscountPremium,
    plans,
  } = usePremium();

  return (
    <div className={styles.wrapper}>
      {/* Header */}
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
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Current Tier Benefits */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Your Current Tier Benefits</h2>
            <div className={styles.tierGrid}>
              {formattedTiers?.map((tier) => (
                <div key={tier.id} className={styles.tierCard}>
                  <div className={styles.tierHeader}>
                    <h3 className={styles.tierName}>{tier.name}</h3>
                    <div className={styles.tierBadge}></div>
                  </div>
                  <p className={styles.tierVolume}>Volume: {tier.volume}</p>
                  <p className={styles.tierFee}>Fee: {tier.tradingFee}</p>
                </div>
              ))}
            </div>
            <div className={styles.premiumBonus}>
              {premiumDiscount && typeof premiumDiscount === 'number' && (
                <p className={styles.premiumBonusText}>
                  <strong>Premium Bonus:</strong> Add an extra{' '}
                  {premiumDiscount * 100}% discount to your current tier rate!
                </p>
              )}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className={styles.card}>
            <h2 className={styles.cardTitleCenter}>Choose Your Plan</h2>

            <div className={styles.planToggle}>
              <div className={styles.planToggleContainer}>
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className={`${styles.planToggleButton} ${
                    selectedPlan === 'monthly' ? styles.active : ''
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPlan('annual')}
                  className={`${styles.planToggleButton} ${
                    selectedPlan === 'annual' ? styles.active : ''
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>

            <div className={styles.planContainer}>
              <div className={styles.planCard}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>Premium</h3>
                  <div className={styles.planPrice}>
                    ${plans[selectedPlan].price}
                    <span className={styles.planPeriod}>
                      /{plans[selectedPlan].period}
                    </span>
                  </div>
                  {plans[selectedPlan].savings && (
                    <div className={styles.planSavings}>
                      Save {plans[selectedPlan].savings}%
                    </div>
                  )}
                  {plans[selectedPlan].billedAnnually && (
                    <p className={styles.planBilling}>
                      Billed annually (${plans[selectedPlan].totalAnnual})
                    </p>
                  )}
                </div>

                <button
                  // onClick={() =>
                  //   subscribeToPremiumMutation.mutateAsync(
                  //     selectedPlan === 'annual' ? 'YEARLY' : 'MONTHLY'
                  //   )
                  // }
                  disabled={isProcessing}
                  className={`${styles.subscribeButton} ${
                    isProcessing ? styles.processing : ''
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Subscribe Now'}
                </button>

                <p className={styles.planDisclaimer}>
                  Cancel anytime • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          {/* <div className={styles.card}>
            <h2 className={styles.cardTitleCenter}>Premium Features</h2>
            <div className={styles.featuresGrid}>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  <div className={styles.featureIconContainer}>
                    {feature.icon}
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Fee Calculator */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Fee Calculator</h2>
            <div className={styles.calculatorGrid}>
              <div className={styles.calculatorColumn}>
                <h3 className={styles.calculatorTitle}>
                  {`Current Fees (${user.tier?.name}) Tier`}
                </h3>
                <div className={styles.calculatorRows}>
                  <div className={styles.calculatorRow}>
                    <span>Base Fee:</span>
                    <span>{`${baseFee}%`}</span>
                  </div>
                  <div className={styles.calculatorRow}>
                    <span>Tier Discount:</span>
                    <span>{`${
                      user.tier?.discount && user.tier?.discount > 0 ? '-' : ''
                    }${user.tier?.discount}%`}</span>
                  </div>
                  <div
                    className={`${styles.calculatorRow} ${styles.calculatorTotal}`}
                  >
                    <span>Current Rate:</span>
                    <span>{`${currentRate}%`}</span>
                  </div>
                </div>
              </div>
              <div className={styles.calculatorColumn}>
                <h3 className={styles.calculatorTitle}>With Premium</h3>
                <div className={styles.calculatorRows}>
                  <div className={styles.calculatorRow}>
                    <span>Base Fee:</span>
                    <span>{`${baseFee}%`}</span>
                  </div>
                  <div className={styles.calculatorRow}>
                    <span>Tier Discount:</span>
                    <span>{`${
                      user.tier?.discount && user.tier?.discount > 0 ? '-' : ''
                    }${user.tier?.discount}%`}</span>
                  </div>
                  <div
                    className={`${styles.calculatorRow} ${styles.calculatorPremium}`}
                  >
                    <span>Premium Bonus:</span>
                    {premiumDiscount && (
                      <span>{`-${premiumDiscount * 100}%`}</span>
                    )}
                  </div>
                  <div
                    className={`${styles.calculatorRow} ${styles.calculatorTotal} ${styles.calculatorPremiumTotal}`}
                  >
                    <span>Premium Rate:</span>
                    {totalDiscountPremium && (
                      <span>{`${totalDiscountPremium * 100}%`}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.calculatorExample}>
              {premiumDiscount && user.tier && (
                <p className={styles.calculatorExampleText}>
                  <strong>Savings Example:</strong>
                  {` On a $${amountExample} trade, you save $${savingExample} compared to your current rate!`}
                </p>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqContainer}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Can I cancel anytime?</h3>
                <p className={styles.faqAnswer}>
                  Yes, you can cancel your subscription at any time. Your
                  premium benefits will remain active until the end of your
                  billing period.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  How do the discounts stack?
                </h3>
                <p className={styles.faqAnswer}>
                  Your premium discount is added to your existing tier discount.
                  For example, if you have a 0.06% tier rate, premium brings it
                  down to 0.04%.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  What payment methods do you accept?
                </h3>
                <p className={styles.faqAnswer}>
                  We accept all major credit cards, PayPal, and select
                  cryptocurrencies for subscription payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscription;
