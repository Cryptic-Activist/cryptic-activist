import styled from "styled-components";

export const Wrapper = styled.div`
	margin: 20px auto;
	width: 80%;
	height: calc(100vh - 40px - 60px);
	@media (max-width: 991px) {
		width: 90%;
	}
`;

export const ErrorMessageDiv = styled.div`
	width: 100%;
	margin: 50px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	img {
		height: 50vh;
		margin: 0 auto;
	}
`;
