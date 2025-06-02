// Add more packs as needed
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa6';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as RxIcons from 'react-icons/rx';

import { DynamicIconProps, IconPacks } from './types';

import { FC } from 'react';

const iconPacks: IconPacks = {
	Fa: FaIcons,
	Md: MdIcons,
	Ai: AiIcons,
	Io: IoIcons,
	Bi: BiIcons,
	Rx: RxIcons
};

const DynamicIcon: FC<DynamicIconProps> = ({
	iconName,
	size = 24,
	color = 'black',
	className
}) => {
	const prefix = iconName.slice(0, 2);
	const icons = iconPacks[prefix];
	const IconComponent = icons?.[iconName];

	if (!IconComponent) return <span>Icon not found: {iconName}</span>;

	return <IconComponent size={size} color={color} className={className} />;
};

export default DynamicIcon;
