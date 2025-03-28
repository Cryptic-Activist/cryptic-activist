import { FC } from "react";
import { FaInfo } from "react-icons/fa";

import { InfoIcon, Message } from "@styles/components/Buttons/Info";

import { IInfo } from "./types";

const Info: FC<IInfo> = ({ message }) => {
	return (
		<InfoIcon type="button">
			<FaInfo />
			<Message id="messageContainer">
				<p id="message">{message}</p>
			</Message>
		</InfoIcon>
	);
};

export default Info;
