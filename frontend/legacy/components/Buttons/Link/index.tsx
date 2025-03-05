import React, { FC, useCallback } from "react";
import Link from "next/link";
import { FaCog, FaPlus } from "react-icons/fa";

import { SettingsBtn } from "@styles/components/Buttons/Link";
import { IButtonLink } from "./types";

const ButtonLink: FC<IButtonLink> = ({ name, href, as }) => {
	const getIcon = useCallback(() => {
		if (name === "cog") return <FaCog />;
		if (name === "plus") return <FaPlus />;
	}, [name]);

	return (
		<Link href={href} as={as} passHref>
			<SettingsBtn>{getIcon()}</SettingsBtn>
		</Link>
	);
};

export default ButtonLink;
