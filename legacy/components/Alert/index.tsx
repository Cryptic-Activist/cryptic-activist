import { FC } from 'react';

import { AlertContainer } from '@styles/components/Alert';

import { AlertProps } from './types';

const Alert: FC<AlertProps> = ({ message }) => {
	return <AlertContainer>{message}</AlertContainer>;
};

export default Alert;
