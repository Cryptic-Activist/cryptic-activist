import { NextPage } from 'next';
import { useState } from 'react';

import { Container, Wrapper } from '@styles/pages/Account/Messages';

import { useAppDispatch, useAppSelector } from '@store/hooks';

const AccountMessages: NextPage = () => {
	const dispatch = useAppDispatch();
	const { user, systemMessages } = useAppSelector((state) => state);

	const [selectedMessage, setSelectedMessage] = useState<string>(null);
	const [messageContent, setMessageContent] = useState<string>('');

	// const unselectAllMessages = (): void => {
	// 	const allSelectedMessages = document
	// 		.querySelector('.messages')
	// 		.querySelectorAll('.selected');

	// 	allSelectedMessages.forEach((message) => {
	// 		message.classList.remove('selected');
	// 	});
	// };

	// const handleSelectMessage = (e): void => {
	// 	unselectAllMessages();
	// 	e.currentTarget.parentElement.classList.add('selected');
	// 	setSelectedMessage(e.currentTarget.id);
	// };

	// useEffect(() => {
	// 	if (Object.values(user.data).length > 0) {
	// 		dispatch(getSystemMessages(user.data.id));
	// 	}
	// }, [user]);

	// useEffect(() => {
	// 	const aux = systemMessages.data.filter(
	// 		(message) => selectedMessage === message.id
	// 	)[0];

	// 	if (aux) {
	// 		setMessageContent(`${aux.message} ${aux.updatedAt}`);
	// 	}
	// }, [selectedMessage]);

	return (
		<Wrapper>
			<Container>
				{/* <Heading>Messages</Heading>
				<MessagesContainer>
					<ItemsList className="messages">
						{systemMessages.data?.length > 0 ? (
							<>
								{systemMessages.data.length === 1 ? (
									<ItemsListItem
										className="firstCategory lastCategory"
										key={systemMessages.data[0].id}
									>
										<div />
										<ItemsListItemBtn
											// onClick={(e) => handleSelectCategory(e)}
											id={systemMessages.data[0].id}
										>
											{systemMessages.data[0].trade.trader.first_name}{' '}
											{systemMessages.data[0].trade.trader.last_name}
										</ItemsListItemBtn>
									</ItemsListItem>
								) : (
									<>
										{systemMessages.data.map((message, index) => (
											<>
												{index === 0 && (
													<ItemsListItem className="firstMessage" key={message.id}>
														<div />
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectMessage(e)}
															id={message.id}
														>
															{message.trade.trader.first_name}{' '}
															{message.trade.trader.last_name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
												{index !== 0 && index !== systemMessages.data.length - 1 && (
													<ItemsListItem key={message.id}>
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectMessage(e)}
															id={message.id}
														>
															{message.trade.trader.first_name}{' '}
															{message.trade.trader.last_name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
												{index === systemMessages.data.length - 1 && (
													<ItemsListItem className="lastMessage" key={message.id}>
														<div />
														<ItemsListItemBtn
															onClick={(e) => handleSelectMessage(e)}
															id={message.id}
														>
															{message.trade.trader.first_name}{' '}
															{message.trade.trader.last_name}
														</ItemsListItemBtn>
													</ItemsListItem>
												)}
											</>
										))}
									</>
								)}
							</>
						) : (
							<EmptyP>No Messages</EmptyP>
						)}
					</ItemsList>
					<Sep />
					<div>{messageContent}</div>
				</MessagesContainer> */}
			</Container>
		</Wrapper>
	);
};

export default AccountMessages;
