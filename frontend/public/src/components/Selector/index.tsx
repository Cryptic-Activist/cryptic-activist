'use client';

import { BuildCryptocurrencyLabel, BuildLabel, SelectorProps } from './types';
import {
  FC,
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { toCapitalize, toUpperCase } from '@/utils';
import { useApp, useNavigationBar } from '@/hooks';

import Image from 'next/image';
import styles from './index.module.scss';

const Selector: FC<SelectorProps> = ({ type, hasLabel = true }) => {
  const [label, setLabel] = useState<
    string | ReactElement<unknown, string | JSXElementConstructor<any>>
  >('No data');

  const { app } = useApp();
  const { toggleModal } = useNavigationBar();
  const { defaults } = app;

  const buildFiatLabel: BuildLabel = (symbol, name) => {
    return `${toUpperCase(symbol)} - ${toCapitalize(name)}`;
  };

  const buildCryptocurrencyLabel: BuildCryptocurrencyLabel = (image, name) => {
    return (
      <div className={styles.labelContent}>
        <Image
          src={image}
          alt={`${name} icon`}
          width={24}
          height={24}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <span>{name}</span>
      </div>
    );
  };

  const getButtonLabel = () => {
    const localLabel =
      type === 'cryptocurrency'
        ? buildCryptocurrencyLabel(
            defaults.cryptocurrency?.image!,
            defaults.cryptocurrency?.name!
          )
        : buildFiatLabel(defaults.fiat?.symbol!, defaults.fiat?.name!);

    setLabel(localLabel);
  };

  const handleClick = () => {
    if (type === 'fiat') {
      toggleModal('fiats');
    }
    if (type === 'cryptocurrency') {
      toggleModal('cryptocurrencies');
    }
  };

  useEffect(() => {
    if (defaults.cryptocurrency && defaults.fiat) {
      getButtonLabel();
    }
  }, [defaults, type]);

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
