'use client';

import { BsChevronCompactDown } from 'react-icons/bs';
import { Button } from '@/components';
import Link from 'next/link';
// import { HeroBackground } from '@/assets';
// import Image from 'next/image';
import styles from './index.module.scss';
import { useNavigationBar } from '@/hooks';

const Hero = () => {
  const { toggleModal } = useNavigationBar();

  return (
    <section className={styles.hero}>
      {/* <Image
        src={HeroBackground.src}
        alt="Hero background"
        height={200}
        width={240}
        className={styles.backgroundImage}
      /> */}
      <div className={styles.titles}>
        <h1>Buy & Sell Crypto for Fiat Securely - No Middlemen, No Hassle</h1>
        <h2>
          Fast, secure, and peer-to-peer Bitcoin and crypto trading via bank
          transfer.
        </h2>
      </div>
      <div className={styles.cta}>
        <Button theme="secondary" padding="0.8rem" href="/vendors">
          Start Trading
        </Button>
        <Button
          theme="primary"
          padding="0.8rem"
          onClick={() => toggleModal('register')}
        >
          Sign Up & Trade
        </Button>
      </div>
      <Link href="#howItWorks" className={styles.howItWorks}>
        <p>How It Works</p>
        <BsChevronCompactDown size={20} />
      </Link>
    </section>
  );
};

export default Hero;
