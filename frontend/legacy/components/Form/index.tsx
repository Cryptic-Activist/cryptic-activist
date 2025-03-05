import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormProps } from './types';

const Form: FC<FormProps> = ({ defaultValues, onSubmit, children }) => {
	const { handleSubmit, register } = useForm({ defaultValues });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{Array.isArray(children)
				? children.map((child) => {
						return child.props.name
							? React.createElement(child.type, {
									...{
										...child.props,
										register,
										key: child.props.name,
									},
							  })
							: child;
				  })
				: children}
		</form>
	);
};

export default Form;
