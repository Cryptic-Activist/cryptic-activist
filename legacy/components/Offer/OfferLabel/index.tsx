import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	Input,
	Label,
	LabelInputDiv,
	Statement,
} from '@styles/sections/Offer/Create/TradeInstructions';
import { ChangeEvent } from 'react';

const OfferLabel = () => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);
	const { label } = createOffer.data;

	const handleTradeInstructionsLabel = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setValue({ label: e.target.value }));
	};

	return (
		<LabelInputDiv>
			<Label htmlFor="offerLabel">Offer label</Label>
			<Input
				id="offerLabel"
				placeholder="Maximum 40 characters"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleTradeInstructionsLabel(e)
				}
				value={label}
			/>
			<Statement>
				Make your offer stand out to other users with a catchy label. Your label can
				be up to 40 characters long and can contain letters, numbers, apostrophe,
				and hyphen.
			</Statement>
		</LabelInputDiv>
	);
};

export default OfferLabel;
