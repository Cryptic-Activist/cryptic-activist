// Add more packs as needed
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

import { DynamicIconProps, IconPacks } from './types';

import { FC } from 'react';

const iconPacks: IconPacks = {
  Fa: FaIcons,
  Md: MdIcons,
  Ai: AiIcons,
  Io: IoIcons,
  Bi: BiIcons,
};

const DynamicIcon: FC<DynamicIconProps> = ({
  iconName,
  size = 24,
  color = 'black',
  className,
}) => {
  const prefix = iconName.slice(0, 2);
  const icons = iconPacks[prefix];
  const IconComponent = icons?.[iconName];

  if (!IconComponent) return <span>Icon not found: {iconName}</span>;

  return <IconComponent size={size} color={color} className={className} />;
};

export default DynamicIcon;
