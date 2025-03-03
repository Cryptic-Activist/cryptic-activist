import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	margin-right: 1rem;
	gap: 0.5rem;
	border: 1px solid
		${({ theme }) => theme.components.search.vendors.input.borderColor};
	border-radius: 0.4rem;
	padding: 0.7rem 0.8rem;
	box-shadow: 0 0 10px -2px ${({ theme }) => theme.components.search.vendors.input.boxShadow};
`;

export const Input = styled.input`
	display: flex;
	background: transparent;
	border: none;
	font-size: 1rem;
	color: ${({ theme }) => theme.components.search.vendors.input.color};
	&:focus {
		outline: none;
	}
	&::placeholder {
		color: ${({ theme }) => theme.components.search.vendors.input.color};
	}
`;

export const Button = styled.button`
	display: flex;
	background: transparent;
	border: none;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	svg {
		transform: translateY(4px);
		color: ${({ theme }) => theme.components.search.vendors.button.color};
	}
`;
