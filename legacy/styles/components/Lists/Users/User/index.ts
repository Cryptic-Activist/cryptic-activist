import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled(Link)`
	text-decoration: unset;
	display: flex;
	flex-direction: column;
	border-radius: 0.4rem;
	gap: 1rem;
	border: 1px solid
		${({ theme }) => theme.components.list.users.list.item.borderColor};
	background-color: ${({ theme }) =>
		theme.components.list.users.list.item.background};
	padding: 1rem;
	color: unset;
	box-shadow: 0 0 15px -10px ${({ theme }) => theme.components.list.users.list.item.color};
`;

export const NamesUsername = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Names = styled.p`
	color: ${({ theme }) => theme.components.list.users.list.item.names.color};
	font-size: 1.2rem;
`;

export const Username = styled.strong`
	color: ${({ theme }) => theme.components.list.users.list.item.username.color};
	font-size: 0.9rem;
`;

export const OffersAvailable = styled.p`
	font-size: 1rem;
	color: ${({ theme }) =>
		theme.components.list.users.list.item.offersAvailable.color};
`;
