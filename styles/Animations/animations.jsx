/* eslint-disable import/prefer-default-export */
/* eslint-disable no-tabs */
import { keyframes } from 'styled-components';

export const opacity = keyframes`
	0% {
    opacity: 0
  }
  50% {
    opacity: 1;
  }
	100% {
    opacity: 0
	}
`;

export const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
	100% {
    transform: rotate(360deg);
	}
`;

export const loadingTiles = keyframes`
	0% {
    opacity: 1
  }
  50% {
    opacity: 0.3;
  }
	100% {
    opacity: 1
	}
`;
