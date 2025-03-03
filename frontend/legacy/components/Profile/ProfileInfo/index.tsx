import { FC } from 'react';

import {
	ProfileInfo,
	ProfileInfoHeader,
	ProfileInfoList,
	ProfileInfoListItem,
} from '@styles/pages/Vendor/Vendor';
import DateFormatter from '@utils/formatter/date/DateFormatter';

import { ProfileInfoProps } from './types';

const Info: FC<ProfileInfoProps> = ({ vendor }) => {
	const dateFormatter = new DateFormatter();

	return (
		<ProfileInfo>
			<ProfileInfoHeader>
				<h3>Information</h3>
			</ProfileInfoHeader>
			<ProfileInfoList>
				<ProfileInfoListItem>
					<p>Languages:</p>
					<div className="languages">
						{vendor.data?.languages.map((language) => (
							<strong key={language.id}>{language.name}</strong>
						))}
					</div>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						<strong>{vendor.data?.tradesCount}</strong> Trades
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Trusted by <strong>{vendor.data?.trusted.length} people</strong>
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Blocked by <strong>{vendor.data?.blockers.length} people</strong>
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Has blocked <strong>{vendor.data?.blocked.length} people</strong>
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Joined on{' '}
						<strong>
							{dateFormatter.formatDateFullDate(vendor.data?.createdAt)}
						</strong>
					</p>
				</ProfileInfoListItem>
			</ProfileInfoList>
		</ProfileInfo>
	);
};

export default Info;
