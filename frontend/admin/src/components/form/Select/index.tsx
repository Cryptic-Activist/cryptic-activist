import type { FC } from 'react';

import styles from './styles.module.scss';
import type { SelectProps } from './types';

const Select: FC<SelectProps> = ({
	id,
	label,
	register,
	name,
	placeholder,
	options,
	required,
	min,
	max,
	errorMessage
}) => (
	<div className={styles.container}>
		{label && (
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
		)}
		<select
			id={id}
			{...register(name, { required, min, max })}
			className={styles.select}
			placeholder={placeholder}
		>
			{options.map((option, index) => (
				<option key={index} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
		{errorMessage && <p>{errorMessage.toString()}</p>}
	</div>
);

export default Select;
