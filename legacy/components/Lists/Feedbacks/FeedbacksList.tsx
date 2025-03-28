import { FC, useState } from 'react';
import { FaSortDown } from 'react-icons/fa';

import {
	AllPositiveNegative,
	AllPositiveNegativeDiv,
	Container,
	Header,
	HeaderBtnDiv,
	HeaderTitle,
	HeaderTitleLeft,
	List,
	MobileOpenFeedbacksBtn,
} from '@styles/components/Lists/Feedbacks/FeedbacksList';
import Feedback from './Feedback/Feedback';
import FeedbackTypeList from './FeedbackTypeList/FeedbackTypeList';
import { FeedbackType, IFeedbacksList, SelectTypeParams } from './types';

import { useAppDispatch, useAppSelector } from '@store/index';
import { setType } from '@store/reducers/app';

const FeedbacksList: FC<IFeedbacksList> = ({
	feedbacksCount,
	negativeFeedbacks,
	positiveFeedbacks,
	positiveFeedbackCount,
	negativeFeedbackCount,
}) => {
	const dispatch = useAppDispatch();
	const { app } = useAppSelector((state) => state);
	const feedbacks = {
		positive: positiveFeedbacks,
		negative: negativeFeedbacks,
	};

	const [toggleType, setToggleType] = useState<boolean>(false);
	const [feedbackType, setFeedbackType] = useState<FeedbackType>('positive');

	const selectType = (type: SelectTypeParams) => {
		dispatch(setType(type));
	};

	function handleToggleType(): void {
		setToggleType(!toggleType);
	}

	const handleToggleFeedbackType = (type: FeedbackType) => {
		setFeedbackType(type);
	};

	return (
		<Container>
			<Header>
				<HeaderBtnDiv>
					<HeaderTitleLeft
						className={app.type === 'buy' && 'selected'}
						onClick={() => selectType('buy')}
					>
						From Buyers
					</HeaderTitleLeft>
					<HeaderTitle
						className={app.type === 'sell' && 'selected'}
						onClick={() => selectType('sell')}
					>
						From Sellers
					</HeaderTitle>
				</HeaderBtnDiv>
				<AllPositiveNegativeDiv>
					{app.isMobile ? (
						<MobileOpenFeedbacksBtn onClick={() => handleToggleType()}>
							<FaSortDown />
							{toggleType && <FeedbackTypeList />}
						</MobileOpenFeedbacksBtn>
					) : (
						<>
							<AllPositiveNegative
								onClick={() => handleToggleFeedbackType('positive')}
							>
								Positive ({positiveFeedbackCount})
							</AllPositiveNegative>
							<AllPositiveNegative
								onClick={() => handleToggleFeedbackType('negative')}
							>
								Negative ({negativeFeedbackCount})
							</AllPositiveNegative>
						</>
					)}
				</AllPositiveNegativeDiv>
			</Header>
			<List>
				{feedbacks.positive?.map((feedback) => (
					<Feedback key={feedback.message} />
				))}
			</List>
		</Container>
	);
};

export default FeedbacksList;
