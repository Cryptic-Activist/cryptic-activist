import { GetServerSideProps } from 'next';
import { FC } from 'react';

import { USER_API } from '@constants/envs';
import { fetchGet } from '@services/axios';
import { Container } from '@styles/pages/Users/User';

import UsersList from '@components/Lists/Users';
import UsersSearchResults from '@components/Search/Users/SearchResults';

type UsersProps = {
	params: {
		user: string;
	};
	data?: any[];
};

const Users: FC<UsersProps> = ({ params, data }) => {
	const { user } = params;

	return (
		<Container>
			<UsersSearchResults term={user} total={data.length} />
			<UsersList users={data} />
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	try {
		const response = await fetchGet(
			`${USER_API}/users/get/multiple/users?user=${params?.user}`
		);

		if (response.status !== 200) {
			return { props: { params, data: [] } };
		}

		return {
			props: {
				params,
				data: response.data?.results || [],
			},
		};
	} catch (_error) {
		return { props: { params, data: [] } };
	}
};

export default Users;
