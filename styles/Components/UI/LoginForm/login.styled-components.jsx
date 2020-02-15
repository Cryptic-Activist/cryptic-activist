/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const LoginForm = styled.div`
  margin: 0px;
  position: fixed;
  z-index: 99999999999;
  left: 50%;
  top: 150px;
  transform: translateX(-50%);
  background: #ffcd2b;
  padding: 20px 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.5);
`;

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 999999999;
  top: 0;
  width: 100%;
  height: 100vh;
`;

export const Header = styled.h5`
  color: #000;
  font-weight: 900;
  margin: 0 0 14px 0;
`;

export const LoginButtons = styled.ul`
  margin-bottom: 0;
   li {
     width: 220px;
   }
`;
