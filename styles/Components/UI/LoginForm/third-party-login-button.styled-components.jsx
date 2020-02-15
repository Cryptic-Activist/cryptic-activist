/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const SocialMediaLoginLink = styled.a`
  padding: 12px 20px;
  display: inline-block;
  width: 100%;
  text-align: center;
  background: #000;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid #000;
  transition: .2s all ease-in-out;
  transition-delay: .1s;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    text-decoration: none;
    background: #ffcd2b;
    span {
      color: #000;
    }
    .icon {
      color: #000;
    }
    &:active {
      transform: scale(0.95, 0.95);
    }
  }
  ul {
    display: table;
    margin: 0 auto;
    li {
      list-style: none;
      display: inline;
    }
    .icon {
      color: #ffcd2b;
      transition: .2s all ease-in-out;
      transition-delay: .15s;
    }
  }
`;

export const Span = styled.span`
  color: #ffcd2b;
  font-weight: 900;
  transition: .2s all ease-in-out;
  transition-delay: .15s;
`;
