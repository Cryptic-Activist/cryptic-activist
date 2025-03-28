import { useAppDispatch, useAppSelector } from '@store/index';
import { setValue } from '@store/reducers/createOffer';
import {
	Input,
	Label,
	LabelInputDiv,
	Statement,
	TagsList,
} from '@styles/sections/Offer/Create/TradeInstructions';
import { convertStringToArrayOfStrings } from '@utils/string/string';
import { ChangeEvent } from 'react';

const OfferTags = () => {
	const dispatch = useAppDispatch();
	const { createOffer } = useAppSelector((state) => state);
	const { tags } = createOffer.data;

	const handleTradeInstructionsTags = (
		e: ChangeEvent<HTMLInputElement>
	): void => {
		const isEmpty = e.target.value.length === 0;
		if (isEmpty) {
			dispatch(setValue({ tags: [] }));
		} else {
			const convertedTags = convertStringToArrayOfStrings(e.target.value);
			dispatch(setValue({ tags: convertedTags }));
		}
	};

	return (
		<LabelInputDiv>
			<Label htmlFor="offerTags">Offer tags</Label>
			<Input
				id="offerTags"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleTradeInstructionsTags(e)
				}
			/>
			<Statement>
				Select a maximum of 5 tags that best describe your offer terms.
			</Statement>
			{tags.length > 0 && (
				<TagsList>
					{tags.map((tag) => (
						<span key={`${tag}`}>{tag}</span>
					))}
				</TagsList>
			)}
		</LabelInputDiv>
	);
};

export default OfferTags;
