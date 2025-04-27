'use client';

import React from 'react';
import TradeDetailsPage from '.';
import TradeDetailsPageSkeleton from './skeleton';
import { useFeedback } from '@/hooks';

const TradeDetails = () => {
  const { query, app } = useFeedback(true);
  return (
    <>
      {query.isPending && <TradeDetailsPageSkeleton />}
      {query.data && query.isSuccess && (
        <TradeDetailsPage trade={query.data} app={app} />
      )}
    </>
  );
};

export default TradeDetails;
