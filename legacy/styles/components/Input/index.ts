import styled from 'styled-components';

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const InputElement = styled.input`
	color: ${({ theme }) => theme.components.modal.input.color};
	font-size: 1rem;
	padding: 0.9rem;
	width: 100%;
	border: none;
	background: ${({ theme }) => theme.components.modal.input.background};
	box-shadow: 0 0 15px -5px rgba(0, 0, 0, 0.4);
	border-radius: 0.4rem;
	border: 1px solid ${({ theme }) => theme.components.modal.input.borderColor};
	&:focus {
		border-color: ${({ theme }) =>
			theme.components.modal.input.focus.borderColor};
		outline: none;
	}
`;

export const InputRequiredLabelContainer = styled.label`
	display: flex;
	gap: 0.2rem;
`;

export const InputLabel = styled.label`
	font-size: 0.85rem;
	color: ${({ theme }) => theme.components.modal.label.color};
	font-weight: 900;
	letter-spacing: 0.04em;
`;
