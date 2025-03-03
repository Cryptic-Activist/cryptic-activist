import { keyframes } from "styled-components";

export const Floating = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(7px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const SlideDrawerOpen = keyframes`
  0% {
    transform: translateX(-210px);
  }
  100% {
    transform: translateX(0px);
  }
`;

export const SlideDrawerClose = keyframes`
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-210px);
  }
`;

export const ShowBackground = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const HideBackground = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const Spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
