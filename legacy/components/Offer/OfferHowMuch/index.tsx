import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';

import MinusPlusInput from '@components/MinusPlusInput/MinusPlusInput';
import useChat from '@hooks/useChat';
import useCryptocurrency from '@hooks/useCryptocurrency';
import useTrade from '@hooks/useTrade';
import useUser from '@hooks/useUser';
import { useAppDispatch } from '@store/index';
import { toggleModal } from '@store/reducers/navigationBar';
import {
	HowMuchWantTrade,
	HowMuchWantTradeHeading,
	HowMuchWantTradeInputDiv,
	HowMuchWantTradeInputLabel,
	HowMuchWantTradeInputRow,
	HowMuchWantTradeInputStatement,
	Symbol,
	TradeBtn,
	WillReceive,
} from '@styles/pages/Offer/Id';
import { isLoggedIn } from '@utils/checkers';
import { toUpperCase } from '@utils/string/string';

import { OfferHowMuch } from './types';

const defaultFiatAmount = 10;

const OfferHowMuch: FC<OfferHowMuch> = ({ offer }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { user } = useUser();
	const { trade, startTrade } = useTrade();
	const { chat, createChat } = useChat();
	const { currentPrice } = useCryptocurrency();

	const [fiatAmount, setFiatAmount] = useState(
		offer?.tradePricingTradeLimitsMin
	);
	const [willReceiveFiat, setWillReceiveFiat] = useState(defaultFiatAmount);
	const [cryptocurrencyAmount, setCryptocurrencyAmount] = useState(null);

	const isTradeAvailability =
		isLoggedIn(user) &&
		cryptocurrencyAmount !== Infinity &&
		cryptocurrencyAmount !== null;

	const calculateCryptocurrencyAmount = () => {
		const amount = fiatAmount / currentPrice;
		setCryptocurrencyAmount(amount);
	};

	const handleFiatAmount = useCallback((amount: number): void => {
		setFiatAmount(amount);
	}, []);

	const handleStartTrade = async () => {
		if (isTradeAvailability) {
			await startTrade({
				cryptocurrencyAmount: cryptocurrencyAmount,
				cryptocurrencyId: offer.cryptocurrency.id,
				fiatAmount: fiatAmount,
				fiatId: offer.fiat.id,
				traderId: user.data.id,
				offerId: offer.id,
				vendorId: offer.vendor.id,
			});
		} else {
			dispatch(toggleModal({ modal: 'login' }));
		}
	};

	useEffect(() => {
		if (trade.data) {
			createChat({ tradeId: trade.data.id });
		}
	}, [trade.data]);

	useEffect(() => {
		if (chat.data) {
			router.push({
				pathname: `/trade/${trade.data.id}`,
			});
		}
	}, [chat.data]);

	useEffect(() => {
		calculateCryptocurrencyAmount();
	}, [currentPrice]);

	return (
		<HowMuchWantTrade>
			<HowMuchWantTradeHeading>
				How much do you want to buy
			</HowMuchWantTradeHeading>
			<HowMuchWantTradeInputRow>
				<HowMuchWantTradeInputDiv>
					<HowMuchWantTradeInputLabel>Will pay</HowMuchWantTradeInputLabel>
					<MinusPlusInput
						min={offer.tradePricingTradeLimitsMin}
						max={offer.tradePricingTradeLimitsMax}
						step={10}
						changeNumber={handleFiatAmount}
						initialValue={fiatAmount}
						buttons
						disableInput
						width="100%"
						fitContent={false}
						symbol={offer.fiat.symbol}
					/>
					<HowMuchWantTradeInputStatement>
						You will receive{' '}
						<strong>{`${willReceiveFiat} ${offer.fiat.symbol}`}</strong> in{' '}
						<strong>{offer.cryptocurrency.name}</strong>
					</HowMuchWantTradeInputStatement>
				</HowMuchWantTradeInputDiv>
				<HowMuchWantTradeInputDiv>
					<HowMuchWantTradeInputLabel>Will receive</HowMuchWantTradeInputLabel>
					<WillReceive>
						<p>
							{cryptocurrencyAmount &&
								cryptocurrencyAmount !== Infinity &&
								cryptocurrencyAmount.toFixed(8)}
						</p>
						<Symbol>{toUpperCase(offer.cryptocurrency.symbol)}</Symbol>
					</WillReceive>
				</HowMuchWantTradeInputDiv>
			</HowMuchWantTradeInputRow>
			<TradeBtn onClick={handleStartTrade} isCompleted={isTradeAvailability}>
				Trade now
			</TradeBtn>
		</HowMuchWantTrade>
	);
};

export default OfferHowMuch;
