import styled from 'styled-components';

interface Props {
	borderColor: string;
}

export const Container = styled.div<Pick<Props, 'borderColor'>>`
	width: 365px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: ${({ borderColor }) =>
		borderColor !== 'transparent' ? '4px 14px 14px 14px;' : '0;'};
	background: ${({ theme }) => theme.components.search.offers.background};
	border-radius: 0.4rem;
	${({ borderColor }) =>
		borderColor !== 'transparent'
			? 'box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 0px 2px;'
			: ''}

	border: 1px solid ${({ borderColor }) => borderColor};
	@media (max-width: 1350px) {
		width: 100%;
	}
`;

export const TopBtnsDiv = styled.div`
	width: 100%;
	height: 45px;
	display: flex;
	border-bottom: 1px solid
		${({ theme }) => theme.components.search.offers.topButtons.borderColor};
	.selected {
		border-bottom: 2px solid
			${({ theme }) =>
				theme.components.search.offers.topButtons.selected.borderColor};
	}
`;

export const TopBtn = styled.button`
	background: transparent;
	color: ${({ theme }) =>
		theme.components.search.offers.topButtons.topButton.color};
	border: none;
	border-bottom: 1px solid transparent;
	font-size: 16px;
	font-weight: 700;
	padding: 0 25px;
	transform: translateY(1px);
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;

export const Form = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
	/*   @media (max-width: 1350px) {
    flex-direction: row;
  } */
`;

export const FieldContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Label = styled.label`
	font-size: 14px;
	color: ${({ theme }) => theme.components.search.offers.form.label.color};
	font-weight: 900;
`;

export const CryptoSelect = styled.button`
	padding: 10px;
	font-size: 18px;
	font-weight: 700;
	color: ${({ theme }) =>
		theme.components.search.offers.form.cryptoSelect.color};
	border: 1px solid
		${({ theme }) => theme.components.search.offers.form.cryptoSelect.borderColor};
	background: transparent;
	border-radius: 4px;
	width: fit-content;
	cursor: pointer;
`;

export const Select = styled.div`
	padding: 0.2rem 0.4rem 0.2rem 0.2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border: 1px solid
		${({ theme }) => theme.components.search.offers.form.select.borderColor};
	background: ${({ theme }) =>
		theme.components.search.offers.form.select.background};
	border-radius: 0.4rem;
	width: 100%;
	input {
		color: ${({ theme }) => theme.components.search.offers.form.select.color};
		font-size: 16px;
		padding: 0.55rem 0 0.55rem 0.55rem;
		background: transparent;
		border: none;
		width: 60%;
		&::-webkit-outer-spin-button {
			margin: 0;
			-webkit-appearance: none;
		}
		&::-webkit-inner-spin-button {
			margin: 0;
			-webkit-appearance: none;
		}
		&:focus {
			outline: none;
		}
		&::placeholder {
			color: ${({ theme }) => theme.components.search.offers.form.select.color};
		}
	}
	p {
		color: ${({ theme }) => theme.components.search.offers.form.select.color};
		font-size: 16px;
		padding: 0.55rem 0 0.55rem 0.55rem;
	}
	button {
		padding: 0.3rem 0.5rem;
		border-radius: 0.4rem;
		border: 1px solid
			${({ theme }) => theme.components.search.offers.form.select.borderColor};
		background: ${({ theme }) =>
			theme.components.search.offers.form.select.background};
		color: ${({ theme }) => theme.components.search.offers.form.select.color};
		font-size: 14px;
		cursor: pointer;
	}
`;

export const InfoDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
`;

export const InfoIcon = styled.button`
	width: 20px;
	height: 20px;
	background: transparent;
	border: 2px solid
		${({ theme }) => theme.components.search.offers.form.info.button.color};
	border-radius: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	svg {
		font-size: 10px;
		color: ${({ theme }) =>
			theme.components.search.offers.form.info.button.color};
	}
`;

export const InfoCryptocurrencyCurrentPrice = styled.span`
	font-size: 15px;
	font-weight: 900;
	letter-spacing: 0.02rem;
	color: ${({ theme }) => theme.components.search.offers.form.info.button.color};
`;

export const SubmitButton = styled.button`
	background: ${({ theme }) =>
		theme.components.search.offers.form.submit.background};
	color: ${({ theme }) => theme.components.search.offers.form.submit.color};
	border: 1px solid
		${({ theme }) => theme.components.search.offers.form.submit.borderColor};
	text-align: left;
	padding: 1rem;
	border-radius: 0.4rem;
	font-size: 1rem;
	letter-spacing: 0.02rem;
	box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.4);
	cursor: pointer;
`;
