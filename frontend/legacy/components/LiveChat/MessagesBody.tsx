import { FC, Fragment } from 'react';
import { connect } from 'react-redux';

import { IBodyMessage } from 'types/components/LiveChat/LiveChat';

import {
	AuthorMessageDiv,
	ChatMessagesBody,
	MessageAuthorNameReceiver,
	MessageAuthorNameSender,
	ReceiverMessage,
	SenderMessage,
} from '@styles/components/LiveChat/LiveChat';

const mapStateToProps = ({ user }) => ({ user });

const MessagesBody: FC<IBodyMessage> = ({ messages, user }) => {
	return (
		<ChatMessagesBody className="messagesBody">
			{messages.map((message) => (
				<Fragment key={message.message}>
					{`${message.user.names.firstName} ${message.user.names.lastName}` ===
					`${user.data.names.firstName} ${user.data.names.lastName}` ? (
						<AuthorMessageDiv>
							<MessageAuthorNameSender>
								{`${message.user.names.firstName} ${message.user.names.lastName}`}
							</MessageAuthorNameSender>
							<SenderMessage>
								<span>{message.message}</span>
							</SenderMessage>
						</AuthorMessageDiv>
					) : (
						<AuthorMessageDiv>
							<MessageAuthorNameReceiver>
								{`${message.user.names.firstName} ${message.user.names.lastName}`}
							</MessageAuthorNameReceiver>
							<ReceiverMessage>
								<span>{message.message}</span>
							</ReceiverMessage>
						</AuthorMessageDiv>
					)}
				</Fragment>
			))}
		</ChatMessagesBody>
	);
};

export default connect(mapStateToProps)(MessagesBody);
