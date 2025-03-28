import styled from 'styled-components';

export const Container = styled.div`
	width: fit-content;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Statement = styled.p`
	font-size: 1rem;
	color: ${({ theme }) => theme.components.search.users.searchStatement.color};
	strong {
		font-size: 0.9rem;
		color: ${({ theme }) => theme.components.search.users.searchStatement.color};
	}
`;
