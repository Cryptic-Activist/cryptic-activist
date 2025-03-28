import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	Label,
	LabelInputDiv,
	Statement,
	TextArea,
} from '@styles/sections/Offer/Create/TradeInstructions';
import { ChangeEvent, FC } from 'react';
import { OfferTermsType } from './types';

const OfferTerms: FC<OfferTermsType> = ({ offerType }) => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);
	const { terms } = createOffer.data;

	const handleTradeInstructionsTerms = (e: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setValue({ terms: e.target.value }));
	};

	return (
		<>
			<LabelInputDiv>
				<Label htmlFor="offerTermsForTheBuyer">
					Offer terms for the {offerType === 'buy' ? 'seller' : 'buyer'}
				</Label>
				<TextArea
					id="offerTermsForTheBuyer"
					placeholder="Write your terms here"
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
						handleTradeInstructionsTerms(e)
					}
					value={terms}
				/>
				<Statement>
					The offer terms should very clearly outline what the trade partner can
					expect, wheter it's cash receipt or if they are required to visit an
					external site. Shown publicly on your offer listing, this portion is purely
					informational and should not have details on how to complete a trade.
				</Statement>
			</LabelInputDiv>
		</>
	);
};

export default OfferTerms;
