import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	background: ${({ theme }) => theme.components.liveChat.background};
	border: 1px solid ${({ theme }) => theme.components.liveChat.borderColor};
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	border-radius: 4px;
	overflow: hidden;
`;

export const ChatHeaderColumn = styled.div`
	width: 100%;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 14px;
	border-bottom: 1px solid
		${({ theme }) => theme.components.liveChat.header.borderColor};
	background: ${({ theme }) => theme.components.liveChat.header.background};
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const ChatHeaderRow = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const VendorInfoDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	justify-content: space-between;
	align-items: center;
`;

export const HeaderVendorName = styled.strong`
	font-size: 16px;
	color: ${({ theme }) => theme.components.liveChat.header.vendor.name.color};
`;

export const ExtraInfoDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 15px;
	justify-content: space-between;
	align-items: center;
`;

export const PositiveFeedbacks = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
	svg {
		font-size: 14px;
		color: ${({ theme }) =>
			theme.components.liveChat.header.feedbacks.positive.color};
	}
	span {
		font-size: 13px;
		color: ${({ theme }) => theme.components.liveChat.header.feedbacks.color};
	}
`;

export const NegativeFeedbacks = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
	svg {
		font-size: 14px;
		color: ${({ theme }) =>
			theme.components.liveChat.header.feedbacks.negative.color};
	}
	span {
		font-size: 13px;
		color: ${({ theme }) => theme.components.liveChat.header.feedbacks.color};
	}
`;

export const LastSeenDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 7px;
	div {
		height: 10px;
		width: 10px;
		border-radius: 50px;
		display: block;
		background: ${({ theme }) =>
			theme.components.liveChat.header.lastSeen.icon.online.background};
	}
	.online {
		background: ${({ theme }) =>
			theme.components.liveChat.header.lastSeen.icon.online.background};
	}
	.away {
		background: ${({ theme }) =>
			theme.components.liveChat.header.lastSeen.icon.away.background};
	}
	.busy {
		background: ${({ theme }) =>
			theme.components.liveChat.header.lastSeen.icon.busy.background};
	}
	p {
		font-size: 13px;
		color: ${({ theme }) =>
			theme.components.liveChat.header.lastSeen.statement.color};
	}
`;

export const ChatMessagesBody = styled.div`
	width: 100%;
	height: 70vh;
	background: ${({ theme }) => theme.components.liveChat.body.background};
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px 0;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const AuthorMessageDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3px;
	padding: 0 10px;
`;

export const MessageAuthorNameSender = styled.span`
	font-size: 13px;
	text-align: right;
	color: ${({ theme }) => theme.components.liveChat.body.message.color};
`;

export const MessageAuthorNameReceiver = styled.span`
	font-size: 13px;
	text-align: left;
	color: ${({ theme }) => theme.components.liveChat.body.message.color};
`;

export const SenderMessage = styled.div`
	background: ${({ theme }) =>
		theme.components.liveChat.body.message.sender.background};
	color: ${({ theme }) => theme.components.liveChat.body.message.sender.color};
	padding: 7px 12px;
	border-radius: 4px;
	text-align: left;
	width: fit-content;
	max-width: 95%;
	align-self: flex-end;
	span {
		font-size: 16px;
		word-break: break-all;
		white-space: break-spaces;
	}
`;

export const ReceiverMessage = styled.div`
	background: ${({ theme }) =>
		theme.components.liveChat.body.message.receiver.background};
	color: ${({ theme }) => theme.components.liveChat.body.message.receiver.color};
	padding: 7px 12px;
	border-radius: 4px;
	text-align: left;
	width: fit-content;
	align-self: flex-start;
	span {
		font-size: 16px;
		word-break: break-all;
		white-space: break-spaces;
	}
`;

export const InputDivColumn = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	background: ${({ theme }) =>
		theme.components.liveChat.inputButtons.background};
	border-top: 1px solid
		${({ theme }) => theme.components.liveChat.inputButtons.borderColor};
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
`;

export const InputDivRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const InputField = styled.textarea`
	width: 100%;
	height: 120px;
	resize: none;
	border: none;
	padding: 14px;
	font-size: 16px;
	background: ${({ theme }) =>
		theme.components.liveChat.inputButtons.input.background};
	color: ${({ theme }) => theme.components.liveChat.inputButtons.input.color};
	&:focus {
		outline: none;
	}
`;

export const AttachBtn = styled.button`
	background: ${({ theme }) =>
		theme.components.liveChat.inputButtons.attachButton.background};
	color: ${({ theme }) =>
		theme.components.liveChat.inputButtons.attachButton.color};
	border: none;
	font-size: 18px;
	border-radius: 4px;
	padding: 7px 10px;
	cursor: pointer;
	svg {
		transform: translateY(2px);
	}
`;

export const SendBtn = styled.button`
	background: ${({ theme }) =>
		theme.components.liveChat.inputButtons.sendMessageButton.background};
	color: ${({ theme }) =>
		theme.components.liveChat.inputButtons.sendMessageButton.color};
	border: none;
	font-size: 18px;
	border-radius: 4px;
	padding: 7px 10px;
	cursor: pointer;
	svg {
		transform: translateY(2px);
	}
`;
