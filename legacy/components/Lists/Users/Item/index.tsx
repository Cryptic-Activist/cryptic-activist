import Avatar from '@components/Avatar';
import { FC } from 'react';
import {
	Container,
	Names,
	NamesUsername,
	OffersAvailable,
	Username,
} from 'styles/components/Lists/Users/User';

import { UserProps } from 'types/components/Lists/Users/User';

const ListItem: FC<UserProps> = ({ user }) => {
	console.log(user);
	// @ts-ignore
	const offersAvailable = user.offers.length;
	return (
		<Container href={`/vendor/${user.username}`}>
			<Avatar
				width="3rem"
				height="3rem"
				borderRadius="0.3rem"
				isProfilePage={false}
				firstName={user.firstName}
				lastName={user.lastName}
			/>
			<NamesUsername>
				<Names>{`${user.firstName} ${user.lastName}`}</Names>
				<Username>{user.username}</Username>
			</NamesUsername>

			<OffersAvailable>
				<strong>{offersAvailable}</strong>
				{` ${offersAvailable > 1 ? 'Offers' : 'Offer'} Available`}
			</OffersAvailable>
		</Container>
	);
};

export default ListItem;
