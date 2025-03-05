import { FC } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

import Avatar from '@components/Avatar';
import {
	ChatHeaderColumn,
	ChatHeaderRow,
	ExtraInfoDiv,
	HeaderVendorName,
	LastSeenDiv,
	NegativeFeedbacks,
	PositiveFeedbacks,
	VendorInfoDiv,
} from '@styles/components/LiveChat/LiveChat';

const Header: FC<{ vendor: any }> = ({ vendor }) => (
	<ChatHeaderColumn>
		<ChatHeaderRow>
			<VendorInfoDiv>
				{vendor?.firstName && vendor?.lastName && (
					<Avatar
						firstName={vendor?.firstName}
						lastName={vendor?.lastName}
						width="4rem"
						height="4rem"
						borderRadius="0.3rem"
						isProfilePage={false}
					/>
				)}
				<HeaderVendorName>{`${vendor?.firstName} ${vendor?.lastName}`}</HeaderVendorName>
			</VendorInfoDiv>
			<ExtraInfoDiv>
				<PositiveFeedbacks>
					<FaHeart />
					<span>3526</span>
				</PositiveFeedbacks>

				<NegativeFeedbacks>
					<FaHeartBroken />
					<span>3</span>
				</NegativeFeedbacks>
			</ExtraInfoDiv>
		</ChatHeaderRow>
		<ChatHeaderRow>
			<LastSeenDiv>
				<div className="away" />
				<p>Last seen 32 minutes ago</p>
			</LastSeenDiv>
		</ChatHeaderRow>
	</ChatHeaderColumn>
);

export default Header;
