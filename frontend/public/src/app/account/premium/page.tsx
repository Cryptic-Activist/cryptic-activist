'use client';

import {
  FaBolt,
  FaChartLine,
  FaCrown,
  FaShield,
  FaStar,
  FaUsers,
} from 'react-icons/fa6';
import React, { useState } from 'react';

import styles from './page.module.scss';

const PremiumSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: {
      price: 29.99,
      period: 'month',
      savings: null,
      totalAnnual: 359.88,
    },
    annual: {
      price: 19.99,
      period: 'month',
      savings: 33,
      totalAnnual: 239.88,
      billedAnnually: true,
    },
  };

  const currentTierBenefits = {
    bronze: { discount: '0.10%', volume: '$0 - $10K' },
    silver: { discount: '0.08%', volume: '$10K - $50K' },
    gold: { discount: '0.06%', volume: '$50K - $200K' },
    platinum: { discount: '0.04%', volume: '$200K+' },
  };

  const premiumFeatures = [
    {
      icon: <FaChartLine className={styles.featureIcon} />,
      title: 'Additional Fee Discount',
      description:
        'Get an extra 0.02% discount on all trades, stacking with your tier discount',
    },
    {
      icon: <FaBolt className={styles.featureIcon} />,
      title: 'Priority Support',
      description: '24/7 dedicated support with response times under 1 hour',
    },
    {
      icon: <FaShield className={styles.featureIcon} />,
      title: 'Advanced Security',
      description: 'Enhanced 2FA, transaction monitoring, and fraud protection',
    },
    {
      icon: <FaUsers className={styles.featureIcon} />,
      title: 'Exclusive Access',
      description: 'Early access to new features, coins, and trading pairs',
    },
    {
      icon: <FaStar className={styles.featureIcon} />,
      title: 'Premium Analytics',
      description:
        'Advanced trading insights, market analysis, and portfolio tracking',
    },
  ];

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      alert('Premium subscription activated! Welcome to Premium.');
    }, 2000);
  };

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
              {Object.entries(currentTierBenefits).map(([tier, benefits]) => (
                <div key={tier} className={styles.tierCard}>
                  <div className={styles.tierHeader}>
                    <h3 className={styles.tierName}>{tier}</h3>
                    <div className={styles.tierBadge}></div>
                  </div>
                  <p className={styles.tierVolume}>Volume: {benefits.volume}</p>
                  <p className={styles.tierFee}>Fee: {benefits.discount}</p>
                </div>
              ))}
            </div>
            <div className={styles.premiumBonus}>
              <p className={styles.premiumBonusText}>
                <strong>Premium Bonus:</strong> Add an extra 0.02% discount to
                your current tier rate!
              </p>
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
                  onClick={handleSubscribe}
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
          <div className={styles.card}>
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
          </div>

          {/* Fee Calculator */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Fee Calculator</h2>
            <div className={styles.calculatorGrid}>
              <div className={styles.calculatorColumn}>
                <h3 className={styles.calculatorTitle}>
                  Current Fees (Gold Tier Example)
                </h3>
                <div className={styles.calculatorRows}>
                  <div className={styles.calculatorRow}>
                    <span>Base Fee:</span>
                    <span>0.10%</span>
                  </div>
                  <div className={styles.calculatorRow}>
                    <span>Tier Discount:</span>
                    <span>-0.04%</span>
                  </div>
                  <div
                    className={`${styles.calculatorRow} ${styles.calculatorTotal}`}
                  >
                    <span>Current Rate:</span>
                    <span>0.06%</span>
                  </div>
                </div>
              </div>
              <div className={styles.calculatorColumn}>
                <h3 className={styles.calculatorTitle}>With Premium</h3>
                <div className={styles.calculatorRows}>
                  <div className={styles.calculatorRow}>
                    <span>Base Fee:</span>
                    <span>0.10%</span>
                  </div>
                  <div className={styles.calculatorRow}>
                    <span>Tier Discount:</span>
                    <span>-0.04%</span>
                  </div>
                  <div
                    className={`${styles.calculatorRow} ${styles.calculatorPremium}`}
                  >
                    <span>Premium Bonus:</span>
                    <span>-0.02%</span>
                  </div>
                  <div
                    className={`${styles.calculatorRow} ${styles.calculatorTotal} ${styles.calculatorPremiumTotal}`}
                  >
                    <span>Premium Rate:</span>
                    <span>0.04%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.calculatorExample}>
              <p className={styles.calculatorExampleText}>
                <strong>Savings Example:</strong> On a $10,000 trade, you save
                $2 compared to your current rate!
              </p>
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
