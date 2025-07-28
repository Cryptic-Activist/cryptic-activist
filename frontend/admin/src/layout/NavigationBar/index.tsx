'use client';

import Link from 'next/link';
import { isLoggedIn } from '@/utils/checks/admin';
import { openModal } from '@/stores/navigationBar';
import styles from './styles.module.scss';
import { useAdmin } from '@/hooks';

const NavigationBar = () => {
	const { admin, handleLogOut } = useAdmin();

	const toggleLogin = () => {
		openModal({ modal: 'login' });
	};

	const toggleUserTooltip = () => {
		openModal({ modal: 'login' });
	};

	return (
		<nav className={styles.nav}>
			<div className={styles.container}>
				<Link href="/" className={styles.brand}>
					<div className={styles.brandPrimary}>
						<h1>Cryptic</h1>
						<h2>Activist</h2>
					</div>
					<div className={styles.sep}></div>
					<div className={styles.brandSecondary}>
						<h3>Admin</h3>
					</div>
				</Link>
				<ul className={styles.menu}>
					<li>
						<Link href="/" className={styles.menuItem}>
							Home
						</Link>
					</li>
					<li>
						{isLoggedIn(admin.data) ? (
							<button className={styles.userButton} onClick={toggleUserTooltip}>
								{admin.data?.firstName}
							</button>
						) : (
							<button className={styles.userButton} onClick={toggleLogin}>
								Login
							</button>
						)}
					</li>
					{isLoggedIn(admin.data) && (
						<button className={styles.menuItem} onClick={handleLogOut}>
							Logout
						</button>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default NavigationBar;
