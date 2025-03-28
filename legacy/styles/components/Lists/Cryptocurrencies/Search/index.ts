import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	gap: 0.5rem;
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.cryptocurrencies.search.borderColor};
`;

export const Input = styled.input`
	border: none;
	color: ${({ theme }) => theme.components.list.cryptocurrencies.search.color};
	background-color: transparent;
	padding: 0.6rem;
	font-size: 1rem;
	width: 100%;
	&:focus {
		outline: none;
	}
`;

export const SearchButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	padding: 0 0.5rem;
	color: ${({ theme }) =>
		theme.components.list.cryptocurrencies.search.button.color};
`;
