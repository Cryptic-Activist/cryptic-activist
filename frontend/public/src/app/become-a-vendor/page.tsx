import { APP_NAME, SUPPORT_EMAIL } from '@/constants';

import styles from './page.module.scss';

export default function BecomeAVendor() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Become a Vendor</h1>
      <section className={styles.section}>
        <h2>Join Our Trusted Network of Vendors</h2>
        <p>
          At <strong>{APP_NAME}</strong>, we empower professional traders and
          businesses to offer their services as trusted vendors. Expand your
          reach and enjoy enhanced features designed for your trading
          operations.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Benefits of Becoming a Vendor</h2>
        <ul>
          <li>
            <strong>Enhanced Visibility:</strong> Stand out with a verified
            vendor badge and featured listings.
          </li>
          <li>
            <strong>Priority Support:</strong> Access dedicated support channels
            and faster dispute resolution.
          </li>
          <li>
            <strong>Lower Trading Fees:</strong> Enjoy discounted fees as a
            reward for reliability and volume.
          </li>
          <li>
            <strong>Marketing Opportunities:</strong> Gain exposure through our
            community channels and promotions.
          </li>
          <li>
            <strong>Exclusive Tools:</strong> Benefit from advanced trading
            analytics and custom vendor tools.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Who Can Become a Vendor?</h2>
        <p>
          Professional traders, businesses, and high-volume sellers/buyers with
          a proven trading history and excellent ratings are encouraged to
          apply.
        </p>
      </section>
      <section className={styles.section}>
        <h2>How to Apply</h2>
        <ol>
          <li>
            <strong>Sign Up or Log In:</strong> Create an account or log in to
            your existing profile.
          </li>
          <li>
            <strong>Complete the Vendor Application Form:</strong> Provide
            details about your trading experience, volume, and any relevant
            certifications.
          </li>
          <li>
            <strong>Verification Process:</strong> Our team will review your
            application, which may include background checks and KYC
            verification.
          </li>
          <li>
            <strong>Approval & Onboarding:</strong> Upon approval, you&apos;ll
            receive a vendor badge, access to enhanced tools, and onboarding
            guidance.
          </li>
        </ol>
      </section>
      <section className={styles.section}>
        <h2>Vendor FAQs</h2>
        <ul>
          <li>
            <strong>What criteria are used for vendor approval?</strong> We
            evaluate trading history, KYC verification, user feedback, and
            overall market activity.
          </li>
          <li>
            <strong>How long does the verification process take?</strong>{' '}
            Typically, between 3-7 business days.
          </li>
          <li>
            <strong>What support do vendors receive?</strong> Vendors have
            access to priority customer service and promotional support.
          </li>
          <li>
            <strong>Can I reapply if my application is rejected?</strong> Yes,
            you may reapply after addressing any issues or providing additional
            documentation.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Get Started Today</h2>
        <p>
          Ready to elevate your trading? <a href="#">Apply Now</a> and join our
          network of trusted vendors.
        </p>
        <p>
          For any questions, please contact our vendor support team at{' '}
          <strong>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </strong>
          .
        </p>
      </section>
    </div>
  );
}
