import styles from './page.module.scss';

const KYCPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>KYC Verification</h1>
      <p className={styles.intro}>
        To ensure a safe and compliant trading environment, all users must
        complete our KYC (Know Your Customer) verification process. This helps
        us protect the community, prevent fraud, and comply with regulatory
        standards.
      </p>

      <section className={styles.section}>
        <h2>Why is KYC Important?</h2>
        <p>
          KYC verification is essential for confirming the identity of users and
          mitigating risks such as fraud, money laundering, and other financial
          crimes. It ensures that our trading environment remains secure and
          trustworthy.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Our KYC Process - Step by Step</h2>
        <ol className={styles.stepsList}>
          <li>
            <strong>Step 1: Account Registration</strong>
            <p>
              Start by creating your account with basic details such as your
              full name, email address, and phone number.
            </p>
          </li>
          <li>
            <strong>Step 2: Document Upload</strong>
            <p>
              Upload a clear photo of a government-issued photo ID (passport,
              driver’s license, or national ID). Make sure that all details are
              legible.
            </p>
          </li>
          <li>
            <strong>Step 3: Selfie Verification</strong>
            <p>
              Take a selfie or record a short video as instructed. This step
              helps us verify that you are the same person in your photo ID.
            </p>
          </li>
          <li>
            <strong>Step 4: Address Verification (if required)</strong>
            <p>
              In some cases, we may ask for proof of address (such as a recent
              utility bill) to further confirm your identity.
            </p>
          </li>
          <li>
            <strong>Step 5: Review & Approval</strong>
            <p>
              Our verification team will review your submissions. Once approved,
              you will receive a confirmation email, and your account will be
              marked as verified.
            </p>
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2>Important Details</h2>
        <ul className={styles.detailsList}>
          <li>
            All submitted documents are encrypted and securely stored. We never
            share your personal information with third parties.
          </li>
          <li>
            The verification process typically takes 24-48 hours, depending on
            the volume of submissions.
          </li>
          <li>
            If your documents are unclear or you face any issues, please contact
            our support team for assistance.
          </li>
          <li>
            Completing KYC helps ensure faster and smoother transaction
            processing on our platform.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <p className={styles.notice}>
          Note: Completion of KYC is mandatory for higher trading limits and to
          access additional platform features.
        </p>
      </section>
    </div>
  );
};

export default KYCPage;
