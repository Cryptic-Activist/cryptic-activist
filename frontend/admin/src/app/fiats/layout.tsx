'use client';

import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { FaPlus } from 'react-icons/fa';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';

import layout from './layout.module.scss';
import type { FiatsLayoutProps } from './types';

const FiatsLayout: FC<FiatsLayoutProps> = ({ children }) => {
	const pathname = usePathname();
	const isCreatePage = pathname?.includes('create');

	return (
		<div className={layout.container}>
			<Breadcrumb>
				{!isCreatePage && (
					<Button href="/fiats/create">
						<FaPlus />
						<></>
					</Button>
				)}
			</Breadcrumb>
			{children}
		</div>
	);
};

export default FiatsLayout;
