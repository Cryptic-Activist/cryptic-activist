import { DynamicIcon } from '@/components';
import { FC } from 'react';
import Link from 'next/link';
import { SideBarProps } from './types';
import { sidebarItems } from './data';
import styles from './styles.module.scss';
import { useAdmin } from '@/hooks';
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
				<div className={styles.iconContainer}>
					{icon && <DynamicIcon iconName={icon} size={24} />}
				</div>
				<span className={styles.label}>{label}</span>
			</Link>
		</li>
	);
};

const SideBar = () => {
	const { admin, hasRoles } = useAdmin();

	return (
		<aside className={styles.aside}>
			{admin.data?.id && (
				<ul className={styles.asideList}>
					{sidebarItems.map((sidebarItem, index) => {
						const hasPermission = hasRoles(sidebarItem.roles);

						if (hasPermission) {
							return (
								<Item
									key={index}
									href={sidebarItem.href}
									label={sidebarItem.label}
									icon={sidebarItem.icon}
								/>
							);
						}
					})}
				</ul>
			)}
		</aside>
	);
};

export default SideBar;
