'use client';

import { Button, Checkbox } from '@/components';
import React, { FormEvent, useEffect, useState } from 'react';
import { removeLocalStorage, setLocalStorage } from '@/utils';
import { useNavigationBar, useOffer } from '@/hooks';

import Template from '../Template';
import styles from './index.module.scss';

const StartTradeConfirmation = () => {
  const { onSubmit } = useOffer();
  const { toggleModal } = useNavigationBar();

  const [isDecisionRemembered, setIsDecisionRemembered] = useState(false);

  useEffect(() => {
    const rememberedDecision = localStorage.getItem('startTradeConfirmation');
    if (rememberedDecision) {
      const parsedDecision = JSON.parse(rememberedDecision);
      if (parsedDecision) {
        setIsDecisionRemembered(parsedDecision);
      }
    }
  }, []);

  const handleCheckboxClick = () => {
    setIsDecisionRemembered((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDecisionRemembered) {
      setLocalStorage('startTradeConfirmation', 'true');
    } else {
      removeLocalStorage('startTradeConfirmation');
    }

    onSubmit(e);
    toggleModal('startTradeConfirmation');
  };

  return (
    <Template width="25rem" heading="Start Trade Confirmation">
      <form className={styles.container} onSubmit={handleSubmit}>
        <p>
          By starting the trade you agree on start executing the trade on the
          blockchain. There is a trasaction fee associated to this action.
        </p>
        <Checkbox
          checked={isDecisionRemembered}
          label="Remember this decision"
          onClick={handleCheckboxClick}
        />
        <Button size={16} padding="1rem" fullWidth type="submit">
          Start Trading
        </Button>
      </form>
    </Template>
  );
};

export default StartTradeConfirmation;
