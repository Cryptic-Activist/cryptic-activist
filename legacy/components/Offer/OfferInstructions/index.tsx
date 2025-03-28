import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	Label,
	LabelInputDiv,
	Statement,
	TextArea,
} from '@styles/sections/Offer/Create/TradeInstructions';
import { ChangeEvent } from 'react';

const OfferInstructions = () => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);
	const { instructions } = createOffer.data;

	const handleTradeInstructionsInstructions = (
		e: ChangeEvent<HTMLTextAreaElement>
	) => {
		dispatch(setValue({ instructions: e.target.value }));
	};

	return (
		<LabelInputDiv>
			<Label htmlFor="offerTradeInstructions">Trade instructions</Label>
			<TextArea
				id="offerTradeInstructions"
				placeholder="List out your instructions for your trade partner."
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
					handleTradeInstructionsInstructions(e)
				}
				value={instructions}
			/>
			<Statement>
				These instructions are shown to your trade partner once the trade begins.
				Make theme as clear and concise as possible, preferably as a bulleted list,
				and include very clear action items to avoid any confusion.
			</Statement>
		</LabelInputDiv>
	);
};

export default OfferInstructions;
