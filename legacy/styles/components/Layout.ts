import styled from "styled-components";

interface Props {
	footerHeight?: number;
}

export const LayoutDiv = styled.div<Pick<Props, "footerHeight">>`
	${({ footerHeight }) =>
		`min-height: calc(100vh - 60px - ${footerHeight + 1}px);`}
	width: 100%;
	.fullWidth {
		width: 100%;
		margin: 0 auto;
		@media (max-width: 1200px) {
			width: 100%;
		}
	}
	.containerWidth {
		width: 1200px;
		margin: 0 auto;
		@media (max-width: 1200px) {
			width: 95%;
		}
	}
`;
