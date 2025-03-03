import { useAppSelector } from '@store/index';

const useCryptocurrency = () => {
	const { app } = useAppSelector((state) => state);

	return {
		currentPrice: app.currentPrice.data,
	};
};

export default useCryptocurrency;
