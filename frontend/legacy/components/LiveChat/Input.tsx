import { FC } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';

import { IInput } from 'types/components/LiveChat/LiveChat';

import {
	InputDivColumn,
	InputDivRow,
	InputField,
	AttachBtn,
	SendBtn,
	// SenderMessage,
} from '@styles/components/LiveChat/LiveChat';

const Input: FC<IInput> = ({ handleSendMessage, changeInput, message }) => (
	<InputDivColumn>
		<InputField
			onChange={(event) => changeInput(event)}
			onKeyPress={(event) =>
				event.key === 'Enter' ? handleSendMessage(event) : false
			}
			value={message}
			rows={20}
		/>
		<InputDivRow>
			<AttachBtn>
				<FaPaperclip />
			</AttachBtn>
			<SendBtn>
				<FaPaperPlane />
			</SendBtn>
		</InputDivRow>
	</InputDivColumn>
);

export default Input;
