import { FC } from 'react';

import {
	InputContainer,
	InputElement,
	InputLabel,
	InputRequiredLabelContainer,
} from '@styles/components/Input';

import { InputProps } from './types';
import { toCapitalize } from '@utils/string/string';

const Input: FC<InputProps> = ({
	register,
	name,
	id,
	required,
	disabled,
	...rest
}) => {
	return (
		<InputContainer>
			{id && id.length && (
				<InputRequiredLabelContainer>
					<InputLabel htmlFor={id}>{toCapitalize(id)}</InputLabel>
					{required && <InputLabel>*</InputLabel>}
				</InputRequiredLabelContainer>
			)}
			<InputElement
				{...register(name, {
					required: required,
					disabled: disabled,
				})}
				{...rest}
			/>
		</InputContainer>
	);
};

export default Input;
