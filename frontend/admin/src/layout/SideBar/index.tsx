import { DynamicIcon } from '@/components';
import { FC } from 'react';
import Link from 'next/link';
import { SideBarProps } from './types';
import { sidebarItems } from './data';
import styles from './styles.module.scss';
import { usePathname } from 'next/navigation';

const Item: FC<SideBarProps> = ({ href, label, icon }) => {
	const pathname = usePathname();
	const assignedPath = href.split('/');
	const isCurrentPage = pathname?.split('/')[1].includes(assignedPath[1]);

	return (
		<li
			className={`${styles.asideListItem} ${
				isCurrentPage ? styles.asideListItemIsCurrentPage : null
			}`}
		>
			<Link href={href}>
				{icon && <DynamicIcon iconName={icon} />}
				<span>{label}</span>
			</Link>
		</li>
	);
};

const SideBar = () => {
	return (
		<aside className={styles.aside}>
			<ul className={styles.asideList}>
				{sidebarItems.map((sidebarItem, index) => (
					<Item
						key={index}
						href={sidebarItem.href}
						label={sidebarItem.label}
						icon={sidebarItem.icon}
					/>
				))}
			</ul>
		</aside>
	);
};

export default SideBar;
