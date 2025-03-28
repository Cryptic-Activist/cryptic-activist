import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ILiveChat } from 'types/components/LiveChat/LiveChat';
import { emit, on } from 'utils/socketio';

import { Container } from '@styles/components/LiveChat/LiveChat';

import Header from './Header';
import Input from './Input';
import MessagesBody from './MessagesBody';

const ENDPOINT = process.env.CHAT_API;

const mapStateTopProps = ({ user }) => ({ user });

const LiveChat: FC<ILiveChat> = ({
	user,
	vendor,
	id,
	room,
	paidSignal,
	type,
}) => {
	const [scrollTop, setScrollTop] = useState<number>(0);

	const [tradeId, setTradeId] = useState<string>(id);
	const [tradeRoom, setTradeRoom] = useState<string>(room);

	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<
		{
			user: { names: { firstName: string; lastName: string } };
			message: string;
		}[]
	>([]);

	useEffect(() => {
		if (paidSignal) {
			// emit("traderPaidSignal", {
			// 	trader: {
			// 		id: user.data.id,
			// 		names: {
			// 			firstName: user.data.firstName,
			// 			lastName: user.data.lastName,
			// 		},
			// 	},
			// });
		}
	}, [
		paidSignal,
		user.data?.id,
		user.data?.names.firstName,
		user.data?.names.lastName,
	]);

	useEffect(() => {
		emit('join', {
			room,
			trader: {
				names: {
					firstName: user.data.names.firstName,
					lastName: user.data.names.lastName,
				},
			},
			vendor: {
				names: {
					firstName: vendor?.firstName,
					lastName: vendor?.lastName,
				},
			},
		});
		// emit("joinTrader", {
		// 	trader: {
		// 		id: user.data.id,
		// 		names: {
		// 			firstName: user.data.firstName,
		// 			lastName: user.data.lastName,
		// 		},
		// 	},
		// 	vendor: {
		// 		id: vendor.id,
		// 		names: {
		// 			firstName: vendor.firstName,
		// 			lastName: vendor.lastName,
		// 		},
		// 	},
		// 	roomId: tradeRoom,
		// });
	}, [
		tradeId,
		tradeRoom,
		user.data?.id,
		user.data?.names.firstName,
		user.data?.names.lastName,
		vendor?.id,
		vendor?.firstName,
		vendor?.lastName,
	]);

	on('adminMessage', (payload) => {
		setMessages([...messages, payload]);
	});

	useEffect(
		() => () => {
			// emit("end", {
			// 	user: {
			// 		names: {
			// 			firstName: user.data.firstName,
			// 		},
			// 	},
			// });
		},
		[]
	);

	useEffect(() => {
		document.querySelector('.messagesBody').scroll({
			left: 0,
			top: 1000 + scrollTop,
			behavior: 'smooth',
		});
	}, [scrollTop]);

	function scrollMessagesBody(): void {
		setScrollTop((oldScrollTop) => oldScrollTop + 1000);
	}

	function changeInput(e): void {
		setMessage(e.target.value);
	}

	function handleSendMessage(e: KeyboardEvent<HTMLTextAreaElement>): void {
		e.preventDefault();

		if (e.key === 'Enter' && e.shiftKey) {
			const newBreakLineMessage = `${message.substring(
				0,
				e.currentTarget.selectionStart
			)}\n${message.substring(e.currentTarget.selectionStart, message.length)}`;

			setMessage(newBreakLineMessage);
		}
		if (e.key === 'Enter' && !e.shiftKey) {
			if (message) {
				setMessages([
					...messages,
					{
						user: {
							names: {
								firstName: user.data.names.firstName,
								lastName: user.data.names.lastName,
							},
						},
						message,
					},
				]);

				// emit("sendMessage", messages);
				setMessage('');
				scrollMessagesBody();
			}
		}
	}

	return (
		<Container>
			<Header vendor={vendor} />
			<MessagesBody messages={messages} />
			<Input
				handleSendMessage={handleSendMessage}
				changeInput={changeInput}
				message={message}
			/>
		</Container>
	);
};

export default connect(mapStateTopProps)(LiveChat);
