import styled from 'styled-components';

type Props = {
	width: string;
	height: string;
	borderRadius: string;
	isProfilePage: boolean;
	profileColor: string;
};

type InitialsProps = {
	isProfilePage?: boolean;
};

export const ProfileAvatar = styled.div<Props>`
	width: ${({ width }) => width};
	height: ${({ height, isProfilePage }) => !isProfilePage && height};
	border-radius: ${({ borderRadius }) => borderRadius};
	aspect-ratio: 1 / 1;
	overflow: hidden;
	border: 1px solid ${({ theme }) => theme.components.avatar.borderColor};
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ profileColor }) => profileColor};
	${({ isProfilePage }) =>
		isProfilePage &&
		`
			@media (max-width: 768px) {
				width: 20rem;
				height: 20rem;
			}
			@media (max-width: 574px) {
				margin: 0 auto;
			}
	`};
`;

export const Initials = styled.p<InitialsProps>`
	${({ isProfilePage }) =>
		isProfilePage
			? `
			font-size: 7rem;
		`
			: `
			font-size: 1.5rem;
		`}
`;
