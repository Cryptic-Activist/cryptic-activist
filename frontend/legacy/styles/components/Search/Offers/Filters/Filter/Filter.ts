import styled from "styled-components";

export const FilterContainer = styled.div`
	width: fit-content;
	display: flex;
	user-select: none;
	gap: 10px;
	align-items: center;
	cursor: pointer;
	p {
		color: ${({ theme }) =>
			theme.components.search.offers.filters.category.filter.p.color};
	}
`;

export const CheckboxChecked = styled.div`
	border: 1px solid
		${({ theme }) =>
			theme.components.search.offers.filters.category.filter.checked.borderColor};
	background: ${({ theme }) =>
		theme.components.search.offers.filters.category.filter.checked.background};
	width: 20px;
	height: 20px;
	border-radius: 4px;
	box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.25);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	div {
		height: 6px;
		width: 6px;
		background: ${({ theme }) =>
			theme.components.search.offers.filters.category.filter.checked.dot
				.backgroud};
		border-radius: 50px;
		display: block;
	}
`;

export const CheckboxUnchecked = styled.div`
	border: 1px solid
		${({ theme }) =>
			theme.components.search.offers.filters.category.filter.unchecked
				.borderColor};
	background: ${({ theme }) =>
		theme.components.search.offers.filters.category.filter.unchecked.background};
	width: 20px;
	height: 20px;
	border-radius: 4px;
	box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.25);
	cursor: pointer;
`;
