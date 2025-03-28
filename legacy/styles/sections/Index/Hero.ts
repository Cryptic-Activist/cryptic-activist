import styled from 'styled-components';
import Image from 'next/image';

export const HeroDiv = styled.div`
	width: 1200px;
	height: 400px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	@media (max-width: 1200px) {
		width: 100%;
	}
	@media (max-width: 750px) {
		height: unset;
	}
`;

export const P2PImg = styled(Image)`
	height: 250px;
	@media (max-width: 1200px) {
		height: 230px;
	}
	@media (max-width: 1000px) {
		height: 220px;
	}
	@media (max-width: 900px) {
		height: 210px;
	}
	@media (max-width: 800px) {
		height: 200px;
	}
	@media (max-width: 750px) {
		height: 190px;
	}
	@media (max-width: 730px) {
		height: 180px;
	}
	@media (max-width: 430px) {
		height: 170px;
	}
	@media (max-width: 400px) {
		height: 160px;
	}
	@media (max-width: 360px) {
		height: 150px;
	}
`;

export const HeroDivGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	@media (max-width: 750px) {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(3, 1fr);
	}
	@media (max-width: 400px) {
		grid-gap: 15px;
	}
`;

export const HeroH2 = styled.h2`
	font-size: 20px;
	margin-bottom: 0.5rem;
	text-align: center;
	color: ${({ theme }) => theme.sections.index.hero.h2.color};
	@media (max-width: 800px) {
		font-size: 19px;
	}
	@media (max-width: 400px) {
		font-size: 18px;
	}
`;

export const HeroP = styled.p`
	font-size: 16px;
	color: ${({ theme }) => theme.sections.index.hero.p.color};
	text-align: center;
	@media (max-width: 1200px) {
		padding: 0 10px;
	}
`;
