import DynamicIcon from '../DynamicIcon';
import type { FC } from 'react';
import type { StatusCardProps } from './types';
import styles from './index.module.scss';

const StatusCard: FC<StatusCardProps> = ({
	title,
	iconName,
	counter,
	statement
}) => {
	return (
		<div className={styles.statusCard}>
			<div className={styles.statusCardHeader}>
				<span>{title}</span>
				<DynamicIcon iconName={iconName} />
			</div>
			<div className={styles.statusCardContent}>
				<span className={styles.value}>{counter}</span>
				{statement && (
					<span className={`${styles.statement} ${styles.statementGreen}`}>
						{statement}
					</span>
				)}
			</div>
		</div>
	);
};

export default StatusCard;
