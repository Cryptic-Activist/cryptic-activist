'use client';

import React, { useEffect } from 'react';
import { useApp, useTrade } from '@/hooks';

import TradeDetailsPage from '.';
import TradeDetailsPageSkeleton from './skeleton';

const TradeDetails = () => {
  const { trade, queryTrade } = useTrade();
  const { app, setValue } = useApp();

  useEffect(() => {
    if (trade.cryptocurrency) {
      setValue({
        defaults: {
          cryptocurrency: trade.cryptocurrency,
        },
      });
    }
    if (trade.fiat) {
      setValue({
        defaults: {
          fiat: trade.fiat,
        },
      });
    }
  }, [trade.cryptocurrency, trade.fiat]);

  return (
    <>
      {queryTrade.isPending ? (
        <TradeDetailsPageSkeleton />
      ) : (
        <TradeDetailsPage trade={trade} app={app} />
      )}
    </>
  );
};

export default TradeDetails;
