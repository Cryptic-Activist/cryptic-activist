import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	@media (max-width: 2030px) {
		width: 95%;
	}
`;

export const HeadingButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

export const Heading = styled.h1`
	font-size: 1.6rem;
`;

export const PaymentMethodsContainer = styled.div`
	display: flex;
	flex-direction: row;
	border-radius: 0.4rem;
	background: ${({ theme }) =>
		theme.pages.account.paymentMethods.index.list.background};
	border: 1px solid
		${({ theme }) => theme.pages.account.paymentMethods.index.list.borderColor};
	display: grid;
	grid-gap: 0.1rem;
	grid-template-columns: repeat(3, 1fr);
	overflow: hidden;
	@media (max-width: 1199px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 700px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const PaymentMethodListItem = styled.div`
	background: ${({ theme }) =>
		theme.pages.account.paymentMethods.index.list.item.background};
	padding: 1rem;
`;
