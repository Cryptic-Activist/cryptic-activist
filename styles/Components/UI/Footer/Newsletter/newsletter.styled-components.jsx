/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Title = styled.h6`
  color: #000;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 0px;
  font-weight: 700;
  @media (max-width: 991px) {
    font-size: 9px;
  }
  @media (max-width: 766px) {
    text-align: center;
    margin-top: 25px;
  }
`;

export const Email = styled.input`
  background: #e0b528;
  color: #000;
  font-size: 13px;
  padding: 10px 15px 10px 33px;
  border: none;
  border-radius: 5px;
  letter-spacing: 1px;
  width: 100%;
  transition: all .25s ease-in-out;
  transition-delay: .1s;
  &::placeholder {
    font-weight: 400;
    letter-spacing: 1px;
    color: #000;
  }
  &:focus {
    outline: none;
    background: #e0b528;
  }
  &:hover {
    background: #e0b528;
  }
  @media (max-width: 991px) {
    padding: 6px 20px 6px 25px;
    font-size: 11px;
    border-radius: 3px;
  }
  @media (max-width: 766px) {
    font-size: 14px;
    padding: 8px 12px 8px 43px;
    margin-top: 7px;
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 26px;
  top: 21px;
  font-size: 13px;
  svg {
    color: #000;
    @media (max-width: 991px) {
      font-size: 10px;
    }
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
  @media (max-width: 991px) {
    left: 23px;
    top: 14px;
  }
  @media (max-width: 766px) {
    left: 29px;
    top: 49px;
  }
`;
