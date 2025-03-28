import { FC, useEffect, useState } from 'react';

import {
	ProfileInfoContainer,
	ProfileInfoHeader,
	ProfileInfoList,
	ProfileInfoListItem,
} from '@styles/components/ProfileInfo';

import { useAppSelector } from '@store/index';
import { checkRequest } from '@utils/checkers';
import DateFormatter from '@utils/formatter/date/DateFormatter';

const ProfileInfo: FC = () => {
	const { user } = useAppSelector((state) => state);
	const [blockedByCount, setBlockedByCount] = useState<number>(0);
	const [hasBlockedCount, setHasBlockedCount] = useState<number>(0);

	const [trustedBy, setTrustedBy] = useState<number>(0);

	const dateFormatter = new DateFormatter();

	async function countBlocks(
		type: 'blocked' | 'blocker',
		userId: string
	): Promise<void> {
		const res = await fetch(
			`${process.env.USER_API}/blocks/${type}?userId=${userId}`,
			{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const data = await res.json();

		if (data.status_code === 200) {
			if (type === 'blocked') {
				setBlockedByCount(data.results);
			} else if (type === 'blocker') {
				setHasBlockedCount(data.results);
			}
		}
	}

	async function countTrusts(userId: string): Promise<void> {
		const res = await fetch(
			`${process.env.USER_API}/trusts?userId=${userId}`,
			{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const data = await res.json();

		if (data.status_code === 200) {
			setTrustedBy(data.results);
		}
	}

	useEffect(() => {
		if (checkRequest(user)) {
			countTrusts(user.data.id);
			countBlocks('blocker', user.data.id);
			countBlocks('blocked', user.data.id);
		}
	}, [user]);

	return (
		<ProfileInfoContainer>
			<ProfileInfoHeader>
				<h3>Information</h3>
			</ProfileInfoHeader>
			<ProfileInfoList>
				<ProfileInfoListItem>
					<p>Languages:</p>
					<div className="languages">
						<>
							{user.data.languages.length > 1 ? (
								<>
									{user.data.languages.map((language, index) => (
										<>
											{index === user.data.languages.length - 1 ? (
												<strong>{language.name}</strong>
											) : (
												<strong>{`${language.name}, `}</strong>
											)}
										</>
									))}
								</>
							) : (
								<>
									<strong>{user.data.languages[0]?.name || 'No data'}</strong>
								</>
							)}
						</>
					</div>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						<strong>547</strong> Trades
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Trusted by <strong>{trustedBy} people</strong>
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Blocked by <strong>{blockedByCount} people</strong>
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Has blocked <strong>{hasBlockedCount} people</strong>
					</p>
				</ProfileInfoListItem>
				<ProfileInfoListItem>
					<p>
						Joined on{' '}
						<strong>{dateFormatter.formatDateFullDate(user.data.createdAt)}</strong>
					</p>
				</ProfileInfoListItem>
			</ProfileInfoList>
		</ProfileInfoContainer>
	);
};

export default ProfileInfo;
