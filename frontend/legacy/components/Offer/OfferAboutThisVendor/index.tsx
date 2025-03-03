import Avatar from '@components/Avatar';
import {
	AboutContainer,
	AboutDiv,
	AboutHeading,
	FeedbackDiv,
	FeedbackRow,
	FeedbacksDiv,
	FeedbackSpan,
	VendorLastSeen,
	VendorName,
	VendorNameLastSeenDiv,
	VendorProfile,
} from '@styles/pages/Offer/Id';
import { FC, useState } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { OfferAboutThisVendorProps } from './types';

const OfferAboutThisVendor: FC<OfferAboutThisVendorProps> = ({ offer }) => {
	const [positiveFeedbackCount, setPositiveFeedbackCount] = useState<number>(0);
	const [negativeFeedbackCount, setNegativeFeedbackCount] = useState<number>(0);

	return (
		<AboutDiv>
			<AboutContainer>
				<AboutHeading>About this vendor</AboutHeading>
				<VendorProfile>
					<Avatar
						firstName={offer.vendor.firstName}
						lastName={offer.vendor.lastName}
						width="4rem"
						height="4rem"
						borderRadius="0.3rem"
						isProfilePage={false}
					/>
					<VendorNameLastSeenDiv>
						<VendorName>{`${offer.vendor.firstName} ${offer.vendor.lastName}`}</VendorName>
						<VendorLastSeen>Last seen 34 minutes ago</VendorLastSeen>
					</VendorNameLastSeenDiv>
				</VendorProfile>

				<FeedbacksDiv>
					<FeedbackDiv>
						<FeedbackSpan>Positive feedback</FeedbackSpan>
						<FeedbackRow>
							<FaHeart className="positive" />
							<strong>{positiveFeedbackCount}</strong>
						</FeedbackRow>
					</FeedbackDiv>
					<FeedbackDiv>
						<FeedbackSpan>Negative feedback</FeedbackSpan>
						<FeedbackRow>
							<FaHeartBroken className="negative" />
							<strong>{negativeFeedbackCount}</strong>
						</FeedbackRow>
					</FeedbackDiv>
				</FeedbacksDiv>
			</AboutContainer>
		</AboutDiv>
	);
};

export default OfferAboutThisVendor;
