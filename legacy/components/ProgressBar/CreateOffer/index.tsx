import { FC } from 'react';
import { connect } from 'react-redux';

import { IProgressBarCreateOffer } from 'types/components/ProgressBar';

import {
	Container,
	SelectionActive,
	SelectionDeactivate,
	StepDiv,
	StepActive,
	StepDeactivate,
	Sep,
} from '@styles/components/ProgressBar/CreateOffer/CreateOffer';
import { useAppSelector } from '@store/index';

const CreateOfferProgressBar: FC<IProgressBarCreateOffer> = () => {
	const { createOffer } = useAppSelector((state) => state);
	const { section } = createOffer.data;

	return (
		<Container>
			{section.paymentMethod ? (
				<StepDiv>
					<SelectionActive>
						<div />
					</SelectionActive>
					<StepActive>Payment Method</StepActive>
				</StepDiv>
			) : (
				<StepDiv>
					<SelectionDeactivate>
						<div />
					</SelectionDeactivate>
					<StepDeactivate>Payment Method</StepDeactivate>
				</StepDiv>
			)}
			<Sep />
			{section.tradePricing ? (
				<StepDiv>
					<SelectionActive>
						<div />
					</SelectionActive>
					<StepActive>Trade Pricing</StepActive>
				</StepDiv>
			) : (
				<StepDiv>
					<SelectionDeactivate>
						<div />
					</SelectionDeactivate>
					<StepDeactivate>Trade Pricing</StepDeactivate>
				</StepDiv>
			)}
			<Sep />
			{section.tradeInstructions ? (
				<StepDiv>
					<SelectionActive>
						<div />
					</SelectionActive>
					<StepActive>Trade Instructions</StepActive>
				</StepDiv>
			) : (
				<StepDiv>
					<SelectionDeactivate>
						<div />
					</SelectionDeactivate>
					<StepDeactivate>Trade Instructions</StepDeactivate>
				</StepDiv>
			)}
		</Container>
	);
};

export default CreateOfferProgressBar;
