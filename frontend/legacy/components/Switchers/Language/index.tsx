import { FC } from "react";
import { FaGlobeAmericas, FaChevronDown } from "react-icons/fa";

import {
	LanguageBtn,
	IconTextDiv,
	BtnText,
} from "@styles/components/Switchers/Language";

const Language: FC = () => (
	<LanguageBtn>
		<IconTextDiv>
			<FaGlobeAmericas />
			<BtnText>English</BtnText>
		</IconTextDiv>
		<FaChevronDown />
	</LanguageBtn>
);

export default Language;
