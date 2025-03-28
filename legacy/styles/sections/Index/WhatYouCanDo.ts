import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	@media (max-width: 1350px) {
		height: unset;
	}
`;

export const Container = styled.div`
	width: 1920px;
	display: flex;
	flex-direction: column;
	gap: 70px;
	margin: 50px auto 90px auto;
	@media (max-width: 2030px) {
		width: 95%;
	}
	@media (max-width: 610px) {
		gap: 50px;
	}
`;

export const HeadingsDiv = styled.div`
	text-align: center;
	width: 100%;
	h1 {
		font-size: 28px;
		color: ${({ theme }) => theme.sections.index.whatYouCanDo.h1.color};
		margin-bottom: 1rem;
	}
	h2 {
		font-size: 16px;
		color: ${({ theme }) => theme.sections.index.whatYouCanDo.h2.color};
		font-weight: 100;
	}
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 10px;
	@media (max-width: 1350px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-gap: 80px 10px;
	}
	@media (max-width: 610px) {
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(4, 1fr);
		grid-gap: 60px;
	}
`;

export const Tile = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
`;

export const Icons = styled.div`
	width: fit-content;
	.main {
		color: ${({ theme }) => theme.sections.index.whatYouCanDo.icon.primany.color};
		font-size: 55px;
	}
	.up {
		color: ${({ theme }) =>
			theme.sections.index.whatYouCanDo.icon.secondary.up.color};
		font-size: 18px;
		transform: translate(3px, -40px);
	}
	.down {
		color: ${({ theme }) =>
			theme.sections.index.whatYouCanDo.icon.secondary.down.color};
		font-size: 20px;
		transform: translate(3px, -40px);
	}
`;

export const TileHeading = styled.h3`
	font-size: 18px;
	color: ${({ theme }) => theme.sections.index.whatYouCanDo.icon.h3.color};
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const TileDescription = styled.p`
	font-size: 16px;
	color: ${({ theme }) => theme.sections.index.whatYouCanDo.icon.p.color};
	text-align: center;
`;
