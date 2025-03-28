import { Spin } from '@styles/animations';
import styled from 'styled-components';

interface Props {
	size: string;
}

export const LoadingComponent = styled.div<Pick<Props, 'size'>>`
	font-size: ${({ size }) => size};
	animation: ${Spin} 0.5s linear infinite;
`;
