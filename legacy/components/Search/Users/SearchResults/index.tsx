import { FC } from 'react';
import { UsersSearchResultsProps } from './types';

import { Container, Statement } from '@styles/components/Search/Users/User';

const UsersSearchResults: FC<UsersSearchResultsProps> = ({ term, total }) => {
	return (
		<Container>
			<Statement>
				<strong>Total:</strong> {total}
			</Statement>
			<Statement>
				<strong>Search Term:</strong> {term}
			</Statement>
		</Container>
	);
};

export default UsersSearchResults;
