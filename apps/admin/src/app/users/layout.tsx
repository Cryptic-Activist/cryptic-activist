'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';

import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';

import layout from './layout.module.scss';
import { UsersLayoutProps } from './types';

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
	const pathname = usePathname();
	const isCreatePage = pathname?.includes('create');

	return (
		<div className={layout.container}>
			<Breadcrumb>
				{!isCreatePage && (
					<Button href="/users/create">
						<FaPlus />
						<></>
					</Button>
				)}
			</Breadcrumb>
			{children}
		</div>
	);
};

export default UsersLayout;
