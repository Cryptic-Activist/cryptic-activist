import { FC } from 'react';

import { AvatarProps } from './types';

import { Initials, ProfileAvatar } from '@styles/components/Avatar';
import { getInitials } from '@utils/string/string';

const Avatar: FC<AvatarProps> = ({
	borderRadius,
	height,
	firstName,
	lastName,
	width,
	isProfilePage,
	profileColor,
}) => (
	<ProfileAvatar
		width={width}
		height={height}
		borderRadius={borderRadius}
		isProfilePage={isProfilePage}
		profileColor={profileColor}
	>
		<Initials isProfilePage={isProfilePage}>
			{getInitials(firstName, lastName)}
		</Initials>
	</ProfileAvatar>
);

export default Avatar;
