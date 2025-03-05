import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
`;

export const Container = styled.div`
	width: 1920px;
	height: 100%;
	padding: 25px 0;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	@media (max-width: 2030px) {
		width: 95%;
	}
`;
