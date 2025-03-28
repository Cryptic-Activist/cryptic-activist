import { FC } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { ITheme } from 'types/components/Switchers/Theme/Theme';

import { IconTextDiv, SwitcherBtn } from '@styles/components/Switchers/Theme';

const Theme: FC<ITheme> = ({ theme, toggleTheme }) => (
	<SwitcherBtn onClick={() => toggleTheme()}>
		<IconTextDiv>{theme === 'light' ? <FaMoon /> : <FaSun />}</IconTextDiv>
	</SwitcherBtn>
);

export default Theme;
