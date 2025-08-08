import React, { forwardRef } from 'react';

import DynamicIcon from '../DynamicIcon';
import type { ViewerProps } from './types';
import styles from './index.module.scss';

const Viewer = forwardRef<HTMLDivElement, ViewerProps>(
	({ src, onClose }, ref) => {
		const isPdf = false; // You can make this dynamic if needed
		const filename = src?.split('/').pop() || 'Unknown file';

		return (
			<>
				<div className={styles.bg} />
				<div className={styles.container} ref={ref}>
					<div className={styles.header}>
						<h1>{filename}</h1>
						<button onClick={onClose}>
							<DynamicIcon iconName="FaPlus" />
						</button>
					</div>
					<div className={styles.content}>
						{isPdf ? <></> : <img src={src} alt="Preview" />}
					</div>
				</div>
			</>
		);
	}
);

Viewer.displayName = 'Viewer';

export default Viewer;
