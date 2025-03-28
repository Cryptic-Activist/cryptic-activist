import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

import LiveChat from '@components/LiveChat/LiveChat';
import useSystemMessage from '@hooks/useSystemMessage';
import useTrade from '@hooks/useTrade';
import useUser from '@hooks/useUser';
import {
	Aside,
	CancelTradeBtn,
	Container,
	FinishTradeBtn,
	LaodingChat,
	Main,
	TradeInstructions,
	TradeInstructionsFinishCancelColumn,
	TradeInstructionsFinishCancelRow,
	TradeInstructionsHeading,
	TradeInstructionsSection,
	TradeInstructionsSections,
	TradeInstructionsSpan,
	TradeInstructionsStatement,
	TradeInstructionsTags,
	Warning,
	Wrapper,
} from '@styles/pages/Trade/Trade';
import { getCurrentPath } from '@utils/browser';
import { toFixed } from '@utils/formatter/number';
import { toUpperCase } from '@utils/string/string';
import { getTradeCryptocurrencyFee } from '@utils/trade';

export type TradeProps = {
	id: string;
};

const Trade: NextPage<TradeProps> = ({ id }) => {
	const { trade } = useTrade(id);
	const { user } = useUser();
	const { sendSystemMessage } = useSystemMessage();

	const router = useRouter();

	const [time, setTime] = useState<number>(
		trade.data?.offer?.tradePricingTimeLimit * 60 || 0
	);

	const [clockDisplay, setClockDisplay] = useState('00:00');
	const [paidSignal, setPaidSignal] = useState(false);

	function sendPaidSignal(): void {
		setPaidSignal(true);
		setTimeout(() => {
			setPaidSignal(false);
		}, 1000);
	}

	// useEffect(() => {
	// 	if (Object.values(user.data).length > 0) {
	// 		// emit(SEND_SYSTEMMESSAGE, {
	// 		// 	userId: trade.vendor.id,
	// 		// 	tradeId: trade.id,
	// 		// 	message: `${user.data.names.firstName} ${user.data.names.lastName} has started a new trade you, worry`,
	// 		// });
	// 	}
	// }, [user]);

	const cancelTrade = async (
		id?: string
	): Promise<{
		status_code: number;
		results: object;
		errors: string[];
	}> => {
		const response = await fetch(
			`${process.env.TRADEAPI}/trade/cancel`,
			{
				method: 'PUT',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({ id }),
			}
		);

		const data = await response.json();
		return data;
	};

	const handleCancelTrade = async (): Promise<void> => {
		if (trade.data?.id) {
			const cancelled: {
				status_code: number;
				results: object;
				errors: string[];
			} = await cancelTrade(trade.data?.id);
			if (cancelled.status_code === 200) {
				router.replace(`/offer/${trade.data.offer.id}`);
			} else if (cancelled.status_code === 400) {
				// dispatch(setWarnings(cancelled.errors[0]));
			} else if (cancelled.status_code === 400) {
				// dispatch(setWarnings('Server error'));
			}
		}
	};

	const updateCountDown = () => {
		const minutes: number = Math.floor(time / 60);
		const seconds: number = time % 60;

		let finalMinute: string = '';
		let finalSeconds: string = '';

		if (minutes.toString().length === 1) {
			finalMinute = `0${minutes}`;
		} else {
			finalMinute = `${minutes}`;
		}

		if (seconds.toString().length === 1) {
			finalSeconds = `0${seconds}`;
		} else {
			finalSeconds = `${seconds}`;
		}

		setClockDisplay(`${finalMinute}:${finalSeconds}`);

		setTime(time - 1);
	};

	const handleCancel = (): void => {
		handleCancelTrade();
	};

	useEffect(() => {
		let timer;

		if (time === 0) {
			setTimeout(() => {
				handleCancel();
			}, 7000);
		}

		if (time >= 0) {
			timer = setInterval(updateCountDown, 1000);
		}

		return () => clearInterval(timer);
	});

	useEffect(() => {
		if (trade && Object.values(user.data).length > 0) {
			sendSystemMessage({
				message: `Trade with ${trade.data?.trader?.firstName} ${trade.data?.trader?.lastName} has started.`,
				url: getCurrentPath(),
				userId: trade.data?.vendor?.id,
			});
		}
	}, [trade]);

	// useEffect(() => {
	// 	dispatch(resetWarnings());
	// }, [dispatch]);

	return (
		<Wrapper>
			<Container>
				{trade.data && (
					<>
						<Aside>
							<TradeInstructions>
								<TradeInstructionsHeading>
									Negociation has started
								</TradeInstructionsHeading>

								<TradeInstructionsSections>
									<TradeInstructionsSection>
										<Warning role="alert">
											If anyone ask you to trade outside of the Cryptic Activist Catalog
											platform does not accept such request.
										</Warning>
									</TradeInstructionsSection>

									<TradeInstructionsSection>
										<TradeInstructionsSpan>
											{trade.data?.offer?.paymentMethodType === 'sell' &&
												`Transfer ${trade.data?.cryptocurrencyAmount} ${
													trade.data?.cryptocurrency.symbol &&
													toUpperCase(trade.data?.cryptocurrency.symbol)
												} to the ${
													trade.data?.cryptocurrency.name
												} wallet as provided in the chat.`}
											{trade.data?.offer?.paymentMethodType === 'buy' &&
												`Make the payment of ${trade.data?.fiatAmount} ${
													trade.data?.fiat?.symbol && toUpperCase(trade.data?.fiat?.symbol)
												} to `}
										</TradeInstructionsSpan>
										<TradeInstructionsStatement>
											Once the vendor confirms that the payment has arived, the vendor will
											allow the{' '}
											<strong>{`${trade.data?.cryptocurrencyAmount} ${
												trade.data?.cryptocurrency?.symbol &&
												toUpperCase(trade.data?.cryptocurrency?.symbol)
											}`}</strong>{' '}
											to go your wallet.
										</TradeInstructionsStatement>

										<TradeInstructionsFinishCancelColumn>
											<TradeInstructionsFinishCancelRow>
												<FinishTradeBtn onClick={sendPaidSignal}>
													<div>
														<strong>Paid</strong>
														<p>Remaining time</p>
														<p>{clockDisplay}</p>
													</div>
													<div className="iconDiv">{/* <FaCheck /> */}</div>
												</FinishTradeBtn>
												<TradeInstructionsStatement>
													After the payment is made do not forget to click on{' '}
													<strong>Paid</strong> within the stipulated negociation time frame.
													If you do not do this, the negociation will end and the{' '}
													{trade.data?.cryptocurrency?.name} trading amount will return to
													the vendor's wallet.
												</TradeInstructionsStatement>
											</TradeInstructionsFinishCancelRow>
											<TradeInstructionsFinishCancelRow>
												<CancelTradeBtn onClick={handleCancelTrade}>Cancel</CancelTradeBtn>
												<TradeInstructionsStatement>
													Click on <strong>Cancel</strong> if you don not want to continue
													negociating with this vendor
												</TradeInstructionsStatement>
											</TradeInstructionsFinishCancelRow>
										</TradeInstructionsFinishCancelColumn>
									</TradeInstructionsSection>

									<TradeInstructionsSection>
										<TradeInstructionsSpan>
											Follow the{' '}
											<strong>{`${trade.data?.vendor?.firstName} ${trade.data?.vendor?.firstName}`}</strong>{' '}
											instructions
										</TradeInstructionsSpan>
										<TradeInstructionsTags>
											{trade.data?.offer?.tradeInstructionsTags.map((tag) => (
												<span key={tag}>{tag}</span>
											))}
										</TradeInstructionsTags>
										<TradeInstructionsStatement>
											{trade.data?.offer?.tradeInstructionsInstructions}
										</TradeInstructionsStatement>
									</TradeInstructionsSection>

									<TradeInstructionsSection>
										<TradeInstructionsSpan>Negociation information</TradeInstructionsSpan>

										<TradeInstructionsStatement>
											An amount of{' '}
											<strong>{`${toFixed(trade?.data.cryptocurrencyAmount, 4)} ${
												trade.data?.cryptocurrency?.symbol &&
												toUpperCase(trade.data?.cryptocurrency?.symbol)
											}`}</strong>{' '}
											was reserved for this negociation, including our{' '}
											<strong>{`${toFixed(
												getTradeCryptocurrencyFee(trade?.data.cryptocurrencyAmount, 10),
												4
											)} ${
												trade.data?.cryptocurrency?.symbol &&
												toUpperCase(trade.data?.cryptocurrency?.symbol)
											}`}</strong>{' '}
											fee.
										</TradeInstructionsStatement>
									</TradeInstructionsSection>
								</TradeInstructionsSections>
							</TradeInstructions>
						</Aside>
						<Main>
							{trade && Object.values(user.data).length > 0 ? (
								<LiveChat
									id={trade.data.id}
									room={trade.data.id}
									vendor={trade.data.vendor}
									paidSignal={paidSignal}
									type={trade.data.trader?.id === user.data.id ? 'trader' : 'vendor'}
								/>
							) : (
								<LaodingChat>
									<FaSpinner />
								</LaodingChat>
							)}
						</Main>
					</>
				)}
			</Container>
		</Wrapper>
	);
};

export const getServerSideProps: GetServerSideProps<any> = async ({
	query,
}) => {
	const { id } = query;

	return {
		props: {
			id,
		},
	};
};

export default Trade;
