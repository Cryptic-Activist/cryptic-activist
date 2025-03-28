import styled from 'styled-components';

interface Props {
	height?: string;
}

export const Container = styled.div<Pick<Props, 'height'>>`
	width: 100%;
	height: ${({ height }) => height};
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.components.list.offers.background};
	border-radius: 0.4rem;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 0px 2px;
	border: 1px solid ${({ theme }) => theme.components.list.offers.borderColor};
`;

export const Header = styled.div`
	width: 100%;
	min-height: 50px;
	border-radius: 4px;
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.offers.header.borderColor};
	background: ${({ theme }) => theme.components.list.offers.header.background};
	padding: 4px 14px;
	display: grid;
	grid-template-columns: 0.8fr 1.2fr 0.7fr 1.1fr;
	z-index: 1;
`;

export const HeaderMobile = styled.div`
	width: 100%;
	height: 50px;
	border-radius: 4px;
	border-bottom: 1px solid
		${({ theme }) => theme.components.list.offers.header.borderColor};
	background: ${({ theme }) => theme.components.list.offers.header.background};
	padding: 4px 14px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	z-index: 1;
`;

export const HeaderTitleLeft = styled.h3`
	font-size: 14px;
	align-self: center;
	color: ${({ theme }) => theme.components.list.offers.header.title.color};
`;

export const HeaderTitleRight = styled.h3`
	font-size: 14px;
	align-self: center;
	text-align: right;
	color: ${({ theme }) => theme.components.list.offers.header.title.color};
`;

export const SortButton = styled.button`
	font-size: 15px;
	border: none;
	border-radius: 4px;
	margin-left: 10px;
	transform: translateY(3px);
	background: ${({ theme }) =>
		theme.components.list.offers.header.sort.background};
	color: ${({ theme }) => theme.components.list.offers.header.sort.color};
`;

export const List = styled.div`
	background: ${({ theme }) => theme.components.list.offers.list.background};
	overflow-y: scroll;
	margin-top: -5px;
	padding-top: 8px;
	border-radius: 4px;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const EmptyP = styled.p`
	font-size: 16px;
	width: 100%;
	padding: 14px;
	text-align: center;
	color: ${({ theme }) => theme.components.list.offers.list.color};
`;
