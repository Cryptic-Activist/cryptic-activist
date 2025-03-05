import React, { FC } from 'react';

import { CreateOfferTradeInstructionsProps } from './types';
import Head from 'next/head';
import stylesCore from '../index.module.scss';

const CreateOfferTradeInstructions: FC<CreateOfferTradeInstructionsProps> = ({
  setCreateOfferValues,
  createOffer,
}) => {
  return (
    <>
      <Head>
        <title>Trade Instructions | Create Offer - Cryptic Activist</title>
      </Head>
      <div className={stylesCore.container}>
        <main className={stylesCore.main}></main>
        <aside className={stylesCore.aside}></aside>
      </div>
    </>
  );
};

export default CreateOfferTradeInstructions;
