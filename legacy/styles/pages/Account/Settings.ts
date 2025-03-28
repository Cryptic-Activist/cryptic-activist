import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	@media (max-width: 2030px) {
		width: 95%;
	}
	@media (max-width: 1199px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const SettingsContainer = styled.div`
	width: 100%;
	height: 300px;
	border: 1px solid #000;
	border-radius: 4px;
`;
