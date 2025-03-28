import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	.selected {
		.ratio {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 30px;
			min-height: 30px;
			max-width: 30px;
			max-height: 30px;
			border-radius: 50px;
			border: 1px solid
				${({ theme }) => theme.components.buySell.ratio.active.borderColor};
			background: ${({ theme }) =>
				theme.components.buySell.ratio.active.background};
			box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
			/* transition: all 0.15s ease-in-out; */

			div {
				border-radius: 50px;
				width: 10px;
				height: 10px;
				background: ${({ theme }) => theme.components.buySell.ratio.active.color};
			}
		}
	}
`;

export const Selection = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	cursor: pointer;
`;

export const Ratio = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 30px;
	min-height: 30px;
	max-width: 30px;
	max-height: 30px;
	border-radius: 50px;
	border: 1px solid
		${({ theme }) => theme.components.buySell.ratio.deactivate.borderColor};
	background: ${({ theme }) =>
		theme.components.buySell.ratio.deactivate.background};
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
`;

export const Statements = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding-top: 6px;
`;

export const Strong = styled.strong`
	font-size: 16px;
	color: ${({ theme }) => theme.components.buySell.statements.color};
`;

export const Description = styled.p`
	font-size: 15px;
	color: ${({ theme }) => theme.components.buySell.statements.color};
`;
