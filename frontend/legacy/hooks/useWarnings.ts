import { useCallback } from 'react';

import { setWarnings, resetWarnings } from '@store/reducers/app';
import { useAppDispatch, useAppSelector } from '@store/hooks';

const useWarnings = () => {
	const dispatch = useAppDispatch();
	const { warnings } = useAppSelector((state) => state.app);

	const addUniqueMessage = (message: string) => {
		const found = warnings.findIndex((msg) => msg === message);

		if (found === -1) {
			return [...warnings, message];
		}

		return warnings;
	};

	const removeUniqueMessage = (message: string) => {
		const found = warnings.findIndex((msg) => msg === message);

		if (found !== -1) {
			const filtered = warnings.filter((msg) => msg !== message);
			return filtered;
		}

		return warnings;
	};

	const add = useCallback(
		(message: string) => {
			const added = addUniqueMessage(message);
			dispatch(setWarnings(added));
		},
		[dispatch]
	);

	const remove = useCallback(
		(message: string) => {
			const removed = removeUniqueMessage(message);
			dispatch(setWarnings(removed));
		},
		[dispatch]
	);

	const reset = useCallback((): void => {
		dispatch(resetWarnings());
	}, [dispatch]);

	return { add, remove, reset };
};

export default useWarnings;
