'use client';

import { useEffect, useState } from 'react';

import type { RegisterAdmin } from './types';
import { handleRegisterAdmin } from '@/stores/admin';

const useNewAdmin = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');

	useEffect(() => {
		const getRandomCredentials = async (): Promise<void> => {
			const response = await fetch(
				`${process.env.USER_API}/admins/get/random/credentials`,
				{
					cache: 'no-cache',
					method: 'GET',
					mode: 'cors',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			const data = await response.json();

			if (data.status_code === 200) {
				setFirstName(data.results.names[0]);
				setLastName(data.results.names[1]);
				setUsername(data.results.username);
			}
		};

		getRandomCredentials();
	}, []);

	const registerAdmin = async (admin: RegisterAdmin) => {
		const registered = await handleRegisterAdmin(admin);
		return registered;
	};

	return { registerAdmin, firstName, lastName, username };
};

export default useNewAdmin;
