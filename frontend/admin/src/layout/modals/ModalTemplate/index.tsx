import { type FC, useCallback } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { useNavigationBar } from '@/hooks';

import styles from './styles.module.scss';
import type { ModalTemplateProps } from './types';

const ModalTemplate: FC<ModalTemplateProps> = ({
	children,
	heading,
	type,
	success,
	successMessage,
	allowClose
}) => {
	const { navigationBar, handleCloseModal } = useNavigationBar();
	const { status } = navigationBar;

	const handleCloseAllModals = useCallback(() => {
		if (allowClose) {
			handleCloseModal();
		}
	}, [allowClose]);

	return (
		<>
			<div className={styles.background} onClick={handleCloseAllModals} />
			<div id={type} className={styles.container}>
				<h1 className={styles.heading}>{heading}</h1>
				{status === 'loading' ? (
					<div className={styles.loading}>
						<FaSpinner />
					</div>
				) : (
					<>
						{success && successMessage ? (
							<p className={styles.message}>{successMessage}</p>
						) : (
							children
						)}
					</>
				)}
			</div>
		</>
	);
};

export default ModalTemplate;
