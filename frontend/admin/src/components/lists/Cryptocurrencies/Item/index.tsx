import { FaPen, FaTrash } from 'react-icons/fa';

import { FC } from 'react';
import type { ItemProps } from './types';
import { getLocaleFullDateString } from '@/utils/date';
import styles from './styles.module.scss';

const Item: FC<ItemProps> = ({ item }) => {
	return (
		<li className={styles.item}>
			<div>{item.coingeckoId}</div>
			<div>{item.name}</div>
			<div>{item.symbol}</div>
			<div>{getLocaleFullDateString(new Date(item.createdAt))}</div>
			<div>{getLocaleFullDateString(new Date(item.updatedAt))}</div>
			<div className={styles.actions}>
				<button className={styles.action}>
					<FaPen />
				</button>
				<button className={styles.action}>
					<FaTrash />
				</button>
			</div>
		</li>
	);
};

export default Item;
