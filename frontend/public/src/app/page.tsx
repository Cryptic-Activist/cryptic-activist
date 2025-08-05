import {
  CallToAction,
  Hero,
  HowItWorks,
  KeyFeatures,
  SecurityAndCompliance,
  SocialProof,
} from '@/layouts';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <SocialProof />
      <SecurityAndCompliance />
      <CallToAction />
    </div>
  );
}
