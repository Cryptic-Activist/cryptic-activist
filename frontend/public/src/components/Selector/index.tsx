'use client';

import { BuildCryptocurrencyLabel, SelectorProps } from './types';
import {
  FC,
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useApp, useNavigationBar } from '@/hooks';

import Image from 'next/image';
import countryFlags from '@/hooks/useFiats/countryFlags';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const Selector: FC<SelectorProps> = ({
  type,
  hasLabel = true,
  overrideLabel,
  selected,
}) => {
  const [label, setLabel] = useState<
    string | ReactElement<unknown, string | JSXElementConstructor<any>>
  >('No data');

  const { app } = useApp();
  const { toggleModal } = useNavigationBar();
  const { defaults } = app;

  const buildLabel: BuildCryptocurrencyLabel = (image, name) => {
    return (
      <div className={styles.labelContent}>
        <Image
          src={image ?? null}
          alt={`${name} icon`}
          width={24}
          height={24}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <span>{name}</span>
      </div>
    );
  };

  // console.log({ selected, type });

  const getButtonLabel = () => {
    const build = () => {
      if (type === 'cryptocurrency' && defaults.cryptocurrency) {
        return buildLabel(
          defaults.cryptocurrency.image,
          defaults.cryptocurrency.name
        );
      } else if (type === 'fiat' && defaults.fiat) {
        return buildLabel(
          countryFlags[defaults.fiat.country],
          defaults.fiat.name
        );
      } else if (type === 'chain' && defaults.chain) {
        return buildLabel(defaults.chain.logoUrl, defaults.chain.name);
      } else if (type === 'wallet' && selected) {
        return (
          <div className={styles.labelContent}>
            <span>{selected}</span>
          </div>
        );
      } else if (type === 'wallet' && !selected) {
        return (
          <div className={styles.labelContent}>
            <span>Select Wallet</span>
          </div>
        );
      } else if (type === 'paymentMethod' && defaults.paymentMethod) {
        if (overrideLabel) {
          return overrideLabel;
        }
        return defaults.paymentMethod.name;
      }
      return 'No data';
    };

    setLabel(build());
  };

  const handleClick = () => {
    if (type === 'fiat') {
      toggleModal('fiats');
    }
    if (type === 'cryptocurrency') {
      toggleModal('cryptocurrencies');
    }
    if (type === 'paymentMethod') {
      toggleModal('paymentMethods');
    }
    if (type === 'chain') {
      toggleModal('chains');
    }
    if (type === 'wallet') {
      toggleModal('wallets');
    }
  };

  useEffect(() => {
    if (defaults.cryptocurrency && defaults.fiat && defaults.chain) {
      getButtonLabel();
    }
  }, [defaults, type, selected]);

  return (
    <div className={styles.container}>
      {hasLabel && (
        <label htmlFor={styles.selector} className={styles.label}>
          {toCapitalize(type)}
        </label>
      )}
      <button
        className={styles.selector}
        id={styles.selector}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Selector;
