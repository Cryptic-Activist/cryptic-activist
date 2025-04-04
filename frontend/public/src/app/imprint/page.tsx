import { APP_NAME } from '@/constants';
import styles from './page.module.scss';

export default function Imprint() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Imprint (Legal Disclosure)</h1>
      <section className={styles.section}>
        <h2>Company Information</h2>
        <p>
          Business Name: {APP_NAME} <br />
          Legal Form: e.g., LLC, GmbH, Inc. <br />
          Registered Address: [Full Physical Address] <br />
          Contact: Phone: [Your Phone Number], Email: [Your Email Address],
          Website: [Your Website URL]
        </p>
      </section>
      <section className={styles.section}>
        <h2>Legal Representatives</h2>
        <p>[Names of Directors or Managing Officers]</p>
      </section>
      <section className={styles.section}>
        <h2>Registration Details</h2>
        <p>
          Business Registration Number: [Your Registration Number] <br />
          VAT ID: [Your VAT Identification Number, if applicable]
        </p>
      </section>
      <section className={styles.section}>
        <h2>Jurisdiction & Applicable Law</h2>
        <p>
          This platform is governed by the laws of [Your Jurisdiction]. Any
          disputes will be resolved in [Your Jurisdiction&apos;s Courts].
        </p>
      </section>
      <section className={styles.section}>
        <h2>Disclaimer</h2>
        <p>
          This imprint is provided for informational purposes and does not
          constitute a legally binding contract.
        </p>
      </section>
    </div>
  );
}
