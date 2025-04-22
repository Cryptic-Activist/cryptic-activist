'use client';

import React from 'react';
import { useTrade } from '@/hooks';

const TradeDetails = () => {
  const { trade } = useTrade();

  return <div>{trade.id}</div>;
};

export default TradeDetails;
