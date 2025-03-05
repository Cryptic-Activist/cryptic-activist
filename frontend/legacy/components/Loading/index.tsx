import { useState, useEffect, FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { ILoading } from 'types/components/Loading';

import { LoadingComponent } from '@styles/components/Loading';

const Loading: FC<ILoading> = ({ loading, size, children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);

	return (
		<>
			{isLoading ? (
				<LoadingComponent size={size}>
					<FaSpinner />
				</LoadingComponent>
			) : (
				children
			)}
		</>
	);
};

export default Loading;
