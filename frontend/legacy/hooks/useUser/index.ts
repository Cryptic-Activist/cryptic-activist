import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';
import { resetNavigationBar } from '@store/reducers/navigationBar';
import { decodeAccessToken } from '@store/thunks/user';
import { isLoggedIn } from '@utils/checkers';

let counter: number = 0;

const useUser = (fetch?: boolean) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state);

	useEffect(() => {
		if (isLoggedIn(user)) {
			dispatch(resetNavigationBar('modals'));
		}
	}, [user.data]);

	useEffect(() => {
		if (fetch && counter === 0) {
			dispatch(decodeAccessToken());
			counter += 1;
		}
	}, []);

	return { user };
};

export default useUser;
