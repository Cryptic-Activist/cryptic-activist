import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
	background: ${({ theme }) => theme.components.list.offers.offer.background};
	border-top: 1px solid
		${({ theme }) => theme.components.list.offers.offer.borderColor};
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.offers.offer.borderColor};
	margin-bottom: 5px;
	display: grid;
	grid-template-columns: 0.8fr 1.2fr 0.7fr 1.1fr;
	grid-gap: 10px;
	padding: 20px 14px;
	min-height: 140px !important;
`;

export const ContainerMobile = styled.div`
	background: ${({ theme }) => theme.components.list.offers.offer.background};
	border-top: 1px solid
		${({ theme }) => theme.components.list.offers.offer.borderColor};
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.offers.offer.borderColor};
	margin-bottom: 5px;
	display: grid;
	grid-template-columns: 1.3fr 0.7fr;
	padding: 20px 14px;
`;

export const DivMobile = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
`;

export const From = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	height: 100%;
`;

export const FromMobile = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

export const WithFor = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	height: 100%;
`;

export const WithForMobile = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

export const Rate = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10px;
	width: 100%;
	height: 100%;
`;

export const RateMobile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10px;
	width: 100%;
	height: 100%;
	justify-content: space-between;
`;

export const PricePercentDivMobile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10px;
`;

export const UsernameLink = styled(Link)`
	color: ${({ theme }) => theme.components.list.offers.offer.username.color};
	cursor: pointer;
	text-decoration: none;
`;

export const HeartsTrades = styled.div`
	display: flex;
	gap: 1rem;
`;

export const Hearts = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
	svg {
		color: ${({ theme }) => theme.components.list.offers.offer.hearts.color};
	}
	p {
		color: ${({ theme }) =>
			theme.components.list.offers.offer.hearts.number.color};
	}
`;

export const Trades = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
	svg {
		color: ${({ theme }) => theme.components.list.offers.offer.trades.color};
	}
	p {
		color: ${({ theme }) =>
			theme.components.list.offers.offer.trades.number.color};
	}
`;

export const Status = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;
	svg {
		font-size: 14px;
		color: ${({ theme }) => theme.components.list.offers.offer.status.away.color};
	}
	p {
		color: ${({ theme }) =>
			theme.components.list.offers.offer.status.statement.color};
	}
`;

export const Type = styled.strong`
	color: ${({ theme }) => theme.components.list.offers.offer.withFor.type.color};
`;

export const Description = styled.p`
	color: ${({ theme }) =>
		theme.components.list.offers.offer.withFor.description.color};
`;

export const Tags = styled.div`
	display: flex;
	flex-direction: row;
	gap: 7px;
	span {
		background: ${({ theme }) =>
			theme.components.list.offers.offer.withFor.tag.background};
		border-radius: 4px;
		font-size: 14px;
		color: ${({ theme }) => theme.components.list.offers.offer.withFor.tag.color};
		padding: 4px 6px;
	}
	@media (max-width: 670px) {
		flex-wrap: nowrap;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
		span {
			flex: 0 0 auto;
		}
	}
`;

export const AvgSpeed = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	p {
		color: ${({ theme }) => theme.components.list.offers.offer.avgSpeed.color};
		text-align: right;
	}
`;

export const CryptoPrice = styled.strong`
	font-size: 16px;
	color: ${({ theme }) =>
		theme.components.list.offers.offer.rate.cryptoPrice.color};
	text-align: right;
`;

export const Percent = styled.div`
	display: flex;
	flex-direction: row;
	gap: 3px;
	#up {
		font-size: 1rem;
		color: ${({ theme }) =>
			theme.components.list.offers.offer.rate.cryptoPrice.color};
	}
	p {
		font-size: 16px;
		font-weight: 900;
		color: ${({ theme }) =>
			theme.components.list.offers.offer.rate.cryptoPrice.color};
	}
`;

export const InfoIcon = styled.button`
	width: 20px;
	height: 20px;
	background: transparent;
	border: 2px solid
		${({ theme }) => theme.components.list.offers.offer.rate.percent.info.color};
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 5px;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	svg {
		font-size: 10px;
		color: ${({ theme }) =>
			theme.components.list.offers.offer.rate.percent.info.color};
	}
`;

export const LimitButtonDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	margin-top: 5px;
	height: 100%;
`;

export const Limit = styled.p`
	color: ${({ theme }) => theme.components.list.offers.offer.rate.limit.color};
	font-size: 16px;
	@media (max-width: 670px) {
		font-size: 14px;
	}
`;

export const LinkTo = styled(Link)`
	background: ${({ theme }) =>
		theme.components.list.offers.offer.rate.button.background};
	border: 1px solid
		${({ theme }) => theme.components.list.offers.offer.rate.button.borderColor};
	border-radius: 4px;
	color: ${({ theme }) => theme.components.list.offers.offer.rate.button.color};
	padding: 6px 10px;
	font-size: 16px;
	cursor: pointer;
	text-decoration: none;
	&:focus {
		outline: none;
	}
`;

export const LinkToMobile = styled(Link)`
	background: ${({ theme }) =>
		theme.components.list.offers.offer.rate.button.background};
	border: 1px solid
		${({ theme }) => theme.components.list.offers.offer.rate.button.borderColor};
	border-radius: 4px;
	color: ${({ theme }) => theme.components.list.offers.offer.rate.button.color};
	padding: 6px 10px;
	justify-self: flex-end;
	font-size: 16px;
	cursor: pointer;
	text-decoration: none;
	&:focus {
		outline: none;
	}
`;
