'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';

import layout from './layout.module.scss';
import { PaymentMethodsLayoutProps } from './types';

const PaymentMethodCategoriesLayout: FC<PaymentMethodsLayoutProps> = ({
	children
}) => {
	const pathname = usePathname();
	const isCreatePage = pathname?.includes('create');

	return (
		<div className={layout.container}>
			<Breadcrumb>
				{!isCreatePage && (
					<Button href="/payment-methods/create">
						<FaPlus />
						<></>
					</Button>
				)}
			</Breadcrumb>
			{children}
		</div>
	);
};

export default PaymentMethodCategoriesLayout;
