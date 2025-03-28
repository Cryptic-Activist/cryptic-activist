import { useEffect, useState } from 'react';
import {
	IRegisterUserObj,
	IRegisterUserResponse,
} from 'types/components/Modals/RegisterForm/RegisterForm';

import { UseNewUserProps } from './types';

const useNewUser = ({ reset }: UseNewUserProps) => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [username, setUsername] = useState<string>('');

	useEffect(() => {
		const getRandomCredentials = async (): Promise<void> => {
			const response = await fetch(
				`${process.env.USER_API}/users/get/random/credentials`,
				{
					cache: 'no-cache',
					method: 'GET',
					mode: 'cors',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const data = await response.json();

			if (data.status_code === 200) {
				setFirstName(data.results.names[0]);
				setLastName(data.results.names[1]);
				setUsername(data.results.username);
			}
		};

		reset();
		getRandomCredentials();
	}, []);

	const registerUser = async (
		userObj: IRegisterUserObj
	): Promise<IRegisterUserResponse> => {
		const response = await fetch(
			`${process.env.USER_API}/users/auth/register`,
			{
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userObj),
			}
		);
		const data = await response.json();
		return data;
	};

	return { firstName, lastName, username, registerUser };
};

export default useNewUser;
