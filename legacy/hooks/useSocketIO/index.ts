import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';

import { isLoggedIn } from '@utils/checkers';
import { off } from '@utils/socketio';

const useSocketIO = () => {
	// const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state);

	useEffect(() => {
		if (isLoggedIn(user)) {
		}
	}, [user]);

	useEffect(
		() => () => {
			off();
		},
		[]
	);

	return {};
};

export default useSocketIO;
