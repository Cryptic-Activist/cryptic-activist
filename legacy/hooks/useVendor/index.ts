import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { isObjectNotEmpty } from '@utils/checkers';

import { useAppSelector, useAppDispatch } from '@store/index';
import { getVendor } from '@store/thunks/vendor';

const useVendor = () => {
	const router = useRouter();
	const { query } = router;

	const dispatch = useAppDispatch();
	const { vendor } = useAppSelector((state) => state);

	useEffect(() => {
		if (isObjectNotEmpty(query)) {
			dispatch(getVendor({ username: query.username as string }));
		}
	}, [query]);

	return { vendor };
};

export default useVendor;
