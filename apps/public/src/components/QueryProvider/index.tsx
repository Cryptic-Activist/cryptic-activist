'use client';

import React, { FC, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { IS_DEVELOPMENT } from '@/constants';
import { wagmiConfig } from '@/config';

import { QueryProviderProps } from './types';

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={IS_DEVELOPMENT} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default QueryProvider;
