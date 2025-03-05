import styled from "styled-components";

interface Props {
	modal: boolean;
}

export const WarningList = styled.div<Pick<Props, "modal">>`
	width: 100%;
	margin: 10px 0;
	h3 {
		font-size: 15px;
		margin-bottom: 0.25rem;
		color: ${({ theme }) => theme.components.warnings.h3.color};
		${({ modal }) => modal && "text-align: center;"};
	}
	ul {
		width: fit-content;
		${({ modal }) => modal && "margin: 0 auto;"}
	}
`;

export const Warning = styled.li`
	list-style: none;
	&::before {
		content: "";
		width: 5px;
		height: 5px;
		border-radius: 50px;
		background-color: ${({ theme }) => theme.components.warnings.p.color};
		display: block;
		position: absolute;
		margin-top: 6px;
	}
	p {
		color: ${({ theme }) => theme.components.warnings.p.color};
		font-size: 14px;
		padding-left: 10px;
	}
`;
