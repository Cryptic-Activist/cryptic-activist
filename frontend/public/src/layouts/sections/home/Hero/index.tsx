'use client';

import { BsChevronCompactDown } from 'react-icons/bs';
import { Button } from '@/components';
import { HeroImage } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';
import { useNavigationBar } from '@/hooks';

const Hero = () => {
  const { toggleModal } = useNavigationBar();

  console.log({ HeroImage: HeroImage.src });

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.titles}>
          <h1>
            <span>Cryptic Activist Catalog</span> is a P2P Trading Platform
          </h1>

          <h2>
            Fast, secure, and peer-to-peer smart contract based crypto trades
            directly from your wallet.
          </h2>
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
        </div>
        <Image
          src={HeroImage.src ?? null}
          alt="Hero background"
          height={350}
          width={350}
          className={styles.backgroundImage}
        />
      </div>
      {/* <Link href="#howItWorks" className={styles.howItWorks}>
        <p>How It Works</p>
        <BsChevronCompactDown size={20} />
      </Link> */}
    </section>
  );
};

export default Hero;
