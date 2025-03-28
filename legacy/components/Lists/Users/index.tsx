import { FC } from 'react';
import { Container } from 'styles/components/Lists/Users/UsersList';

import { UsersListProps } from 'types/components/Lists/Users';

import Item from './Item';

const UsersList: FC<UsersListProps> = ({ users }) => {
	return (
		<Container>
			{users.map((user) => (
				<Item key={user.id} user={user} />
			))}
		</Container>
	);
};

export default UsersList;
