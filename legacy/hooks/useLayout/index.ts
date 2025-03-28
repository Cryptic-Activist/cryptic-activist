import { useEffect, useLayoutEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@store/index';
import { setDimension, setIsMobile } from '@store/reducers/app';

import { isClientSide } from '@utils/browser';

const useLayout = () => {
	const dispatch = useAppDispatch();
	const { app } = useAppSelector((state) => state);

	const [footerHeight, setFooterHeight] = useState<number>(0);
	const [size, setSize] = useState<[number, number]>([0, 0]);

	const useWindowSize = () => {
		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth, window.innerHeight]);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return size;
	};

	if (isClientSide) dispatch(setDimension(useWindowSize()));

	useEffect(() => {
		setFooterHeight(document.querySelector('#pageFooter').clientHeight);
		if (app.dimensions[0] <= 768) {
			dispatch(setIsMobile(true));
		} else {
			dispatch(setIsMobile(false));
		}
	}, [app.dimensions]);

	return { footerHeight };
};

export default useLayout;
