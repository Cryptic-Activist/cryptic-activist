import { FC } from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { connect } from 'react-redux';

import {
	Container,
	ProfileImage,
	UsernameDate,
	OfferType,
	Username,
	View,
	Date,
	FeedbackType,
	Message,
	OfferTypeMessage,
	MobileDiv,
} from '@styles/components/Lists/Feedbacks/Feedback/Feedback';
import { IFeedback } from '../types';
import Avatar from '@components/Avatar';

const mapStateToProps = ({ app }) => ({ app });

const Feedback: FC<IFeedback> = ({ app }) => (
	<Container>
		{app.isMobile ? (
			<>
				<MobileDiv>
					<Avatar
						width="3rem"
						height="3rem"
						borderRadius="0.3rem"
						isProfilePage={false}
						firstName="Username"
						lastName="New"
					/>
					<UsernameDate>
						<Username href="/vendor/new-username" passHref>
							username-new
						</Username>
						<Date>Jan 4, 2021</Date>
						<FeedbackType>
							<FaHeart />
							<span>Positive</span>
						</FeedbackType>
					</UsernameDate>
				</MobileDiv>
				<div>
					<OfferTypeMessage>
						<OfferType>Bank Transfer</OfferType>
						<Message>
							Maecenas ante lorem, blandit sit amet interdum quis, consequat vel ipsum.
							Nullam ut ultricies leo. In at est velit. Etiam vitae ultrices sem, nec
							tristique lorem. Duis mollis imperdiet libero et iaculis.
						</Message>
						<View>View offer</View>
					</OfferTypeMessage>
				</div>
			</>
		) : (
			<>
				<div>
					<Avatar
						width="3rem"
						height="3rem"
						borderRadius="0.3rem"
						isProfilePage={false}
						firstName="Username"
						lastName="New"
					/>
				</div>
				<UsernameDate>
					<Username href="/vendor/new-username" passHref>
						username-new
					</Username>

					<Date>Jan 4, 2021</Date>
					<FeedbackType>
						<FaHeart />
						<span>Positive</span>
					</FeedbackType>
				</UsernameDate>
				<OfferTypeMessage>
					<OfferType>Bank Transfer</OfferType>
					<Message>
						Maecenas ante lorem, blandit sit amet interdum quis, consequat vel ipsum.
						Nullam ut ultricies leo. In at est velit. Etiam vitae ultrices sem, nec
						tristique lorem. Duis mollis imperdiet libero et iaculis.
					</Message>
				</OfferTypeMessage>
				<div>
					<View>View offer</View>
				</div>
			</>
		)}
	</Container>
);

export default connect(mapStateToProps)(Feedback);
