import Button from '../Button';
import DynamicIcon from '../DynamicIcon';
import { FC } from 'react';
import { StatusCardProps } from './types';
import styles from './index.module.scss';

const ActionCard: FC<StatusCardProps> = ({
	title,
	iconName,
	actionButton,
	href
}) => {
	return (
		<div className={styles.statusCard}>
			<div className={styles.statusCardHeader}>
				<div className={styles.icon}>
					<DynamicIcon iconName={iconName} size={32} />
				</div>
				<span>{title}</span>
			</div>
			<div className={styles.statusCardContent}>
				<Button href={href}>{actionButton}</Button>
			</div>
		</div>
	);
};

export default ActionCard;
