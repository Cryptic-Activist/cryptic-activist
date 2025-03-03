import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import { storageCreateOffer } from '@utils/localStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useCreateOffer = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);

	const {
		section,
		isPaymentMethodCompleted,
		isTradeInstructionsCompleted,
		isTradePricingCompleted,
	} = createOffer.data;

	useEffect(() => {
		if (createOffer.hasCreated) {
			router.replace('/');
		}
	}, [createOffer.hasCreated]);

	useEffect(() => {
		const handleToggleSection = () => {
			storageCreateOffer(createOffer);
		};
		handleToggleSection();
	}, [createOffer]);

	useEffect(() => {
		if (createOffer.data.isSubmitted) {
			// dispatch(resetCreate
			router.replace('/account');
		}
	}, [createOffer.data.isSubmitted]);

	useEffect(() => {
		const isFilled =
			isPaymentMethodCompleted &&
			isTradePricingCompleted &&
			isTradeInstructionsCompleted;

		dispatch(setValue({ isFilled }));
	}, [
		isPaymentMethodCompleted,
		isTradePricingCompleted,
		isTradeInstructionsCompleted,
	]);

	return { section };
};

export default useCreateOffer;
