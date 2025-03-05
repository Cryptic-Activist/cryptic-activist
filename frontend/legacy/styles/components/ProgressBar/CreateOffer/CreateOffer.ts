import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
	align-items: center;
	@media (max-width: 580px) {
		flex-direction: column;
		align-items: unset;
		gap: 30px;
	}
`;

export const SelectionActive = styled.div`
	border-radius: 50px;
	border: 1px solid
		${({ theme }) =>
			theme.components.progressBar.createOffer.selection.active.borderColor};
	background: ${({ theme }) =>
		theme.components.progressBar.createOffer.selection.active.background};
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 32px;
	min-height: 32px;
	max-width: 32px;
	max-height: 32px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
	div {
		border-radius: 50px;
		background: ${({ theme }) =>
			theme.components.progressBar.createOffer.selection.active.color};
		height: 12px;
		width: 12px;
	}
`;

export const SelectionDeactivate = styled.div`
	border-radius: 50px;
	border: 1px solid
		${({ theme }) =>
			theme.components.progressBar.createOffer.selection.deactivate.borderColor};
	background: ${({ theme }) =>
		theme.components.progressBar.createOffer.selection.deactivate.background};
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 32px;
	min-height: 32px;
	max-width: 32px;
	max-height: 32px;
	div {
		border-radius: 50px;
		background: ${({ theme }) =>
			theme.components.progressBar.createOffer.selection.deactivate.color};
		height: 12px;
		width: 12px;
	}
`;

export const StepDiv = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
`;

export const StepActive = styled.h2`
	font-size: 16px;
	color: ${({ theme }) =>
		theme.components.progressBar.createOffer.step.active.color};
`;

export const StepDeactivate = styled.h2`
	font-size: 16px;
	color: ${({ theme }) =>
		theme.components.progressBar.createOffer.step.deactivate.color};
`;

export const Sep = styled.div`
	width: 55px;
	height: 1px;
	background: ${({ theme }) =>
		theme.components.progressBar.createOffer.separator.background};
	@media (max-width: 580px) {
		display: none;
	}
`;
