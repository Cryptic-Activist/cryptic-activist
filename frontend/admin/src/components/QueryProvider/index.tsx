'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, useState } from 'react';

import { IS_DEVELOPMENT } from '@/constants/envs';
import { QueryProviderProps } from './types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={IS_DEVELOPMENT} />
		</QueryClientProvider>
	);
};

export default QueryProvider;
