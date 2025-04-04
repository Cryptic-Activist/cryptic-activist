import styles from './page.module.scss';

export default function CookiesPolicy() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cookies Policy</h1>
      <p>
        Last Updated: <strong>April, 04 2025</strong>
      </p>
      <section className={styles.section}>
        <h2>Introduction</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          experience, support platform functionality, and improve security. This
          policy explains what cookies are, how we use them, and your choices
          regarding their use.
        </p>
      </section>
      <section className={styles.section}>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device that help us
          remember your preferences, analyze site traffic, and secure your
          account.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Types of Cookies We Use</h2>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Necessary for user
            authentication, session management, and core functionalities.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors
            use the platform so we can optimize performance.
          </li>
          <li>
            <strong>Preference Cookies:</strong> Store your language, layout,
            and other customization choices.
          </li>
          <li>
            <strong>Security Cookies:</strong> Aid in fraud detection and
            safeguard against suspicious activities.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>How We Use Cookies</h2>
        <ul>
          <li>
            <strong>Enhancing Security:</strong> Monitor logins, detect unusual
            patterns, and support our AI-powered fraud detection.
          </li>
          <li>
            <strong>Personalization:</strong> Tailor content and maintain user
            settings across sessions.
          </li>
          <li>
            <strong>Analytics:</strong> Track visitor behavior to improve
            platform functionality.
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Managing Cookies</h2>
        <p>
          You can control cookie settings via your browser preferences. Note
          that disabling certain cookies may affect your experience and some
          functionalities.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Contact & Updates</h2>

        <p>
          For questions regarding our cookies policy, please contact us. We
          reserve the right to update this policy as necessary.
        </p>
      </section>
    </div>
  );
}
