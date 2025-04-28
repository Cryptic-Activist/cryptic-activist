'use client';

import { useFeedback, useUser } from '@/hooks';

import React from 'react';
import TradeDetailsPage from '.';
import TradeDetailsPageSkeleton from './skeleton';

const TradeDetails = () => {
  const { query, app } = useFeedback(true);
  const { user } = useUser();
  return (
    <>
      {query.isPending && <TradeDetailsPageSkeleton />}
      {query.data && query.isSuccess && (
        <TradeDetailsPage trade={query.data} app={app} user={user} />
      )}
    </>
  );
};

export default TradeDetails;
