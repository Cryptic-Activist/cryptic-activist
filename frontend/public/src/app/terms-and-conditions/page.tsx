import { APP_NAME } from '@/constants';
import styles from './page.module.scss';

export default function TermsAndConditions() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Terms and Conditions</h1>
      <section className={styles.section}>
        <h2>1. Introduction & Acceptance</h2>
        <p>
          By accessing or using our platform, you agree to be bound by these
          terms and conditions. You must be of legal age and have the capacity
          to enter into this agreement.
        </p>
      </section>
      <section className={styles.section}>
        <h2>2. Definitions</h2>
        <p>
          Key terms include: <br />
          <strong>User/Trader:</strong> An individual using the platform for P2P
          crypto-to-fiat trading. <br />
          <strong>Platform:</strong> The online service provided by{' '}
          <strong>{APP_NAME}</strong>. <br />
          <strong>Escrow:</strong> The mechanism holding crypto funds until
          confirmation of fiat payment via bank transfer.
        </p>
      </section>
      <section className={styles.section}>
        <h2>3. User Accounts & Security</h2>
        <p>
          <strong>Registration:</strong> Users must provide accurate information
          and may be subject to optional KYC verification. <br />
          <strong>Account Responsibility:</strong> You are responsible for
          maintaining the confidentiality of your login credentials. <br />
          <strong>Security:</strong> We implement strong security measures;
          refer to our Privacy Policy for details.
        </p>
      </section>
      <section className={styles.section}>
        <h2>4. Trading Process</h2>
        <p>
          <strong>Offer Listing & Matching:</strong> Users can create, browse,
          and accept trade offers. <br />
          <strong>Crypto Escrow:</strong> Crypto funds are held in escrow until
          the corresponding fiat transfer (conducted off-platform) is confirmed.{' '}
          <br />
          <strong>Communication:</strong> All trade negotiations occur via the
          platform’s secure chat system. <br />
          <strong>Dispute Resolution:</strong> In case of issues, our dispute
          resolution process will be activated, with evidence reviewed by
          moderators.
        </p>
      </section>
      <section className={styles.section}>
        <h2>5. Fees & Payments</h2>
        <p>
          <strong>Fee Structure:</strong> A small trading fee is deducted from
          the crypto held in escrow. <br />
          <strong>Off-Platform Fiat:</strong> Users are responsible for
          executing fiat transfers outside the platform.
        </p>
      </section>
      <section className={styles.section}>
        <h2>6. Prohibited Activities</h2>
        <p>
          Engaging in fraud, misrepresentation, or any activity that undermines
          platform integrity is strictly forbidden. Violations may result in
          suspension or termination of your account.
        </p>
      </section>
      <section className={styles.section}>
        <h2>7. Liability & Disclaimers</h2>
        <p>
          <strong>Risk Acknowledgment:</strong> Trading cryptocurrencies carries
          inherent risks. <br />
          <strong>Limited Liability:</strong> The platform is not liable for
          losses from off-platform fiat transactions or unresolved disputes.{' '}
          <br />
          <strong>Force Majeure:</strong> We are not responsible for events
          beyond our control.
        </p>
      </section>
      <section className={styles.section}>
        <h2>8. Intellectual Property</h2>
        <p>
          All content on the platform, including user-generated content, is
          subject to our intellectual property rights. Users grant us a license
          to display their content within the platform.
        </p>
      </section>
      <section className={styles.section}>
        <h2>9. Amendments & Termination</h2>
        <p>
          We reserve the right to modify these terms with notice. Accounts may
          be suspended or terminated for violations of these terms.
        </p>
      </section>
      <section className={styles.section}>
        <h2>10. Governing Law & Dispute Resolution</h2>
        <p>
          These terms are governed by the laws of [Your Jurisdiction]. Disputes
          shall be resolved through arbitration or in [Your Jurisdiction’s
          Courts].
        </p>
      </section>
      <section className={styles.section}>
        <h2>11. Contact Information</h2>
        <p>
          For any questions regarding these terms, please contact us at [Your
          Contact Information].
        </p>
      </section>
    </div>
  );
}
