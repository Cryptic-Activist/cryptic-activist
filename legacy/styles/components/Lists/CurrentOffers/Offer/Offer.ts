import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
	background: ${({ theme }) =>
		theme.components.list.currentOffers.list.offer.background};
	border-top: 1px solid
		${({ theme }) => theme.components.list.currentOffers.list.offer.borderColor};
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.currentOffers.list.offer.borderColor};
	color: ${({ theme }) => theme.components.list.currentOffers.list.offer.color};
	margin-bottom: 5px;
	display: flex;
	flex-direction: row;
	gap: 10px;
	justify-content: space-between;
	padding: 20px 14px;
`;

export const LeftDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: 370px) {
		gap: 27px;
	}
`;

export const TypeDescDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const TypeName = styled.h3`
	font-size: 16px;
`;

export const Description = styled.p`
	font-size: 16px;
`;

export const PeopleChosen = styled.p`
	font-size: 16px;
	span {
		font-size: 17px;
		font-weight: 900;
	}
`;

export const RightDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 15px;
`;

export const Price = styled.strong`
	font-size: 16px;
	text-align: right;
	@media (max-width: 370px) {
		text-align: left;
	}
`;

export const Speed = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4px;
	justify-content: flex-end;
	p {
		font-size: 16px;
	}
	span {
		font-size: 16px;
		font-weight: 900;
	}
	@media (max-width: 370px) {
		justify-content: flex-start;
	}
`;

export const Percent = styled.div`
	display: flex;
	flex-direction: row;
	gap: 3px;
	justify-content: flex-end;
	svg {
		font-size: 16px;
		color: ${({ theme }) =>
			theme.components.list.currentOffers.list.offer.percent.info.color};
	}
	p {
		font-size: 16px;
		font-weight: 900;
		color: ${({ theme }) =>
			theme.components.list.currentOffers.list.offer.percent.color};
	}
	@media (max-width: 370px) {
		justify-content: flex-start;
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

export const PricePercentDivMobile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10px;
`;

export const LimitsBunttonDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 15px;
	align-items: center;
`;

export const Limits = styled.p`
	font-size: 16px;
	text-align: right;
	@media (max-width: 370px) {
		text-align: left;
	}
`;

export const LinkTo = styled(Link)`
	background: ${({ theme }) =>
		theme.components.list.currentOffers.list.offer.button.background};
	border: 1px solid
		${({ theme }) =>
			theme.components.list.currentOffers.list.offer.button.borderColor};
	border-radius: 4px;
	color: ${({ theme }) =>
		theme.components.list.currentOffers.list.offer.button.color};
	padding: 6px 10px;
	font-size: 16px;
	width: fit-content;
	align-self: flex-end;
	cursor: pointer;
	text-decoration: none;
	&:focus {
		outline: none;
	}
	@media (max-width: 370px) {
		align-self: flex-start;
	}
`;
